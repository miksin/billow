<script lang="ts" setup>
import { $accessToken } from "../../lib/store/auth";
import { onMounted, ref } from "vue";

const tokenText = ref("");
const setToken = () => {
  $accessToken.set(tokenText.value);
  window.location.assign("/login/succeed");
};

onMounted(() => {
  if ($accessToken.get() !== "") {
    window.location.assign("/login/succeed");
  }
});
</script>

<template>
  <form class="flex flex-col gap-4">
    <label class="form-control">
      <div class="label">
        <span class="label-text">Access Token</span>
      </div>
      <input type="string" class="input input-secondary" v-model="tokenText" />
    </label>
    <button
      type="button"
      class="btn btn-primary"
      @click="setToken"
      :disabled="!tokenText"
    >
      Login
    </button>
  </form>
</template>
