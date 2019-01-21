<template>

<div class="InfiniteScroll">

    <infinite-scroll-item
        v-for='(item, index) in scrollItems'

        :key='index'
        :index='index'
        :uniqueId='item.uniqueId'
        :component="item['component']"
        :componentProps="item['componentProps']"
        :loading="item['loading']"
        :placeholder="item['placeholder']"
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
        loadingList: {
            type: Array,
            default: () => []
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

            if (last && !last.loading) { this.$emit('onLastViewedItem', last.index) }
        }, 1000, {'leading': false}), false)
    },
    computed: {
        scrollItems () {

            /*
                Aparently was a bad decision to split this two lists.
                Would be nice to have only one where to distinguish I would only use
                the the 'loading' property. This way I could pass the component
             */
            return this.dataList.concat(this.loadingList.map(item => ({...item, loading: true})))
        }
    },
    methods: {
        scrollToItem (uniqueItemId) {
            const el = this.$el.getElementsByClassName(uniqueItemId)
            if (el.length === 0) {
                console.info(`Element ${uniqueItemId} not found.`)
               return
            }
            el[0].scrollIntoView({behavior: "smooth", block: "start"})
            console.log('scrolling into item')
        },
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

<style>

.InfiniteScroll {
    padding: 0 12px;
}

</style>
