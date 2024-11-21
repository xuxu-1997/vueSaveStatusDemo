<script setup>
import {onBeforeUnmount, reactive, ref} from 'vue'
import {$clearRecoverDataByName, $useSaveStatus} from "@/vue-save-status.es.js";
import {useRouter} from "vue-router";

const router = useRouter()
const dialog = ref(false)

const state = reactive({
  name: '',
  email: '',
  select: null,
  checkbox: null,
})
const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
]
const onlyName = 'user'
const {recoverData, recoverDataAction, controlRecordAction, reSetData} = $useSaveStatus(
    onlyName
    , state)


function init() {
  if (recoverData) {
    for (let key in recoverData) {
      if (recoverData[key]) {
        dialog.value = true
        break
      }
    }

  }
}

init()


function submit() {
  dialog.value = false;
  //取消自动保存
  controlRecordAction(false)
  //清空当前已存缓存
  $clearRecoverDataByName(onlyName)
  router.push({name: 'home'})
  alert('已提交，清空缓存')
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
  >
    <v-card
        prepend-icon="mdi-map-marker"
        text="检测到上次填写的内容未保存，是否恢复？"
        title="提示"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialog=false">
          取消
        </v-btn>

        <v-btn @click="dialog = false;recoverDataAction()">
          是
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
  <p class="my-4">如果填写了内容未保存，再次进入会提示是否恢复。</p>
  <form>
    <v-text-field
        v-model="state.name"
        :counter="10"
        label="Name"
        required
    ></v-text-field>

    <v-text-field
        v-model="state.email"
        label="E-mail"
        required
    ></v-text-field>

    <v-select
        v-model="state.select"
        :items="items"
        label="Item"
        required
    ></v-select>

    <v-checkbox
        v-model="state.checkbox"
        label="Do you agree?"
        required
    ></v-checkbox>

    <v-btn
        color="primary"
        class="me-4"
        @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="reSetData">
      clear
    </v-btn>
  </form>
</template>

<style scoped>

</style>