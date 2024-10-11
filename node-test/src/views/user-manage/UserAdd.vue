<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
let router = useRouter()
const ruleFormRef = ref()
import { upload } from '@/util/upload';
import UpLoad from '@/components/UpLoad.vue'
import { ElMessage } from 'element-plus'
let store = useStore()
const ruleForm = reactive({
    name: '',
    password:'',
    gender: 0,
    avater: '',
    role:2,
    introduction: '',
    file: null
})


const rules = reactive({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    avater: [
        { required: true, message: '请上传头像', trigger: 'blur' },
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
    gender: [
        {
            required: true,
            message: 'ruleForm',
            trigger: 'change',
        },
    ]
})
let upImage = (file: any) => {
    ruleForm.avater = URL.createObjectURL(file.raw)
    ruleForm.file = file.raw
}
let onSubmit = async () => {
    ruleFormRef.value.validate((valid: any, fields: any) => {
        if (valid) {
            upload('/adminapi/user/addUser', ruleForm).then(res => {
                // store.commit('changePersonalDetails', res.data.data)
                ElMessage({
                    message: '添加用户成功',
                    type: 'success',
                })
                router.push('/UserList')
            })
        }
    })
}
</script>

<template>
    <div>
        <el-page-header :icon="''" :title="'用户管理'">
            <template #content>
                <span> 添加用户</span>
            </template>
        </el-page-header>
        <el-form ref="ruleFormRef" label-width="100" style="max-width: 600px;margin: 30px auto;" :model="ruleForm" :rules="rules" 
            class="demo-ruleForm" status-icon>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password" >
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
            <el-form-item label="头像" prop="avater">
                <UpLoad :avater="ruleForm.avater" @upImageFn="upImage" />
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="onSubmit">添加用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang='scss' scoped></style>