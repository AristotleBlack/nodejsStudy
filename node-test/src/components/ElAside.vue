<script lang='ts' setup>
import { ref, reactive } from 'vue'
import {HomeFilled,UserFilled,Avatar,Memo,Reading}  from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
let router = useRoute()
let store = useStore()
let vUser = {
    mounted:(el:any)=>{
        if( store.state.personalDetails.role!==1){
            el.parentNode.removeChild(el)
        }   
    }
}
</script>

<template>
    <div>
        <el-aside :width="store.state.collapse?'64px':'200px'">
            <el-menu :collapse-transition="false" :collapse="store.state.collapse" :default-active="router.path" class="el-menu-vertical-demo" router>
                <el-menu-item index="/home">
                    <el-icon><HomeFilled /></el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/center">
                    <el-icon><UserFilled /></el-icon>
                    <span>个人中心</span>
                </el-menu-item>
                <el-sub-menu index="/UserAdd" v-user>
                    <template #title>
                        <el-icon><Avatar /></el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="/UserAdd">添加用户</el-menu-item>
                    <el-menu-item index="/UserList">用户列表</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/NewsAdd">
                    <template #title>
                        <el-icon><Memo /></el-icon>
                        <span>新闻管理</span>
                    </template>
                    <el-menu-item index="/NewsAdd">添加新闻</el-menu-item>
                    <el-menu-item index="/NewsList">新闻列表</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/ProductAdd">
                    <template #title>
                        <el-icon><Reading /></el-icon>
                        <span>产品管理</span>
                    </template>
                    <el-menu-item index="/ProductAdd">添加产品</el-menu-item>
                    <el-menu-item index="/ProductList">产品列表</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
    </div>
</template>
<style lang='scss' scoped>
.el-aside{
    height: 100vh;
    .el-menu{
        height: 100vh;
    }
}
</style>