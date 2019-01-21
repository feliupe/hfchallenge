<template>

<div :class="classes" class="InfiniteScrollItem">

    <div v-if='!loading' class='uniqueIdContainer'>{{uniqueId}}</div>

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
            default: () => ({}) // maybe check here if is a vue component
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
        }
    },

    data () {
        return {
            delayedLoading: true
        }
    },

    computed: {
        classes () {
            return {
                [this.uniqueId]: true,
                'type-loading': this.loading,
                ['type-' + this.component.name]: true
            }
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
    position: relative;
    margin-bottom: 12px;
    box-shadow: -9px 10px 19px 1px #7f3f42;
    height: 200px;
}

.uniqueIdContainer {
    position: absolute;
    left: 69px;
    top: 87px;
    box-shadow: -8px 7px rgba(15, 41, 22, 0.68);
    background-color: white;
    padding: 10px;
}

</style>

