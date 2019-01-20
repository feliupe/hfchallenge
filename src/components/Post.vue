<template>
<div class='Post'>

    <h1>{{title}}</h1>

    <p>{{body}}</p>

</div>
</template>

<script>
export default {
    name: 'Post',

    props: ['title', 'body']
}
</script>

<style scoped>

.Post {
    width: 300px;
    border: 1px solid green;
}

</style>
