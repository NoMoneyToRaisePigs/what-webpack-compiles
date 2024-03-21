<template>
    <div>
        The Profile page
        <xxx :name="123"/>
        <Test2 />
    </div>
</template>

<script>
import xxx from 'binance/components/editor'
import Test2 from '@/components/test.vue'

export default {
    name: 'profile-view',
    components: {
        xxx,
        Test2
    }
}

</script>
