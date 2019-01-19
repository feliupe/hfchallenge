<template>
<div id="app">

    lastViewedItemId: {{lastViewedItemId}}

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
    components: {InfiniteScroll},
    data () {
        return {
            count: 20,
            numLoadingItems: 0,
            page: 0,
            lastViewedItemId: -1
        }
    },
    mounted () {
        this.numLoadingItems = this.ITEMS_CHUNK_SIZE
        this.lastViewedItemId = parseInt(localStorage.getItem('lastViewedInfiniteScrollItem'))
        this.page = Math.floor(this.lastViewedItemId / this.ITEMS_CHUNK_SIZE)
        this.fetchPage(this.page).then(() => console.log('scrolling to into', this.lastViewedItemId))
    },
    computed: {
        ...mapState(['ITEMS_CHUNK_SIZE']),
        infiniteScrollData() {
            return this.$store.getters.infiniteScrollDataGetter(this.page, this.count)
        }
    },
    methods: {
        exitPage () {
            window.location.href="https://fb.com"
        },
        onLastViewedItem (itemId) {
            if ((this.infiniteScrollData.length - itemId) < NUM_OFF_ITEMS_TO_LOAD_MORE) {
                this.page = this.page + 1
                this.fetchPage(this.page)
            }

            localStorage.setItem("lastViewedInfiniteScrollItem", itemId)
            this.lastViewedItemId = parseInt(itemId)
        },
        fetchPage (page) {
            return this.$store.dispatch('fetchInfiniteScrollData', {page})
                .then(() => {
                    this.numLoadingItems = 0
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

</style>
