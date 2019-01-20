<template>
<div id="app">

    <div class='debug-panel'>
        lastLoadedPage: {{lastLoadedPage}}
        scrollToItemId: {{scrollToItemId}}
        numLoadingItems: {{numLoadingItems}}
        debug: {{debug}}
        hasMore: {{hasMore}}
    </div>

    <button class='exit-button' @click='exitPage'>EXIT</button>

    <InfiniteScroll
        ref='infiniteScroll'
        class='data-feed'
        :dataList='infiniteScrollData'
        :numLoadingItems='numLoadingItems'
        @onLastViewedItem='onLastViewedItem'
    />

</div>
</template>

<script>

import {mapState} from 'vuex'

import InfiniteScroll from '@/components/InfiniteScroll.vue'

const NUM_OFF_ITEMS_TO_LOAD_MORE = 3

export default {
    name: 'App',
    components: {InfiniteScroll},
    data () {
        return {
            count: 20,
            numLoadingItems: 0,
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
            this.debug = 'fired'

            const closeToTheEdge = (this.infiniteScrollData.length - indexLastViewed) <= NUM_OFF_ITEMS_TO_LOAD_MORE
            console.log(
                `this.infiniteScrollData.length ${this.infiniteScrollData.length}\n`,
                `indexLastViewed ${indexLastViewed}\n`,
                `closeToTheEdge ${closeToTheEdge}\n`,
                `has more ${this.hasMore}\n`
            )
            const notFetching = this.numLoadingItems === 0

            if (closeToTheEdge && notFetching && this.hasMore) {
                this.debug += 'fetching'
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
            this.numLoadingItems = this.ITEMS_CHUNK_SIZE
            return this.$store.dispatch('fetchInfiniteScrollData', {page})
                .then(({hasMore}) => {
                    this.numLoadingItems = 0
                    this.hasMore = hasMore
                })
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
