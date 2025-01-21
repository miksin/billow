<script setup lang="ts" generic="T extends string">
import { defineAsyncComponent } from "vue";

const props = defineProps<{
  name: T;
}>();

const iconComponent = defineAsyncComponent(
  () => import(`@assets/icons/${props.name}.svg?component`),
);
</script>

<template>
  <component :is="iconComponent" />
</template>
