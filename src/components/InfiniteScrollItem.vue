<template>

<div class="InfiniteScrollItem">

    <span>{{id}}</span>

    <div v-if='loading'>Fetching data</div>

    <component v-else :is='component' v-bind='componentProps'/>

</div>

</template>

<script>

export default {
    name: "InfiniteScrollItem",
    props: {
        id: {
            type: String
        },
        component: {
            type: Object,
            default: () => null // maybe check here if is a vue component
        },
        componentProps: {
            type: Object,
            default: () => ({})
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            componentFetchedProps: {},
            propsFetched: false
        }
    }
};
</script>

<style scoped>

.InfiniteScrollItem {
    border: 1px red solid;
}

</style>

