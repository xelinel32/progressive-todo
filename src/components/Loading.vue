<template>
  <div class="progress" v-if="isLoading">
    <div class="indeterminate green"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
}
</script>

<style></style>
