<template>
<div id="app">

    <InfiniteScroll
        class='data-feed'
        :dataList='infiniteScrollData'
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
                {component: Photo, fetchComponentData: () => new Promise(res => setTimeout(res, 1000))}
            ]
        }
    }
}
</script>

<style scoped>

.data-feed {
    max-width: 500px;
    border: blue 1px solid;
}

</style>
