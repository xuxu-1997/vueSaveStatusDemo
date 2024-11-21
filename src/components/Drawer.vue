<script setup>
import { ref, watch } from 'vue'

const { placement, thickness, minThickness, mask, maskClosable } = defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 出现方位
  placement: {
    type: String,
    default: 'right',
    validator: (value) => {
      return ['right', 'left', 'top', 'bottom'].includes(value)
    }
  },
  // 抽屉厚度
  thickness: {
    type: [Number, String],
    default: '30%'
  },
  // 抽屉最小厚度
  minThickness: {
    type: [Number, String],
    default: '500px'
  },
  // 遮罩层
  mask: {
    type: Boolean,
    default: true
  },
  // 点击遮罩层关闭
  maskClosable: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['open'])
const model = defineModel({ type: Boolean, default: false })
const drawerRef = ref(null)
const styleCount = ref({
  [['top', 'bottom'].includes(placement) ? 'height' : 'width']: thickness,
  [['top', 'bottom'].includes(placement) ? 'minHeight' : 'minWidth']: minThickness
})

function close() {
  model.value = false
}

// 暴露主动关闭函数给调用者
defineExpose({ close })

watch(
  () => model.value,
  (val) => {
    if (val) {
      emits('open')
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <transition :name="`slide-${placement}`">
      <div
        v-if="model"
        ref="drawerRef"
        class="drawer"
        :class="`drawer-${placement}`"
        :style="styleCount"
      >
        <div class="drawer-header">
          <span class="drawer-title">{{ title }}</span>
          <v-btn color="error" size="small" icon="mdi-close" variant="text" @click="close"> </v-btn>
        </div>
        <div class="drawer-content"><slot></slot></div>
        <div v-if="$slots.footer" class="drawer-footer">
          <slot name="footer" :close="close"></slot>
        </div>
      </div>
    </transition>
  </Teleport>
  <Teleport v-if="model" to="body">
    <div
      class="drawer-mask"
      :style="{ background: mask ? 'rgba(0,0,0,.4)' : 'transparent' }"
      @click="maskClosable ? (model = false) : null"
    ></div>
  </Teleport>
</template>

<style  scoped>
.drawer {
  position: fixed;
  background: #ffffff;
  z-index: 1888;
  box-shadow: 0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05),
    0 12px 48px 16px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}
.drawer-header {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  border-bottom: 1px solid #e4e4e4;
}
.drawer-title {
  color: #999;
  font-size: 16px;
  font-weight: 500;
}
.drawer-content {
  flex: 1;
  padding: 6px 12px;
  overflow: auto;
}
.drawer-footer {
  padding: 6px 12px;
  border-top: 1px solid #e4e4e4;
}

.drawer-mask {
  z-index: 1887;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  height: 100vh;
}
.drawer-right {
  right: 0;
  top: 0;
  height: 100%;
}
.drawer-left {
  left: 0;
  top: 0;
  height: 100%;
}
.drawer-top {
  left: 0;
  top: 0;
  width: 100vw;
}
.drawer-bottom {
  left: 0;
  bottom: 0;
  width: 100vw;
}
/*right*/
/* 进入和离开的开始状态 */
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

/* 进入和离开的结束状态 */
.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
}

/* 进入和离开的过渡状态 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease-in-out;
}
/*left*/
/* 进入和离开的开始状态 */
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* 进入和离开的结束状态 */
.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
}

/* 进入和离开的过渡状态 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}

/*top*/
/* 进入和离开的开始状态 */
.slide-top-enter-from,
.slide-top-leave-to {
  transform: translateY(-100%);
}

/* 进入和离开的结束状态 */
.slide-top-enter-to,
.slide-top-leave-from {
  transform: translateY(0);
}

/* 进入和离开的过渡状态 */
.slide-top-enter-active,
.slide-top-leave-active {
  transition: transform 0.3s ease-in-out;
}

/*bottom*/
/* 进入和离开的开始状态 */
.slide-bottom-enter-from,
.slide-bottom-leave-to {
  transform: translateY(100%);
}

/* 进入和离开的结束状态 */
.slide-bottom-enter-to,
.slide-bottom-leave-from {
  transform: translateY(0);
}

/* 进入和离开的过渡状态 */
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: transform 0.3s ease-in-out;
}
</style>
