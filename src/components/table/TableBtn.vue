<template>
    <th><button v-bind:key="value">{{ value }}</button></th>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            value: {
                type: String,
                default: ""
            }
        },
        methods: {
            
        }
    };
</script>