<template>
  <div class="pdf">
    <button @click="open">打开PDF</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const url = defineProps({
  url: {
    type: String,
    default: "",
  },
});
const open = () => {
  window.open(url.url);
};
</script>

<style scoped>
button {
  width: 100px;
  height: 40px;
  background-color: var(--vp-c-neutral);
  color: var(--vp-c-neutral-inverse);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: color-mix(in srgb, var(--vp-c-neutral) 82%, var(--vp-c-bg));
}

.pdf {
  display: block;
  margin: 1rem auto;
}
</style>
