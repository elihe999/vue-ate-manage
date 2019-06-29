<template>
    <div>
        <ESuiteTable :model="model" ref="historytable"></ESuiteTable>
    </div>
</template>

<script>
    import ESuiteTable from "@/components/table/historyTable";
    export default {
        components: {
            ESuiteTable
        },
        data() {
            return {
                model: {
                    type: this.$route.path
                }
            }
        }
    }

</script>

<style scoped>
  
</style>
