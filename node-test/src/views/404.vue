<script lang='ts' setup>
import { ref, reactive } from 'vue'
</script>

<template>
    <div class="notFound"></div>
</template>
<style lang='scss' scoped>
.notFound{
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/404.gif') 50% 30% no-repeat ;
    background-size: cover;
}
</style>