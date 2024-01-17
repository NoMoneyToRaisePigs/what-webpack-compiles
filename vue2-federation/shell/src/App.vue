<template>
<div>
    <div>b</div>
    <IncreaseCount :increment="xxx" />
</div>

</template>

<script setup>
import {ref} from 'vue'

import IncreaseCount from './components/increase-count.vue'
import { double } from 'share/utils'

const xxx = ref(double(2))
</script>