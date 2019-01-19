<template>

<div class="InfiniteScroll">

    <infinite-scroll-item
        v-for='(data, index) in dataList'
        :id='index.toString()'
        :component="data['component']"
        :fetchComponentData="data['fetchComponentData']"
    />

</div>

</template>

<script>

import InfiniteScrollItem from '@/components/InfiniteScrollItem.vue'

export default {
    name: "InfiniteScroll",
    components: {InfiniteScrollItem},
    props: {
        dataList: {
            type: Array,
            default: () => []
        }
    },
    mounted () {
        // TODO: add throttling
        this.$el.addEventListener('scroll', (event) => {
            console.log('scrool')
            var last
            for (var item of this.$children) {
                if (this.isInViewPoint(item.$el)) {
                    last = item
                }
            }
            console.log(last.id)
        }, false)
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
