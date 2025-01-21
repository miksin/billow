<script lang="ts" setup>
import { $accessToken } from "@lib/store/auth";
import { onMounted } from "vue";
onMounted(() => {
  if ($accessToken.get() === "") {
    window.location.assign("/login");
  }
});
</script>

<template>
  <slot></slot>
</template>
