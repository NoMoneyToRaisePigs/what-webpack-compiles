<template>
   <div class="button-wrapper">
      <button @click="increaseCount">Count: {{ count }}</button>
   </div>
 </template>
 
 
 <script setup lang="ts">
 import { ref } from 'vue'

 const count = ref(10)

 const increaseCount = () => { 
   count.value += 2
 }
 </script>
 
 <style>
    .button-wrapper{
       padding: 12px;
    }
 </style>
 