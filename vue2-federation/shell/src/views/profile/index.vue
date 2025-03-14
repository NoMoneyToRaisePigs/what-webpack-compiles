<template>
    <div>
        The Profile page
        {{ name }}
        {{ res }}
        <xxx :name="123"/>
        <Test2 />
    </div>
</template>

<script>
import xxx from 'binance/components/editor'
import Test2 from '@/components/test.vue'
import { myExport } from '../../test-console'
console.log(myExport())
import request from '@/utils/request'

export default {
    name: 'profile-view',
    components: {
        xxx,
        Test2
    },
    data() {
        return {
            name: myExport(),
            display: null
        }
    },
    mounted(){
        this.getUserDataV2()
    },
    method: {
        getUserDataV2(){
            const res = request({
                url: 'user/get-info-v2',
                data: '123'
            })

            this.display = res
        }
    }
} 

</script>
