import { persistentAtom } from "@nanostores/persistent";
import type { UserBookRel } from "../models";
import { fetcher, type FetcherState, type Query } from "./fetcher";
import { StoreKey } from "./key";
import { useStore } from "@nanostores/vue";
import { computed, reactive, ref, watchEffect } from "vue";

type BookCache = {
  data: UserBookRel[] | null;
};

const $booksCache = persistentAtom<BookCache>(
  StoreKey.ApiBooks,
  { data: null },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const useGetBooksQuery = () => {
  const bookCache = useStore($booksCache);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const data = computed(() => bookCache.value.data);

  watchEffect(async () => {
    if (!data.value && !isLoading.value) {
      isLoading.value = true;
      error.value = null;
      try {
        const result = await fetcher<UserBookRel[]>("/api/books");
        $booksCache.set({ data: result });
        isLoading.value = false;
      } catch (err) {
        error.value = JSON.stringify(err);
        isLoading.value = false;
      }
    }
  });
  return reactive({ data, isLoading, error });
};
