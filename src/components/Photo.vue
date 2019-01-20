<template>
<div class='Photo'>

   <img :src="thumbnailUrl" :alt="title">

   <span>{{title}}</span>

</div>
</template>

<script>
export default {
    name: 'Photo',
    props: ['thumbnailUrl', 'title']
}
</script>

<style scoped>

.Post {
    width: 300px;
    border: 1px solid green;
}

</style>
