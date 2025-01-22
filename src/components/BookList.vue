<script lang="ts" setup>
import type { UserBookRel } from "@lib/models";
import { useMountedQuery } from "@lib/store";
import BookCard from "@components/BookCard.vue";

const { data, isLoading } = useMountedQuery<UserBookRel[]>("/api/books");
</script>

<template>
  <span
    class="mt-8 mx-auto loading loading-spinner loading-lg text-primary"
    v-if="isLoading"
  ></span>
  <div v-if="data" class="flex flex-col gap-4">
    <BookCard
      v-for="{ bookUlid, sum } in data"
      :key="bookUlid"
      :name="bookUlid"
      :sum="sum"
    />
  </div>
</template>
