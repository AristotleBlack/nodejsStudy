<script lang='ts' setup>
import { ref, reactive } from 'vue'
import ElAside from '@/components/ElAside.vue';
import ElHeader from '@/components/ElHeader.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>
            <ElAside />
            
            <el-container :direction="'vertical'">
                <ElHeader />
                <el-main> <router-view /></el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style lang='scss' scoped></style>