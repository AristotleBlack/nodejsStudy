<script lang='ts' setup>
import { ref, reactive, computed } from 'vue'
import { defineProps, defineEmits } from 'vue';
let props = defineProps({
    avater: String 
})
import { Plus } from '@element-plus/icons-vue'
let emit = defineEmits(['upImageFn'])
//上次图片
let upImage = (file: any) => {
    emit('upImageFn',file)
}
let acthorImage = computed(() =>
    props.avater?.includes('blob') ? props.avater : 'http://localhost:3000/' + props.avater
)
</script>

<template>
    <div>
        <el-upload class="avatar-uploader" :show-file-list="false" :on-change="upImage" :auto-upload="false">
            <img v-if="props.avater" :src="acthorImage" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
    </div>
</template>
<style lang='scss' scoped>
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
}
</style>