import { fetcher, type FetcherOptions } from "@lib/fetcher";
import { persistentAtom } from "@nanostores/persistent";
import { useVModel } from "@nanostores/vue";
import type { WritableAtom } from "nanostores";
import { onMounted, ref } from "vue";

export const StoreKey = {
  AccessToken: "accessToken",
} as const;
export type StoreKey = (typeof StoreKey)[keyof typeof StoreKey];

type QueryStore<T> = {
  data: T | null;
};

const getQueryStore = <T>(storeKey: string): WritableAtom<QueryStore<T>> =>
  persistentAtom<QueryStore<T>>(
    storeKey,
    { data: null },
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    },
  );

export const useMountedQuery = <T>(uri: string, options?: FetcherOptions) => {
  const $cache = getQueryStore<T>(uri);
  const data = useVModel($cache, "data");
  const isLoading = ref(false);
  const isError = ref(false);

  const trigger = async () => {
    $cache.set({ data: null });
    isLoading.value = true;
    isError.value = false;
    try {
      const result = await fetcher<T>(uri, options);
      $cache.set({ data: result });
      isLoading.value = false;
      return result;
    } catch (err) {
      isLoading.value = false;
      isError.value = true;
      throw err;
    }
  };

  onMounted(() => {
    if (!data.value) {
      trigger();
    }
  });
  return { data, isLoading, isError };
};

export const useMutation = <T>() => {
  const result = ref<T | null>(null);
  const isLoading = ref(false);
  const isError = ref(false);

  const trigger = async (uri: string, options?: FetcherOptions) => {
    isLoading.value = true;
    isError.value = false;
    try {
      const r = await fetcher<T>(uri, options);
      isLoading.value = false;
      result.value = r;
      return r;
    } catch (err) {
      isLoading.value = false;
      isError.value = true;
      throw err;
    }
  };

  return { result, isLoading, isError, trigger };
};
