<script setup>
import Drawer from "@/components/Drawer.vue";
import {$clearRecoverData, $clearRecoverDataByName,$getAllRecoverData} from "@/vue-save-status.es.js";
import {ref} from "vue";

const allData =ref(null)
const drawer = ref(false)

function init(){
  allData.value = $getAllRecoverData()
}

function deleteData(onlyName){
  if(onlyName){
    $clearRecoverDataByName(onlyName)
    alert(`删除 ${onlyName} 存储数据成功`)
  }else{
    $clearRecoverData()
    alert(`删除所有存储数据成功`)
  }
}

function reload(){
  window.location.reload()
}
</script>

<template>
  <div class="box mt-2">
    <v-btn @click="drawer = true" size="small"   color="primary">查看所有已存储数据</v-btn>
    <v-btn class="ml-5" @click="reload" size="small"   color="primary">刷新页面F5</v-btn>
<!--    <v-btn  class="ml-2" @click="deleteData('home')" size="small"   color="error">删除Home页面缓存</v-btn>-->
<!--    <v-btn class="ml-2" @click="deleteData('user')" size="small"   color="error">删除User页面缓存</v-btn>-->
<!--    <v-btn class="ml-2" @click="deleteData()" size="small"   color="error">删除所有缓存</v-btn>-->
  </div>
  <Drawer v-model="drawer" title="当前所有存储数据" @open="init">
    <pre style="background: black;color:#fff">{{allData}}</pre>
  </Drawer>
</template>

<style scoped>

</style>