<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
let tableData = ref([])
const ruleFormRef = ref()
let ruleForm = ref({
    name: '',
    password: '',
    role: 2,
    introduction: '',
})
const init = async () => {
    await axios.get('/adminapi/user/list').then(res => {
        try {
            tableData.value = res.data.data
        } catch (e) {
            console.log(e);
        }
    })
}
onMounted(() => {
    init()
})
const dialogVisible = ref(false)
//编辑
const handleEdit = async (row?: any) => {
    dialogVisible.value = true
    let relust = await axios.get(`/adminapi/user/list/${row._id}`)
    ruleForm.value = {...relust.data.data[0]}
}
//删除
const handleDelete = async (row?: any) => {
    await axios.delete(`/adminapi/user/list/${row._id}`)
    init()
}

const rules = reactive({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],

    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    introduction: [
        {
            required: true,
            message: '请填写简介',
            trigger: 'blur',
        },
    ],
})
let onSubmit = async () => {
    await ruleFormRef.value.validate(async (valid: any, fields: any) => {
        if (valid) {
            dialogVisible.value = false
            await axios.post(`/adminapi/user/edit`,ruleForm.value)
            init()
        }
    })
}
</script>

<template>
    <div>
        <el-page-header :icon="''" :title="'用户管理'">
            <template #content>
                <span>用户列表</span>
            </template>
        </el-page-header>
        <div class="elTable" style="margin-top: 40px;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="用户名" />
                <el-table-column prop="avater" label="头像">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-avatar :size="50"
                                :src="scope.row.avater ? `http://localhost:3000/${scope.row.avater}` : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role" label="角色">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-tag class="ml-2" v-if="scope.row.role == 1" type="danger">管理员</el-tag>
                            <el-tag class="ml-2" v-else type="success">编辑</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-popconfirm title="确认删除数据" :confirm-button-text="'确认'" :cancel-button-text="'取消'"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑" width="30%">
        <el-form ref="ruleFormRef" label-width="100" style="max-width: 600px;margin: 30px auto;" :model="ruleForm"
            :rules="rules" class="demo-ruleForm" status-icon>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="ruleForm.role" placeholder="请选择角色">
                    <el-option label="管理员" :value="1" />
                    <el-option label="编辑" :value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="ruleForm.introduction" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定编辑</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style lang='scss' scoped></style>