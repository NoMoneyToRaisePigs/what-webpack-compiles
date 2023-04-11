<template>
   <div class="button-wrapper">
      <Shared/>
      <button @click="increaseCount">Count: {{ count }}</button>
   </div>
 </template>
 
 
 <script setup>
 import { ref } from 'vue'
 import Shared from './common/shared.vue'

 const count = ref(10)

 const increaseCount = () => { 
   count.value++
 }
 </script>
 
 <style>
    .button-wrapper{
       padding: 12px;
    }
 </style>
 