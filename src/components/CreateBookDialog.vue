<script setup lang="ts">
import { ref } from "vue";
import SVGIcon from "./SVGIcon.vue";

const dialogOpen = ref(false);
function openDialog() {
  dialogOpen.value = true;
}
function closeDialog() {
  dialogOpen.value = false;
}
</script>

<template>
  <button class="btn" @click="openDialog">
    <SVGIcon name="receipt_long" class="h-6 w-6 fill-current" />
    Create a book
  </button>
  <dialog class="modal modal-bottom" :class="{ 'modal-open': dialogOpen }">
    <div class="modal-box mx-auto max-w-128 pb-8">
      <form method="dialog">
        <button
          class="btn btn-circle btn-ghost absolute right-2 top-2"
          @click="closeDialog"
        >
          <SVGIcon name="close" class="fill-current" />
        </button>
      </form>
      <form class="flex flex-col gap-4">
        <label class="form-control">
          <div class="label">
            <span class="label-text">Title</span>
          </div>
          <input type="text" class="input input-secondary" />
        </label>
        <label class="form-control">
          <div class="label">
            <span class="label-text">Thumbnail</span>
          </div>
          <select class="select select-secondary">
            <option value="home">Home</option>
          </select>
        </label>
        <button type="button" class="btn btn-primary">Create</button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeDialog">close</button>
    </form>
  </dialog>
</template>
