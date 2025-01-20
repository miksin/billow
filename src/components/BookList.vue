<script lang="ts" setup>
import BookCard from "./BookCard.vue";
import { useGetBooksQuery } from "../lib/store/book";

const query = useGetBooksQuery();
</script>

<template>
  <div v-if="query.isLoading">Loading...</div>
  <div v-if="query.data" class="flex flex-col gap-4">
    <BookCard
      v-for="{ bookUlid, sum } in query.data"
      :key="bookUlid"
      :name="bookUlid"
      :sum="sum"
    />
  </div>
</template>
