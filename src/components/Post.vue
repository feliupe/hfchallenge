<template>
<div class='Post clearfix'>

    <img class='thumb' alt="">

    <div class='description'>

        <h1 :title='title' class='title'>{{title.slice(0, 40) + '...'}}</h1>
        <div :title='body' class='body'>
            {{body.slice(0, 100) + '...'}}

        </div>
        <div class='comments-section'>{{comments.length}} comments</div>
    </div>

</div>
</template>

<script>
export default {
    name: 'Post',

    props: ['title', 'body', 'comments']
}
</script>

<style lang='scss' scoped>

$thumb-width: 128px;

.thumb {
    width: $thumb-width;
    background-color: rgba(15, 122, 255, 0.14);
}

.description {
    position: relative;

    width:  calc(100% - #{$thumb-width} - 30px);
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
    line-height: 1.4;
}

.comments-section {
    position: absolute;
    text-align: right;
    bottom: 30px; // for some reason '.description' is higher than '.thumb' so ajusted manually
    right: 12px;
}

</style>
