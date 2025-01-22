<script setup lang="ts">
import { computed, ref } from "vue";
import SVGIcon from "@components/SVGIcon.vue";
import { currencyList, thumbnailList } from "@lib/constants";
import { BookStatus, type Book } from "@lib/models";
import { ulid } from "ulid";
import { useMutation } from "@lib/store";

const dialogOpen = ref(false);
function openDialog() {
  dialogOpen.value = true;
}
function closeDialog() {
  dialogOpen.value = false;
}

const nameValue = ref("");
const currencyValue = ref(currencyList[0]);
const thumbnailValue = ref(thumbnailList[0]);

const clearForm = () => {
  nameValue.value = "";
  currencyValue.value = currencyList[0];
  thumbnailValue.value = thumbnailList[0];
};

const { trigger, isLoading } = useMutation<void>();

const canSubmit = computed(() => {
  if (nameValue.value.length < 1) return false;
  if (nameValue.value.length > 32) return false;
  if (isLoading.value) return false;
  return true;
});

async function handleSubmit() {
  const formData: Book = {
    ulid: ulid(),
    name: nameValue.value,
    currency: currencyValue.value,
    thumbnail: thumbnailValue.value,
    status: BookStatus.Active,
  };
  await trigger("/api/books", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  clearForm();
  // TODO: update cache
  closeDialog();
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
            <span class="label-text">Currency</span>
          </div>
          <select class="select select-secondary" v-model="currencyValue">
            <option v-for="currency in currencyList" :value="currency">
              {{ currency }}
            </option>
          </select>
        </label>
        <label class="form-control">
          <div class="label">
            <span class="label-text">Name</span>
            <span class="label-text-alt">{{ nameValue.length }}/32</span>
          </div>
          <input
            type="text"
            v-model="nameValue"
            class="input input-secondary"
            maxlength="32"
          />
        </label>
        <label class="form-control">
          <div class="label">
            <span class="label-text">Thumbnail</span>
          </div>
          <div class="grid autofill-grid gap-2">
            <div
              v-for="iconName in thumbnailList"
              class="rounded-lg cursor-pointer aspect-square bg-secondary flex items-center justify-center"
              :class="{ 'ring-4 ring-primary': iconName === thumbnailValue }"
              @click="thumbnailValue = iconName"
            >
              <SVGIcon :name="iconName" class="w-3/4 h-3/4 fill-base-100" />
            </div>
          </div>
        </label>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="!canSubmit"
          @click="handleSubmit"
        >
          <span v-if="isLoading" class="loading loading-spinner"></span>
          <template v-else> Create </template>
        </button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeDialog">close</button>
    </form>
  </dialog>
</template>

<style>
.autofill-grid {
  grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
}
</style>
