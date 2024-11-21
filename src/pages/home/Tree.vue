<script setup>
import {ElTree} from 'element-plus'
import {ref} from "vue";
import {$useSaveStatus} from "@/vue-save-status.es.js"

const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'assets',
        label: 'assets',
        children:[
          {
            id: 'aaa.png',
            label: 'aaa.png',
          },
          {
            id: 'bbb.png',
            label: 'bbb.png',
          },
        ]
      },
      {
        id: 'components',
        label: 'components',
        children:[
          {
            id: 'Header.vue',
            label: 'Header.vue',
          },
          {
            id: 'Layout.vue',
            label: 'Layout.vue',
          },
          {
            id: 'Footer.vue',
            label: 'Footer.vue',
          },
        ]
      },
      {
        id: 'pages',
        label: 'pages',
        children:[
          {
            id: 'index.vue',
            label: 'index.vue',
          },
          {
            id: 'home.vue',
            label: 'home.vue',
          },
          {
            id: 'setting.vue',
            label: 'setting.vue',
          },
        ]
      },
      {
        id: 'router',
        label: 'router',
        children:[
          {
            id: 'index.js',
            label: 'index.js',
          },]
      },
    ],
  },
  {
    id: 'index.html',
    label: 'index.html',
  },
]

const defaultExpandedArr = ref([])

$useSaveStatus({
  onlyName: 'tree', //唯一标识
  autoRecover: true, //开启后组件加载时若存在记录数据将自动执行recoverDataAction
}, defaultExpandedArr)

function expand(data){
  defaultExpandedArr.value.push(data.id)
}
function collapse(data){
  const idx =  defaultExpandedArr.value.findIndex(i => i === data.id)
  if(idx > -1){
    defaultExpandedArr.value.splice(idx,1)
  }
}
</script>

<template>
  <p class="my-4">打开文件夹，状态会被自动记录</p>
  <el-tree
      ref="treeRef"
      style="max-width: 600px"
      :data="data"
      node-key="id"
      @node-expand="expand"
      @node-collapse="collapse"
      :default-expanded-keys="defaultExpandedArr"
      :props="defaultProps"
  />
</template>

<style scoped>

</style>