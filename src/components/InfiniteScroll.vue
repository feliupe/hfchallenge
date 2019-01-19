<template>

<div class="InfiniteScroll">

    <infinite-scroll-item
        v-for='data in dataList'
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
    }
};
</script>
