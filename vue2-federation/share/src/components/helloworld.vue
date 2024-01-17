<template>
  <div>
    <h2>share sub project</h2>
  </div>
</template>
    
<script setup>
import { ref } from 'vue'

const props = defineProps({
  increment: {
    type: Number,
    required: false,
    default: 1
  }
})

const count = ref(0)
function increment() {
  count.value += props.increment
}
</script>