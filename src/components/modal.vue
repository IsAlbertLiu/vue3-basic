<template>
  <teleport to='#modal'>
    <div id='center' v-if="isOpen">
      <h2><slot>This is a modal</slot></h2>
      <button @click="closeModal">close Modal</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Modal',
  props: {
    isOpen: Boolean
  },
  emits: {
    'close-modal': null
  },
  setup (props, context) {
    const closeModal = () => {
      context.emit('close-modal')
    }
    return {
      closeModal
    }
  }
})
</script>

<style scoped>
#center {
  height: 200px;
  width: 200px;
  border: 1px solid darkcyan;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
