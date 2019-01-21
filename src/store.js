import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import Post from '@/components/Post.vue'
import Photo from '@/components/Photo.vue'

Vue.use(Vuex)

const POSTS_CHUNK_SIZE = 4
const PHOTOS_CHUNK_SIZE = 2
const ITEMS_CHUNK_SIZE = POSTS_CHUNK_SIZE + PHOTOS_CHUNK_SIZE

const resourceChunkSizes = {
    photos: PHOTOS_CHUNK_SIZE,
    posts: POSTS_CHUNK_SIZE
}

const placeholdersByComponentName = {
    Post: 'animated-background'
}

const api = {
    posts: {
        get({page}) {
            return axios.get('http://jsonplaceholder.typicode.com/posts').then(r => r.data)
        }
    },
    photos: {
        get ({page}) {
            return axios.get('http://jsonplaceholder.typicode.com/photos').then(r => r.data)
        }
    },
    comments: {
        get () {
            return axios.get('http://jsonplaceholder.typicode.com/comments').then(r => r.data)
        }
    }
}

// dummy check: check last item is present
function checkAndGetIfCached(resource, data, page) {
    const size = resourceChunkSizes[resource]
    const start =  page * size
    return data[start  + size - 1] ? data.slice(start, start + size) : false
}

export default new Vuex.Store({
    state: {
        infiniteScrollData: [],
        ITEMS_CHUNK_SIZE,

        // TODO: separate into modules
        posts: [],
        photos: [],
        commentsByPostId: {}
    },
    mutations: {
        setCommentsByPostId (state, {comments}) {
            state.commentsByPostId = {}
            comments.forEach(comment => {
                if (!state.commentsByPostId[comment.postId]) {
                    state.commentsByPostId[comment.postId] = []
                }
                state.commentsByPostId[comment.postId].push(comment)
            })
        },
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
        fetchAllComments ({state, commit}) {
            return api.comments.get().then(comments => commit('setCommentsByPostId', {comments}))
        },
        fetchInfiniteScrollData ({state, commit, dispatch}, {page}) {

            function transformResource (dataList, component) {
                return dataList.map(data => ({
                    ...data,
                    componentProps: data,
                    component,
                    uniqueId: component.name + '-' + data.id,
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

            return api[resource].get({page})
                .then(data => {
                    const size = resourceChunkSizes[resource]
                    const start = page * size
                    commit('setResource', {resource, data})
                    return data.slice(start, start + size)
                })
        }
    },

    getters: {
        infiniteScrollDataGetter: (state) => (page, count) => {
            // TODO: move transform functions here and remove the state
            // Maybe create getters for each scroll type of item like:
            // - scrollPostGetter (page) - join posts and comments
            // - scrollPhotogetter (page)...
            // For now I will join the post comments here.
            return state.infiniteScrollData
                .map(data => {
                    const componentProps = {...data.componentProps, comments: state.commentsByPostId[data.id]}
                    return data.component.name === 'Post' ?
                        {...data, componentProps} :
                        data
                })
        },
        infiniteScrollLoadingData: (state) => () => {

            function createComponentLoadingData (len, component) {
                return Array(len).fill({
                    component,
                    placeholder: placeholdersByComponentName[component.name],
                    // classes: classesByComponentName[component.name]
                })
            }

            return [
                ...createComponentLoadingData(POSTS_CHUNK_SIZE, Post),
                ...createComponentLoadingData(PHOTOS_CHUNK_SIZE, Photo)
            ]
        }
    }
})
