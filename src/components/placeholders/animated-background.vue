<template>
<div class="animated-background animation">

</div>
</template>

<script>
export default {

}
</script>

<style scoped>

/*
    source: https://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html
*/

.animated-background {
    background: #fff;
    border: 1px solid;
    border-color: #e5e6e9 #dfe0e4 #d0d1d5;
    border-radius: 3px;

    margin: 0 auto;
    max-width: 472px;
    min-height: 100%;
}

@keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
}

.animated-background.animation {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    height: 100%;
    position: relative;
}


</style>

