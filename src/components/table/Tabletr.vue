<template>
    <tr>
        <slot></slot>
    </tr>    
</template>

<script>
export default {
    provide: {
        for: "test"
    }
}
</script>
