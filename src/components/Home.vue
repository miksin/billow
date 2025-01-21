<script setup lang="ts">
import AuthPage from "@components/AuthPage.vue";
import BookList from "@components/BookList.vue";
import CreateBookDialog from "@components/CreateBookDialog.vue";
</script>

<template>
  <AuthPage>
    <main class="flex flex-col gap-4">
      <h1 class="prose-2xl">Books</h1>
      <CreateBookDialog />
      <BookList />
    </main>
  </AuthPage>
</template>
