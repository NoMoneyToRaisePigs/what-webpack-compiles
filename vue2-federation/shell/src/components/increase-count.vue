<template>
  <div>
    <h2>Shell Main Project</h2>
    <p>{{ count }}</p>
    <button @click="increment">Test Button</button>
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