<template>
<div>
    <p>
        <router-link to="/hello">Go to Hello</router-link>
        <router-link to="/increase">Go to Increase</router-link>
    </p>
    <router-view></router-view>
</div>

</template>

<script setup>
import IncreaseCount from './components/increase-count.vue'

</script>