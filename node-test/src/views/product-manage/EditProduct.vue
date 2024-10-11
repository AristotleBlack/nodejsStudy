<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
let router = useRouter()
let route = useRoute()
const ruleFormRef = ref()
import { upload } from '@/util/upload';
import UpLoad from '@/components/UpLoad.vue'
import { ElMessage } from 'element-plus'
import axios from 'axios';
let store = useStore()
const ruleForm = reactive({
    title: '',
    brief: '',
    particular: '',
    avater: '',
    file: null
})
let id = route.params.id
const init = () => {
    axios.get('/adminapi/product/list/' + id).then(res => {
        ruleForm.title = res.data.data.title
        ruleForm.brief = res.data.data.brief
        ruleForm.particular = res.data.data.particular
        ruleForm.avater = res.data.data.avater
    })
}
onMounted(() => {
    init()
})

const rules = reactive({
    title: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    brief: [
        { required: true, message: '请输入产品简要描述', trigger: 'blur' },
    ],
    particular: [
        { required: true, message: '请输入产品详细描述', trigger: 'blur' },
    ],
    avater: [
        {
            required: true,
            message: '请上传产品图片',
            trigger: 'blur',
        },
    ],
})
let upImage = (file: any) => {
    ruleForm.avater = URL.createObjectURL(file.raw)
    ruleForm.file = file.raw
}
let onSubmit = async () => {
    ruleFormRef.value.validate((valid: any, fields: any) => {
        if (valid) {
            upload('/adminapi/product/list/'+ id, ruleForm).then(res => {
                // store.commit('changePersonalDetails', res.data.data)
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
                router.push('/ProductList')
            })
        }
    })
}
const goBack = () => {
    router.back()
}
</script>

<template>
    <div>
        <el-page-header @back="goBack" :title="'产品管理'">
            <template #content>
                <span> 编辑产品</span>
            </template>
        </el-page-header>
        <el-form ref="ruleFormRef" label-width="80" style="max-width: 600px;margin: 40px 0;" :model="ruleForm"
            :rules="rules" class="demo-ruleForm" status-icon>
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="ruleForm.title" />
            </el-form-item>
            <el-form-item label="产品简要描述" prop="brief">
                <el-input v-model="ruleForm.brief" type="textarea" />
            </el-form-item>
            <el-form-item label="产品详细描述" prop="particular">
                <el-input v-model="ruleForm.particular" type="textarea" />
            </el-form-item>
            <el-form-item label="产品图片" prop="avater">
                <UpLoad :avater="ruleForm.avater" @upImageFn="upImage" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">编辑产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang='scss' scoped></style>