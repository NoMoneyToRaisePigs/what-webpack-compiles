<template>
<div>
    <h3>Hello, {{ name }}</h3>
    <button @click="handleClick">Request Test</button>
</div>

</template>

<script>
import { rawRequest } from '@/utils/request'

export default {
    name: 'hello-component',
    data() {
        return {
            name: 'vue'
        }
    },
    methods: {
        handleClick() {
            setTimeout(() => {
                rawRequest({
                    url: '/api/test',
                    method: 'get'
                }).then(res => {
                    console.log(res)
                })
            }, 3000);
        }
    }
}
// import { ref } from 'vue'
// import { rawRequest } from '@/utils/request'

// const name = ref('vue')

// function handleClick() {
//     name.value = 'vite'

// setTimeout(() => {
//         rawRequest({
//         url: '/api/test',
//         method: 'get'
//     }).then(res => {
//         console.log(res)
//     })
// }, 3000);

// }
</script>