<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps<{
  name: IconName;
}>();

const iconComponent = defineAsyncComponent(
  () => import(`../assets/icons/${props.name}.svg?component`),
);
</script>

<template>
  <component :is="iconComponent" />
</template>
