<template>

<div class="InfiniteScroll">

    <infinite-scroll-item
        v-for='(item, index) in scrollItems'
        :key='index'
        :id='index.toString()'
        :component="item['component']"
        :componentProps="item['componentProps']"
        :loading="item['loading']"
    />

</div>

</template>

<script>

import throttle from 'lodash.throttle'

import InfiniteScrollItem from '@/components/InfiniteScrollItem.vue'

export default {
    name: "InfiniteScroll",
    components: {InfiniteScrollItem},
    props: {
        dataList: {
            type: Array,
            default: () => []
        },
        numLoadingItems: {
            type: Number,
            default: 0
        }
    },
    mounted () {
        // TODO: work more on this to make the loading more smooth/pleasant
        this.$el.addEventListener('scroll', throttle((event) => {
            console.log('scrolling')
            var last
            for (var item of this.$children) {
                if (this.isInViewPoint(item.$el)) {
                    last = item
                }
            }

            if (last) { this.$emit('onLastViewedItem', last.id) }
        }, 1000), false)
    },
    computed: {
        scrollItems () {
            const loadingItems = Array(this.numLoadingItems).fill(0).map(() => ({component: {}, loading: true}))
            return this.dataList.concat(loadingItems)
        }
    },
    methods: {
        isInViewPoint (el) {
            const bounding = el.getBoundingClientRect()
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth))
        }
    }
};
</script>
