<script lang='ts' setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { upload } from '@/util/upload';
import RichText from '@/components/RichText.vue';
import UpLoad from '@/components/UpLoad.vue';

const router = useRouter()
const route = useRoute()
const goBack = () => {
    router.back()
}
onMounted(() => {
    init()
})
const init = async () => {
    // 这里写异步请求获取数据
    await axios.get(`/adminapi/news/list/${route.params.id}`).then(res => {
        Object.assign(ruleForm, res.data.data[0])
    })
}
const ruleFormRef = ref()
const ruleForm = reactive({
    title: '',
    content: '',
    newsType: 1,//1 最新动态 2 典型案例 3 通知公告
    newsCover: '',
    file: null,
    isPublish: 0,//是否发布 0 未发布 1 已发布
})
const rules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请上传内容', trigger: 'blur' },
    ],
    newsType: [
        { required: true, message: '请选择类型', trigger: 'change' },
    ],
    newsCover: [
        {
            required: true,
            message: '请上传封面',
            trigger: 'blur',
        },
    ],
})
let onSubmit = async () => {
    ruleFormRef.value.validate((valid: any, fields: any) => {
        if (valid) {
            upload(`/adminapi/user/editNews/${route.params.id}`, ruleForm).then(res => {
                // store.commit('changePersonalDetails', res.data.data)
                if (res.data.ActionType === 'OK') {
                    ElMessage({
                        message: '添加用户成功',
                        type: 'success',
                    })
                    router.push('/NewsList')
                }

            })
        }
    })
}
let upImage = (file: any) => {
    ruleForm.newsCover = URL.createObjectURL(file.raw)
    ruleForm.file = file.raw
}
let onCreated = (content: any) => {
    ruleForm.content = content
}
</script>

<template>
    <div class="news-manage">
        <el-page-header @back="goBack" :title="'新闻管理'">
            <template #content>
                <span>新闻编辑</span>
            </template>
        </el-page-header>
        <div class="news" style="margin-top: 40px;">
            <el-form ref="ruleFormRef" class="demo-ruleForm" status-icon :model="ruleForm" label-width="100"
                :rules="rules">
                <el-form-item label="新闻标题" prop="title">
                    <el-input v-model="ruleForm.title" />
                </el-form-item>
                <el-form-item label="新闻内容" prop="content">
                    <RichText @change="onCreated" :content="ruleForm.content" />
                </el-form-item>
                <el-form-item label="新闻类型" prop="newsType">
                    <el-select v-model="ruleForm.newsType">
                        <el-option label="最新动态" :value="1"></el-option>
                        <el-option label="典型案例" :value="2"></el-option>
                        <el-option label="通知公告" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻封面" prop="newsCover">
                    <UpLoad :avater="ruleForm.newsCover" @upImageFn="upImage" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">修改新闻</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style lang='scss' scoped></style>