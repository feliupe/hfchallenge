<template>

<div :class='uniqueId' class="InfiniteScrollItem">

    <span>uniqueId {{uniqueId}}</span>unique content: {{componentProps.something}}

    <template v-if='loading'>Fetching data</template>

    <component v-else :is='component' v-bind='componentProps'/>

</div>

</template>

<script>

export default {
    name: "InfiniteScrollItem",
    props: {
        uniqueId: {
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
        },
        index: {
            type: Number
        }
    }
};
</script>

<style scoped>

.InfiniteScrollItem {
    height: 300px; /* make various types */

    border: 1px red solid;
}

</style>

