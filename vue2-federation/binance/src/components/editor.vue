<template>
    <div>
      <h2>This is Editor from Binance {{ name }}</h2>
    </div>
  </template>
      
  <script setup>
  import { ref } from 'vue'
import { getName } from 'shell/utils'

const name = ref(getName())
// const name = ref('self')
  </script>