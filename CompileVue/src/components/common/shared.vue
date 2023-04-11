<template>
   <div class="shared">
      {{ sharedMsg  }}
   </div>
 </template>
 
 
 <script setup>
 import { ref, onMounted } from 'vue'

 const sharedMsg = ref('to be shared')

 onMounted(() => { 
   console.log('i am a shared component')
 })

 </script>
 
 <style>
    .shared {
       padding: 12px;
       color: aqua;
       font-weight: bold;
       font-size: 20px;
    }
 </style>
 