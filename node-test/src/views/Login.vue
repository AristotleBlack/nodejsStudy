<script lang='ts' setup>
import { ref, reactive } from 'vue'
let options = {
    background: {
        color: {
            value: '#0d4232'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 2,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
}
import { loadSlim } from "tsparticles-slim"
import { ElMessage } from 'element-plus'
const particlesInit = async (engine: any) => {
    // await loadFull(engine);
    await loadSlim(engine);
};
let ruleForm = ref<{ name: string, password: string }>({
    name: '',
    password: ''
})
const rules = reactive({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ],
})
import axios from 'axios'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
let store = useStore()
let router = useRouter()
let ruleFormRef = ref()
const onSubmit = () => {
    ruleFormRef.value.validate((valid: any, fields: any) => {
        if (valid) {
            axios.post('/adminapi/user/login', ruleForm.value).then(res => {
                try {
                    if(res.data.ActionType==='OK'){
                        store.commit('changePersonalDetails',res.data.data)
                        router.push('/home')   
                        store.commit('getChangeToken', false)
                        ElMessage('登录成功')     
                    }else{
                        ElMessage.error('密码和用户名错误')
                    }
                } catch (e) {
                   console.log(e);
                   
                }
            })
        } else {

        }
    })
}
</script>

<template>
    <div id="app">
        <vue-particles :particlesInit="particlesInit" id="tsparticles" :options="options" />
        <div class="loginFrom">
            <h3>企业管理平台</h3>
            <el-form ref="ruleFormRef" label-width="100" :model="ruleForm" :rules="rules" status-icon>
                <el-form-item label="用户名：" prop="name">
                    <el-input v-model="ruleForm.name" clearable />
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="ruleForm.password" type="password" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style lang='scss' scoped>
#app {
    #tsparticles {
        position: absolute;
        z-index: -1;
    }

    .loginFrom {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 300px;
        text-align: center;
        background-color: #000;
        border-radius: 20px;

        ::v-deep .el-form-item__label {
            color: #fff;
        }

        ::v-deep .el-form-item {
            margin: 40px;
        }

        h3 {
            font-size: 30px;
            color: #fff;
            margin: 20px;
        }
    }
}
</style>