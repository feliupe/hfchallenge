<template>
<div class='Photo clearfix'>

   <img class='image' :src="thumbnailUrl" :alt="title">

   <span :title='title' class='title'>{{title.toUpperCase().slice(0, 80)}}</span>

</div>
</template>

<script>
export default {
    name: 'Photo',
    props: ['thumbnailUrl', 'title']
}
</script>

<style lang='scss' scoped>

$image-width: 150px;

.image {
    border: 1px transparent;
    border-radius: 100%;
    width: $image-width;
    padding: 12px;
}

.title {
    width: calc(100% - #{$image-width});
    padding: 36px 12px 12px 36px;

    /* font */
    font-size: 14px;
    font-weight: bold;
    line-height: 1.55;
    color: rgba(68, 61, 76, 0.8);
    font-style: italic;
}
.image, .title {
    float: left;
}

</style>
