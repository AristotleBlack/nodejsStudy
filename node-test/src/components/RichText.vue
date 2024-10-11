<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="'default'" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
            @onChange="handleChange" :editor="editorRef" :mode="'default'" @onCreated="handleCreated" />
    </div>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onUpdated, defineEmits, defineProps } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const props = defineProps({
    content: String
})
const toolbarConfig = {}
const emit = defineEmits(['change'])
const editorConfig = { placeholder: '请输入内容...' }
// 内容 HTML
const valueHtml = ref('')
const handleChange = (editor: { children: any }) => {
    emit('change', valueHtml.value)
}


onUpdated(() => {
    props.content && (valueHtml.value = props.content)
})



// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
</script>