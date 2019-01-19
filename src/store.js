import Vue from 'vue'
import Vuex from 'vuex'

import Post from '@/components/Post.vue'
import Photo from '@/components/Photo.vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },

    getters: {
        infiniteScrollDataGetter: (state) => (page, count) => {
            return [
                {component: Post, componentProps: {something: 'asdasd'}},
                {component: Photo, componentProps: {something: 'asdasd'}},
                {component: Post, componentProps: {something: 'asdasd'}},
                {component: Photo, componentProps: {something: 'asdasd'}},
                {component: Post, componentProps: {something: 'asdasd'}},
                {component: Photo, componentProps: {something: 'asdasd'}},
                {component: Photo, componentProps: {something: 'asdasd'}},
                {component: Post, componentProps: {something: 'asdasd'}},
                {component: Photo, componentProps: {something: 'asdasd'}},
                {component: Photo, componentProps: {something: 'asdasd'}},
                {component: Post, componentProps: {something: 'asdasd'}},
                {component: Photo, componentProps: {something: 'asdasd'}},
                {component: Photo, componentProps: {something: 'asdasd'}},
                {component: Post, componentProps: {something: 'asdasd'}},
                {component: Photo, componentProps: {something: 'asdasd'}}
            ]
        }
    }
})
