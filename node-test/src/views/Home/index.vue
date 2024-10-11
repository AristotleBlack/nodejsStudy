<script lang='ts' setup>
import { ref, reactive ,onMounted} from 'vue'
import axios from 'axios'
import { useStore } from 'vuex';
onMounted(() => {
    init()
})
let tableData = ref<any[]>([])
let init = () => {
    axios.get('/adminapi/product/list').then(res => {
        tableData.value = []
        tableData.value.push(...res.data.data)
    })
}
let store = useStore();
let circleUrl = 'http://localhost:3000/' + store.state.personalDetails.avater
</script>

<template>
    <div>
        <el-card class="box-card">
            <div>
                <el-avatar :size="100" :src="circleUrl" />
            </div>
            <h1>欢迎{{ store.state.personalDetails.name }}回来，喝杯咖啡提提神吧！</h1>
        </el-card>
        <el-card class="box-card1">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
            </template>
            <el-carousel :interval="4000" type="card" height="400px">
                <el-carousel-item v-for="item in tableData" :key="item">
                    <el-image style="width: 100%; height: 400px;" :src="'http://localhost:3000/' + item.avater" :fit="'fit'" />
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>
<style lang='scss' scoped>
.box-card1 {
    margin-top: 60px;
    .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 400px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
}

.box-card {
    ::v-deep .el-card__body {
        display: flex;
        align-items: center;
    }
}
</style>