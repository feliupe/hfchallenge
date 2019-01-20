<template>

<div :class="[uniqueId, 'type-' + component.name]" class="InfiniteScrollItem">

    <!-- <span>uniqueId {{uniqueId}}</span>unique content: {{componentProps.something}} -->

    <component v-if='loading' :is='getPlaceholder(placeholder)'>Fetching data</component>

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
        },
        placeholder: {
            type: String,
            default: 'spinner'
        },
        classes: {
            type: Array,
            default: () => []
        }
    },

    data () {
        return {
            delayedLoading: true
        }
    },

    methods: {
        getPlaceholder (placeholder) {
            return require('@/components/placeholders/' + placeholder).default
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

