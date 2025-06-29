<template>
    <div>
        <h1>Shell - User Page</h1>
        <button @click="getInfo">Test </button>
        <pre>
            {{userData}}
        </pre>
        <IncreaseCount />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import IncreaseCount from '@/components/increase-count.vue'
import { getUserInfo } from './api'

const userData = ref(null)

async function getInfo() {
   const res = await getUserInfo()
   userData.value = res
}
</script>