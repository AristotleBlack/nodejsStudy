<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex';
let store = useStore()
import { Menu, UserFilled } from '@element-plus/icons-vue'
const btn = () => {
    store.commit('collapseFn')
}
import { useRouter } from 'vue-router';
let router = useRouter()
let quit = ()=>{
    router.push('/login')
    localStorage.removeItem('token')
    store.commit('clearPersonINformation')
}
let centerFn = ()=>{
    router.push('/center')
}
</script>

<template>
    <div class="header">
        <div class="left">
            <el-icon :size="20" @click="btn" style="margin: 0 10px;cursor: pointer;">
                <Menu />
            </el-icon>
            <span>企业门户网站管理系统平台</span>
        </div>
        <div class="right">
            <span>欢迎 {{ store.state.personalDetails.name }} 回来</span>
            <el-dropdown placement="bottom-start">
                <el-icon style="color: #fff;margin: 0 10px;cursor: pointer;" :size="20">
                    <UserFilled />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="centerFn">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="quit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 60px;
    background-color: #2d3a48;

    .left,
    .right {
        display: flex;
        align-items: center;
        color: #fff;
    }
}
</style>