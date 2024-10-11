<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue'
import {
    Edit, Delete, Star,StarFilled 
} from '@element-plus/icons-vue'
import axios from 'axios';
//引入vuex
import { useStore } from 'vuex';
const store = useStore()
const tableData = ref<any>([])
let init = () => {
    axios.get('/adminapi/product/list').then(res => {
        tableData.value = []
        tableData.value.push(...res.data.data)
    })
}
onMounted(() => {
    init()
})
//格式化时间
import formatTime from '@/util/FormatTime'
import { ElMessage, ElSwitch } from 'element-plus';
//点击删除
const handleDelete = async (id: string) => {
    await axios.delete('/adminapi/product/list/' + id).then(res => {
        if (res.data.ActionType === 'OK') {
            ElMessage({
                message: '删除成功',
                type: 'success',
            })
            init()
        }
    })
}



import { useRouter } from 'vue-router'
const router = useRouter()
//点击编辑
const handleEdit = (id:string) => {  
    router.push(`/EditProduct/${id}`)
}
</script>

<template>
    <div>
        <el-page-header :icon="''" :title="'产品管理'">
            <template #content>
                <span>产品列表</span>
            </template>
        </el-page-header>
        <div class="productTable" style="margin-top: 40px;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="产品名称" />
                <el-table-column prop="brief" label="简要描述"  />
                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作" width="180">
                    <template #default="scope">
                        <el-button type="info" :icon="Edit" circle  @click="handleEdit(scope.row._id)" />
                        <el-button @click="handleDelete(scope.row._id)" type="danger" :icon="Delete" circle />
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>
<style lang='scss' scoped></style>