<template>
  <div>
    <table>
        <slot></slot>
    </table>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>