<template>
<div id="app">

    <button class='exit-button' @click='exitPage'>EXIT</button>

    <InfiniteScroll
        ref='infiniteScroll'
        class='data-feed'
        :dataList='infiniteScrollDataGetter(page, count)'
        :numLoadingItems='numLoadingItems'
        @onLastViewedItem='storeLastViewedItem'
    />

</div>
</template>

<script>

import {mapGetters} from 'vuex'

import InfiniteScroll from '@/components/InfiniteScroll.vue'

export default {
    components: {InfiniteScroll},
    data () {

        return {
            count: 20,
            numLoadingItems: 20
        }
    },
    computed: {
        ...mapGetters(['infiniteScrollDataGetter']),
        page () {
            return 1
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
