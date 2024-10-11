<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'

import { computed } from 'vue';
import { upload } from '@/util/upload';
import UpLoad from '@/components/UpLoad.vue'
let store = useStore()
let circleUrl = computed(() =>
    store.state.personalDetails.avater ? `http://localhost:3000/${store.state.personalDetails.avater}` : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
const ruleFormRef = ref()
const ruleForm = reactive({
    name: store.state.personalDetails.name,
    gender: store.state.personalDetails.gender,
    avater: store.state.personalDetails.avater,
    introduction: store.state.personalDetails.introduction,
    file: null
})


const rules = reactive({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    avater: [
        { required: true, message: '请上传头像', trigger: 'blur' },
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
            message: '请选择性别',
            trigger: 'change',
        },
    ]
})
let onSubmit = async () => {
    ruleFormRef.value.validate((valid: any, fields: any) => {
        if (valid) {
           
            upload('/adminapi/user/upload', ruleForm).then(res => {
                store.commit('changePersonalDetails', res.data.data)
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
            })
        }
    })
}
//上次图片
let upImage = (file: any) => {
    ruleForm.avater = URL.createObjectURL(file.raw)
    ruleForm.file = file.raw
}
</script>

<template>
    <div>
        <el-page-header :icon="''" :title="'企业门户管理系统'">
            <template #content>
                <span class="text-large font-600 mr-3"> 个人中心</span>
            </template>
        </el-page-header>
        <el-row :gutter="20" class="el-row">
            <el-col :span="8" class="el-col">
                <el-card style="width: 100%;">
                    <el-avatar :size="100" :src="circleUrl" />
                    <h1>{{ store.state.personalDetails.name }}</h1>
                    <h1>{{ store.state.personalDetails.role !== 1 ? '操作者' : '管理员' }}</h1>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules"
                        label-width="100" class="demo-ruleForm" status-icon>
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="ruleForm.name" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                                <el-option label="保密" :value="0" />
                                <el-option label="男" :value="1" />
                                <el-option label="女" :value="2" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="introduction">
                            <el-input v-model="ruleForm.introduction" type="textarea" />
                        </el-form-item>
                        <el-form-item label="头像" prop="avater">
                            <UpLoad  :avater="ruleForm.avater" @upImageFn="upImage" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">更新</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style lang='scss' scoped>
.el-row {
    margin-top: 30px;

    .el-col {
        text-align: center;
    }
}

</style>