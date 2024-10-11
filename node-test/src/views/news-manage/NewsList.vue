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
    axios.get('/adminapi/news/list').then(res => {
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
    await axios.delete('/adminapi/news/list/' + id).then(res => {
        if (res.data.ActionType === 'OK') {
            ElMessage({
                message: '删除成功',
                type: 'success',
            })
            init()
        }
    })
}
//`isPublish`状态切换
const ElSwitchFn = async (row: any) => {
    await axios.put('/adminapi/news/list/' + row._id, { isPublish: row.isPublish }).then(res => {
        if (res.data.ActionType === 'OK') {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            init()
        }
    })
}
let dialogTableVisible = ref(false)
let previewValue = ref<{ title: string, content: string, editTime: string }>({
    title: '',
    content: '',
    editTime: ''
})
//点击预览
const handlePreview = (row: any) => {
    dialogTableVisible.value = true
    previewValue.value = { ...row, editTime: formatTime(row.editTime) }
}
import { useRouter } from 'vue-router'
const router = useRouter()
//点击编辑
const handleEdit = (id:string) => {  
    router.push(`/news-manage/edit/${id}`)
}
</script>

<template>
    <div>
        <!-- 点击预览新闻 -->
        <el-dialog v-model="dialogTableVisible" title="新闻预览" width="800">
            <h1>{{ previewValue.title }}</h1>
            <span>{{ previewValue.editTime }}</span>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <p style="text-indent: 2em;" v-html="previewValue.content"></p>
        </el-dialog>
        <el-page-header :icon="''" :title="'新闻管理'">
            <template #content>
                <span>新闻列表</span>
            </template>
        </el-page-header>
        <div class="newsTable" style="margin-top: 40px;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="newsType" label="分类" width="180">
                    <template #default="scope">
                        <span v-if="scope.row.newsType === 1">最新动态</span>
                        <span v-else-if="scope.row.newsType === 2">典型案例</span>
                        <span v-else>通知公告</span>
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="isPublish" label="是否发布" width="180" v-if="store.state.personalDetails.role === 1" >
                    <template #default="scope">
                        <el-switch @change="ElSwitchFn(scope.row)" :active-value="1" :inactive-value="0"
                            v-model="scope.row.isPublish" active-color="#13ce66" inactive-color="#ff4949" />
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作" width="180">
                    <template #default="scope">
                        <el-button type="success" :icon="Star" circle @click="handlePreview(scope.row)" />
                        <el-button type="info" :icon="Edit" circle  @click="handleEdit(scope.row._id)" />
                        <el-button @click="handleDelete(scope.row._id)" type="danger" :icon="Delete" circle />
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>
<style lang='scss' scoped></style>