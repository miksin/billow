<script setup lang="ts">
import { $accessToken } from "@lib/store/auth";
import AuthPage from "@components/AuthPage.vue";
import SVGIcon from "@components/SVGIcon.vue";

const logout = () => {
  $accessToken.set("");
  window.location.assign("/login");
};
</script>

<template>
  <AuthPage>
    <div class="flex flex-col gap-8 py-32">
      <div class="flex flex-col items-center">
        <SVGIcon class="mx-auto h-32 w-32 fill-success" name="check-circle" />
        <h1 class="prose-xl">Login Succeed</h1>
      </div>
      <div class="flex flex-col gap-4">
        <a class="btn btn-primary" href="/">Back to Top</a>
        <button class="btn btn-outline" @click="logout">Logout</button>
      </div>
    </div>
  </AuthPage>
</template>
