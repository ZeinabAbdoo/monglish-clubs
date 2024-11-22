<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    eventName: {
      type: String,
      required: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.btn {
  padding: 10px 40px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(296.63deg, #F47D21 -0.48%, #FF9D52 100.48%);
  color: white;
  height: 50px;
  min-width: fit-content;
  width: 240;
  border: none;
  line-height: 26.46px;
}
</style>
