<template>
<div>
    <div>nnn</div>
    <IncreaseCount :increment="xxx" />
    <Editor />
</div>

</template>

<script setup>
import {ref} from 'vue'

import IncreaseCount from './components/increase-count.vue'
import { double } from 'share/utils'
import { Editor } from 'binance/bcomponents'

const xxx = ref(double(2))

// const xxx = ref(3)
</script>