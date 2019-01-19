<template>

<div class="InfiniteScrollItem">

    <div v-if='!propsFetched'>Fetching data</div>

    <component v-else :is='component'/>

</div>

</template>

<script>

export default {
    name: "InfiniteScrollItem",
    props: {
        component: {
            type: Object,
            default: () => null // maybe check here if is a vue component
        },
        fetchComponentData: {
            type: Function,
            default: () => () => Promise.resolve()
        }
    },
    data () {
        return {
            componentFetchedProps: {},
            propsFetched: false
        }
    },
    mounted () {
        this.fetchComponentData().then((data) => {
            this.componentFetchedProps = data
            this.propsFetched = true
        })
    }
};
</script>

<style scoped>

.InfiniteScrollItem {
    border: 1px red solid;
}

</style>

