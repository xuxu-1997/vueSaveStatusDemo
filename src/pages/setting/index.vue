<script setup>
import {$clearRecoverDataByName,$clearRecoverData} from "@/vue-save-status.es.js";
import Form from "@/pages/setting/Form.vue";


function deleteData(onlyName){
  if(onlyName){
    $clearRecoverDataByName(onlyName)
    alert(`删除 ${onlyName} 存储数据成功`)
  }else{
    $clearRecoverData()
    alert(`删除所有存储数据成功`)
  }

}
</script>

<template>


  <div class="box mt-2" v-for="i in 10">
    <p class="my-2">同一个组件渲染多次可根据onlyName区分缓存</p>
    <p>{{i}}</p>
    <Form :onlyName="`test-${i}`"/>
  </div>

</template>

<style scoped>
.box{
  border:1px solid #ccc;
  padding:20px;
}
</style>