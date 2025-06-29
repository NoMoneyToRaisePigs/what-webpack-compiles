<template>
    <div>
        <h2>Shell - The Profile page</h2>
        <div style="border: 1px solid red; margin: 10px;">
            <p>Own Increse Component</p>
            <IncreaseCount :increment="2" />
        </div>
        <div style="border: 1px solid blue; margin: 10px;">
            <p>Binance Sub project Component</p>
             <Editor :name="'123456'"/>
        </div>
    </div>
</template>

<script>
import Editor from 'binance/components/editor'
import IncreaseCount from '@/components/increase-count.vue'

export default {
    name: 'profile-view',
    components: {
        Editor,
        IncreaseCount
    }
} 

</script>
