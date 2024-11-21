<script setup>
import {onBeforeUnmount, ref} from "vue";
import {$useSaveStatus} from "@/vue-save-status.es.js"

const headers = [
  {
    title: '姓名',
    align: 'start',
    sortable: false,
    key: 'name'
  },
  {
    title: '年龄',
    align: 'start',
    sortable: false,
    key: 'age'
  }, {
    title: '描述',
    align: 'start',
    sortable: false,
    key: 'desc'
  }, {
    title: '操作',
    align: 'center',
    sortable: false,
    key: 'option'
  }]
const items = ref([{
  name: '默认存在Name',
  age: '18',
  desc: '哈哈哈'
},])
const editItem = ref({
  name: '',
  age: '',
  desc: ''
})
const isVerified = ref(false)

const {recoverData,recoverDataAction,controlRecordAction,reSetData} = $useSaveStatus({
  onlyName: 'home', //唯一标识
  autoRecover: true, //开启后组件加载时若存在记录数据将自动执行recoverDataAction
}, items, editItem)


function addItem() {
  items.value.push(editItem.value)
  editItem.value = {
    name: '',
    age: '',
    desc: ''
  }
}

function deleteItem(idx) {
  items.value.splice(idx, 1)
}
</script>

<template>
  <v-data-table :headers="headers" :items="items">
    <template #bottom></template>
    <template #item.option="{index}">
      <v-btn @click="deleteItem(index)" size="small"   color="error">删除</v-btn>
    </template>
  </v-data-table>
  <v-divider class="ma-4"></v-divider>
  <v-form @submit.prevent v-model="isVerified" class="d-flex align-center" style="width: 600px">
    <v-text-field
        v-model="editItem.name"
        :counter="10"
        required
        label="Name"
    ></v-text-field>
    <v-text-field
        class="mx-2"
        v-model="editItem.age"
        :counter="10"
        label="Age"
    ></v-text-field>
    <v-text-field
        v-model="editItem.desc"
        :counter="10"
        label="Desc"
    ></v-text-field>
    <v-btn @click="addItem" size="large" class="ml-4 mb-4" :disabled="!isVerified" color="primary"
           prepend-icon="mdi-plus">
      添加
    </v-btn>
  </v-form>

</template>

<style scoped>

</style>