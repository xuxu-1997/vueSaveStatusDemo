<template>

  <v-card>
    <v-layout>
      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
      >
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
        >
          <template v-slot:append>
            <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="goTo(route)" v-for="{label,route,icon} of navs" :prepend-icon="icon" :title="label"
                       :value="route" :active="$route.name === route">
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="w-100 h-100">
        <div class="pa-10">
          <Header/>
          <router-view/>
        </div>
      </v-main>
    </v-layout>
  </v-card>

</template>
<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";
import Header from "@/components/Layout/Header.vue";


const router = useRouter()
const drawer = ref(null)
const rail = ref(false)

const navs = ref([
  {label: '自动记录，自动恢复', route: 'auto', icon: 'mdi-broadcast'},
  {label: '自动记录，控制恢复', route: 'user', icon: 'mdi-broadcast-off'},
  {label: '组件多次渲染，区分备份', route: 'setting', icon: 'mdi-more'},
])

function goTo(value) {
  router.push({name: value})
}


</script>