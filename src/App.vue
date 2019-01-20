<template>
<div id="app">

    <div class='debug-panel'>
        lastLoadedPage: {{lastLoadedPage}}
        scrollToItemId: {{scrollToItemId}}
        debug: {{debug}}
        hasMore: {{hasMore}}
    </div>

    <button class='exit-button' @click='exitPage'>EXIT</button>

    <InfiniteScroll
        ref='infiniteScroll'
        class='data-feed'
        :dataList='infiniteScrollData'
        :loadingList='getLoadingData(loadingItems)'
        @onLastViewedItem='onLastViewedItem'
    />

</div>
</template>getLoadingData

<script>

import {mapState} from 'vuex'

import InfiniteScroll from '@/components/InfiniteScroll.vue'
import { setTimeout } from 'timers';

const NUM_OFF_ITEMS_TO_LOAD_MORE = 3

function delay (cb, miliseconds) {
    return new Promise(res => setTimeout(res, miliseconds)).then(cb)
}

export default {
    name: 'App',
    components: {InfiniteScroll},
    data () {
        return {
            count: 20,
            loadingItems: false,
            lastLoadedPage: 0,
            scrollToItemId: -1,
            debug: '',
            hasMore: true
        }
    },
    mounted () {
        this.lastLoadedPage = parseInt(localStorage.getItem('pageLastViewedInfiniteScrollItem')) || 0
        this.scrollToItemId = localStorage.getItem('lastViewedInfiniteScrollItem')
        this.fetchPage(this.lastLoadedPage).then(() => this.$refs.infiniteScroll.scrollToItem(this.scrollToItemId))
    },
    computed: {
        ...mapState(['ITEMS_CHUNK_SIZE']),
        infiniteScrollData() {
            return this.$store.getters.infiniteScrollDataGetter(this.lastLoadedPage, this.count)
        }
    },
    methods: {
        exitPage () {
            window.location.href="https://fb.com"
        },
        onLastViewedItem (indexLastViewed) {

            const closeToTheEdge = (this.infiniteScrollData.length - indexLastViewed) <= NUM_OFF_ITEMS_TO_LOAD_MORE
            console.log(
                `this.infiniteScrollData.length ${this.infiniteScrollData.length}\n`,
                `indexLastViewed ${indexLastViewed}\n`,
                `closeToTheEdge ${closeToTheEdge}\n`,
                `has more ${this.hasMore}\n`
            )

            if (closeToTheEdge && this.loadingItems && this.hasMore) {
                this.lastLoadedPage = this.lastLoadedPage + 1
                console.error('FETCHING MORE')
                this.fetchPage(this.lastLoadedPage)
            }

            const lastViewedItemPage = this.infiniteScrollData[indexLastViewed].originPage
            const lastViewedItemId = this.infiniteScrollData[indexLastViewed].uniqueId

            localStorage.setItem("pageLastViewedInfiniteScrollItem", lastViewedItemPage)
            localStorage.setItem("lastViewedInfiniteScrollItem", lastViewedItemId)
            this.scrollToItemId = lastViewedItemId
        },
        fetchPage (page) {
            this.loadingItems = true
            return delay(() => this.$store.dispatch('fetchInfiniteScrollData', {page}), 10000000)
                .then(({hasMore}) => {
                    console.log('LOADED')
                    this.loadingItems = false
                    this.hasMore = hasMore
                })
        },
        getLoadingData(loadingItems) {
            return this.loadingItems ? this.$store.getters.infiniteScrollLoadingData(this.ITEMS_CHUNK_SIZE) : []
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

.debug-panel {
    position: absolute;
    right: 200px;
    top: 12px;
}
</style>
