<template>
<div>
    <hello />
    <IncreaseCount :increment="4" />
    <BinanceEditor />
</div>

</template>

<script setup>
import IncreaseCount from 'shell/components/increase-count'
import BinanceEditor from 'binance/components/editor'
import hello from './components/helloworld.vue'
</script>