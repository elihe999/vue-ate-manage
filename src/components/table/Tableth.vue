<template>
    <div>
        <label>Hi: {{ value }} <slot></slot></label>
        
    </div>
</template>

<script>
    export default {
        inject: ['name'],
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