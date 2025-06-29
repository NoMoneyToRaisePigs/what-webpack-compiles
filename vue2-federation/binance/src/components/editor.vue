<template>
    <div style="border: 1px solid blue;">
      <h2>This is Editor from Binance {{ name }}</h2>
    </div>
  </template>
      
  <script setup>

defineProps({
  name: {
    type: String,
    default: 'self'
  }
})
  </script>