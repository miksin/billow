<script lang="ts" setup>
import { onMounted, ref } from "vue";
import BookCard from "./BookCard.vue";
import type { UserBookRel } from "../lib/models";

const userBookRels = ref<UserBookRel[]>([]);

const getBooks = async () => {
  try {
    const res = await fetch("/api/books", {
      headers: { Authorization: "Bearer token1" },
    });
    const data = await res.json();
    userBookRels.value = data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  getBooks();
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <BookCard
      v-for="{ bookUlid, sum } in userBookRels"
      :key="bookUlid"
      :name="bookUlid"
      :sum="sum"
    />
  </div>
</template>
