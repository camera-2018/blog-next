<template>
  <div class="download">
    <button @click="download()">📎下载附件代码</button>
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
const download = () => {
  window.open(url.url);
};
</script>

<style scoped>
button {
  background-color: var(--vp-c-neutral);
  color: var(--vp-c-neutral-inverse);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  margin: auto 10px;
}

button:hover {
  background-color: color-mix(in srgb, var(--vp-c-neutral) 82%, var(--vp-c-bg));
  transition: background-color 0.2s ease-in-out;
}

.download {
  display: inline-block;
}
</style>
