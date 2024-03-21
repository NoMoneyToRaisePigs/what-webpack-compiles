<template>
    <div>
      <h2>Test Component from Binance {{ num }}</h2>
    </div>
  </template>
      
  <script setup>
  import { ref } from 'vue'
// import {double} from 'share/utils'

// const num = ref(double(7))

const num = ref(3.5)

  </script>