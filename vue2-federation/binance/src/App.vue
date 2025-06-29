<template>
<div>
    <editor :name="constantFromShell" />
</div>

</template>

<script setup>
import editor from './components/editor.vue'
import { constantFromShell } from 'shell/utils'
</script>