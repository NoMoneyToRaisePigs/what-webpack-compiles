<template>
  <div class="card">
     <h2>root component</h2>
     <h3>{{msg}}</h3>
     <Test/>
  </div>
</template>

<script setup lang="ts">
import Test from './components/test.vue'


const msg = 'Hello, Vue-Loader, hot reload ? !'
</script>

<!-- <script lang="ts">
import Test from './components/test.vue'


export default {
   components: {
      Test
   },
   data(){
      return{
         msg: 'Hello, Vue-Loader, hot reload ? !'
      }
   },
   mounted(){
      console.log('root component mounted');
   }
}
</script> -->

<style>
   .card{
      background-color: greenyellow;
   }
</style>
