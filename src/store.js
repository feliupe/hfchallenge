import Vue from 'vue'
import Vuex from 'vuex'

import Post from '@/components/Post.vue'
import Photo from '@/components/Photo.vue'

Vue.use(Vuex)

const POSTS_CHUNK_SIZE = 7
const PHOTOS_CHUNK_SIZE = 3
const ITEMS_CHUNK_SIZE = POSTS_CHUNK_SIZE + PHOTOS_CHUNK_SIZE

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
            return getChunk(fakeData(30), page, POSTS_CHUNK_SIZE)
        }
    },
    photos: {
        get ({page}) {
            return getChunk(fakeData(10), page, PHOTOS_CHUNK_SIZE)
        }
    }
}

export default new Vuex.Store({
    state: {
        infiniteScrollData: [],
        ITEMS_CHUNK_SIZE
    },
    mutations: {
        setInfiniteScrollData (state, {page, data}) {
            const start = page * ITEMS_CHUNK_SIZE
            state.infiniteScrollData.splice(start, data.length, ...data)
        }
    },
    actions: {
        fetchInfiniteScrollData ({state, commit, dispatch}, {page}) {
            function wrapWithAdditionalData (promise, component) {
                return promise.then(dataList => {
                    return dataList.map(data => ({
                        componentProps: data,
                        component,
                        uniqueId: data.id + '-' + component.name
                    }))
                })
            }

            return Promise.all([
                wrapWithAdditionalData(dispatch('fetchPosts', {page}), Post),
                wrapWithAdditionalData(dispatch('fetchPhotos', {page}), Photo)
            ]).then((data) => {
                data = data.reduce((previous, current) => previous.concat(current), [])
                data.forEach(d => d.originPage = page)
                commit('setInfiniteScrollData', {page, data})
                return {hasMore: data.length > 0}
            })
        },
        fetchPosts (state, {page}){
            return api.posts.get({page})
        },
        fetchPhotos (state, {page}){
            return api.photos.get({page})
        }
    },

    getters: {
        infiniteScrollDataGetter: (state) => (page, count) => {
            return state.infiniteScrollData
        }
    }
})
