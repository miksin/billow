<script lang="ts" setup>
import SVGIcon from "@components/SVGIcon.vue";

const { name, sum } = defineProps<{
  name: string;
  sum: number;
}>();
</script>

<template>
  <div class="card card-side card-compact bg-base-200 shadow-xl">
    <figure class="w-24 bg-secondary">
      <SVGIcon name="home" class="w-12 fill-base-100" />
    </figure>
    <div class="card-body">
      <h2 class="prose-xl">{{ name }}</h2>
      <h6 class="prose">you owe ¥{{ sum }}</h6>
      <div class="flex flex-col">
        <p class="prose-sm">you owe Alice ¥12345</p>
        <p class="prose-sm">you owe Bob $155</p>
      </div>
    </div>
  </div>
</template>
