<script setup>
import {ref} from "vue";
import {$useSaveStatus} from "@/vue-save-status.es.js";

const {onlyName } = defineProps({
  onlyName:{
    type:String,
  }
})

const data = ref({
  name: '',
  checkbox: null
})

$useSaveStatus({
  onlyName, //唯一标识
  autoRecover: true, //开启后组件加载时若存在记录数据将自动执行recoverDataAction
}, data)

</script>

<template>
  <v-text-field
      v-model="data.name"
      :counter="10"
      label="Name"
      required
  ></v-text-field>
  <v-checkbox
      v-model="data.checkbox"
      label="Enable?"
      required
  ></v-checkbox>
</template>

<style scoped>

</style>