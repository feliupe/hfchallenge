<template>
<div id="app">

    <button class='exit-button' @click='exitPage'>EXIT</button>

    <InfiniteScroll
        ref='infiniteScroll'
        class='data-feed'
        :dataList='infiniteScrollData'
        @onLastViewedItem='storeLastViewedItem'
    />

</div>
</template>

<script>

import InfiniteScroll from '@/components/InfiniteScroll.vue'

import Post from '@/components/Post.vue'
import Photo from '@/components/Photo.vue'

export default {
    components: {InfiniteScroll, Post},
    data () {

        return {
            // tuple: (Component, fetchDataFunction)
            infiniteScrollData: [
                {component: Post, fetchComponentData: () => new Promise(res => setTimeout(res, 2000))},
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))},
                {component: Post, fetchComponentData: () => new Promise(res => setTimeout(res, 2000))},
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))},
                {component: Post, fetchComponentData: () => new Promise(res => setTimeout(res, 2000))},
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))},
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))},
                {component: Post, fetchComponentData: () => new Promise(res => setTimeout(res, 2000))},
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))},
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))},
                {component: Post, fetchComponentData: () => new Promise(res => setTimeout(res, 2000))},
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))},
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))},
                {component: Post, fetchComponentData: () => new Promise(res => setTimeout(res, 2000))},
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))}
            ]
        }
    },
    methods: {
        exitPage () {
            window.location.href="https://fb.com"
        },
        storeLastViewedItem (itemId) {
            console.log('oi ', itemId)
            localStorage.setItem("lastViewedInfiniteScrollItem", itemId)
        }
    }
}
</script>

<style scoped>

@import url('assets/global.scss');

.data-feed {
    max-width: 500px;
    height: 100vh;
    border: blue 1px solid;

    overflow-y: auto;
}

.exit-button {
    position: absolute;
    right: 12px;
    top: 12px;
}

</style>
