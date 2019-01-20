<template>

    <img class='spinner' src="https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif" alt="">

</template>

<script>

export default {
    name: 'spinner'
}

</script>

<style scoped>

.spinner {
    display: block;
    width: 30px;

    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%)
}

</style>
