<template>
<div class='Post clearfix'>

    <img class='thumb' alt="">
    <div class='description'>

        <!-- Post thumb -->

        <h1 :title='title' class='title'>{{title.slice(0, 40) + '...'}}</h1>
        <div :title='body' class='body'>{{body.slice(0, 100) + '...'}}</div>
    </div>

</div>
</template>

<script>
export default {
    name: 'Post',

    props: ['title', 'body']
}
</script>

<style lang='scss' scoped>

$thumb-width: 128px;

.Post {
    border: 1px solid green;
}


.thumb {
    width: $thumb-width;
    background-color: grey
}

.description {
    width:  calc(100% - #{$thumb-width});
    padding: calc(#{$default-padding} / 2);
}

.thumb, .description {
    // display: inline-block;
    height: $thumb-width;
    float: left;
}

.title {
    // position: absolute;
    top: calc(#{$default-padding} / 2);
}

.body {
    margin-top: 12px;
}

</style>
