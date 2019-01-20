import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import Post from '@/components/Post.vue'
import Photo from '@/components/Photo.vue'

Vue.use(Vuex)

const POSTS_CHUNK_SIZE = 7
const PHOTOS_CHUNK_SIZE = 3
const ITEMS_CHUNK_SIZE = POSTS_CHUNK_SIZE + PHOTOS_CHUNK_SIZE

const resourceChunkSizes = {
    photos: PHOTOS_CHUNK_SIZE,
    posts: POSTS_CHUNK_SIZE
}

function delay (data) {
    return new Promise(res => setTimeout(() => res(data), 1000 + (Math.random() * 4000)))
}

function getChunk (data, page, size) {
    const start = page * size
    data.forEach((v, i) => v.something = i + v.something)
    return delay(data.slice(start, start + size))
}

function fakeData(len) {
    return new Array(len).fill(0).map((_, i) => ({id: i, something: 'aduashd'}))
}

const api = {
    posts: {
        get({page}) {
            // return getChunk(fakeData(30), page, POSTS_CHUNK_SIZE)
            return axios.get('http://jsonplaceholder.typicode.com/posts').then(r => r.data)
        }
    },
    photos: {
        get ({page}) {
            return getChunk(fakeData(10), page, PHOTOS_CHUNK_SIZE).then(r => r.data)
        }
    }
}

// dummy check: check last item is present
function checkAndGetIfCached(resource, data, page) {
    const lastItemIndex = resourceChunkSizes[resource] * (page + 1) - 1
    return !!data[lastItemIndex]
}

export default new Vuex.Store({
    state: {
        infiniteScrollData: [],
        ITEMS_CHUNK_SIZE,

        // TODO: separate into modules
        posts: [],
        photos: []
    },
    mutations: {
        // should ideally set resources separately and page by page
        setResource (state, {resource, data}) {
            state[resource] = data
        },
        setInfiniteScrollData (state, {page, data}) {
            const start = page * ITEMS_CHUNK_SIZE
            state.infiniteScrollData.splice(start, data.length, ...data)
        }
    },
    actions: {
        fetchInfiniteScrollData ({state, commit, dispatch}, {page}) {

            function transformResource (dataList, component) {
                return dataList.map(data => ({
                    componentProps: data,
                    component,
                    uniqueId: data.id + '-' + component.name
                }))
            }

            function transformAllResources (resourcesLists) {
                resourcesLists = resourcesLists.reduce((previous, current) => previous.concat(current), [])
                resourcesLists.forEach(d => d.originPage = page)
                commit('setInfiniteScrollData', {page, data: resourcesLists})
                return {hasMore: resourcesLists.length > 0}
            }

            const postsPromise = dispatch('fetch', {resource: 'posts', page})
            const photosPromise = dispatch('fetch', {resource: 'photos', page})

            return Promise.all([
                postsPromise.then(dataList => transformResource(dataList, Post)),
                photosPromise.then(dataList => transformResource(dataList, Photo))
            ]).then(transformAllResources)
        },

        // This methods should ideally be one for each resource
        fetch ({state, commit}, {resource, page}){
            const cache = checkAndGetIfCached(resource, state[resource], page)

            if (cache) return cache

            return api.posts.get({page})
                .then(data => {
                    commit('setResource', {resource, data})
                    return data
                })
        }
    },

    getters: {
        infiniteScrollDataGetter: (state) => (page, count) => {
            return state.infiniteScrollData
        }
    }
})
