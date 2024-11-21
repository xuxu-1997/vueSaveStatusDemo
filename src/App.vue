<script setup>
import {ref} from "vue";

const show = ref(false)
function initApp(){
  // setTimeout(() => {
    show.value = true
  // },1500)
}

initApp()
</script>

<template>
  <router-view v-if="show"/>
  <div v-else class="loading"></div>
</template>

<style scoped>

</style>
