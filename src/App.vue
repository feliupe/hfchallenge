<template>
<div id="app">

    <div class='debug-panel'>
        lastLoadedPage: {{lastLoadedPage}}
        scrollToItemId: {{scrollToItemId}}
        debug: {{debug}}
        hasMore: {{hasMore}}
    </div>

    <button class='reset-button' @click='resetStorage'>RESET STORAGE</button>

    <button class='exit-button' @click='exitPage'>EXIT</button>

    <InfiniteScroll
        ref='infiniteScroll'
        class='data-feed'
        :dataList='infiniteScrollData'
        :loadingList='getLoadingData(loadingItems)'
        @onLastViewedItem='onLastViewedItem'
    />

</div>
</template>

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
        // load app required data
        Promise.all([
            this.$store.dispatch('fetchAllComments')
        ]).then(() => {
            this.lastLoadedPage = parseInt(localStorage.getItem('pageLastViewedInfiniteScrollItem')) || 0
            this.scrollToItemId = localStorage.getItem('lastViewedInfiniteScrollItem')
            this.fetchPage(this.lastLoadedPage).then(() => {
                this.$refs.infiniteScroll.scrollToItem(this.scrollToItemId)
            })
        })
    },
    computed: {
        ...mapState(['ITEMS_CHUNK_SIZE']),
        infiniteScrollData() {
            return this.$store.getters.infiniteScrollDataGetter(this.lastLoadedPage, this.count)
        }
    },
    methods: {
        resetStorage () {
            localStorage.setItem("pageLastViewedInfiniteScrollItem", 0)
            localStorage.setItem("lastViewedInfiniteScrollItem", null)
            location.reload()
        },
        exitPage () {
            window.location.href="https://fb.com"
        },
        onLastViewedItem (indexLastViewed) {
            const remainingItems = this.infiniteScrollData.length - indexLastViewed
            const closeToTheEdge = remainingItems <= NUM_OFF_ITEMS_TO_LOAD_MORE

            if (closeToTheEdge && !this.loadingItems && this.hasMore) {
                this.lastLoadedPage = this.lastLoadedPage + 1
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

            // simulate loading
            return delay(() => this.$store.dispatch('fetchInfiniteScrollData', {page}), 2000)
                .then(({hasMore}) => {
                    this.loadingItems = false
                    this.hasMore = hasMore
                })
        },
        getLoadingData() {
            return this.loadingItems ? this.$store.getters.infiniteScrollLoadingData(this.ITEMS_CHUNK_SIZE) : []
        }
    }
}
</script>

<style lang='scss'>

@import url('assets/_global.scss');

.data-feed {

    .type-Post {
        height: 200px;
        padding: $default-padding;
    }

    .type-Photo {
        height: 200px;
        padding: $default-padding;
    }
}


</style>

<style scoped>

.data-feed {
    max-width: 500px;
    height: 100vh;
}

.exit-button {
    position: absolute;
    right: 12px;
    top: 12px;
}

.reset-button {
    position: absolute;
    right: 64px;
    top: 12px;
}

.debug-panel {
    position: absolute;
    right: 200px;
    top: 12px;
}
</style>
