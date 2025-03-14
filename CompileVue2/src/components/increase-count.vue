<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Test Button</button>
  </div>
</template>
    
<script setup>
import { ref } from 'vue'
import { rawRequest } from '@/utils/request'

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

  console.log(count.value)

  rawRequest({
    url: '/api/increase',
    method: 'get'
  }).then(res => {
    console.log(res)
  })
}
</script>