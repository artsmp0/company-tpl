import { tryOnMounted } from '@vueuse/core';
import type { MaybeRefOrGetter } from 'vue';

export function useForm(initialValues: Recordable, scrollToFirstError: MaybeRefOrGetter) {
  const formRef = shallowRef();
  const needScrollToFirstError = ref(false);

  watchEffect(() => {
    needScrollToFirstError.value = toValue(scrollToFirstError);
  });

  const validate = async (...args: any[]) => {
    try {
      await formRef.value?.validate(...args);
      return Promise.resolve();
    } catch (error: any) {
      if (Array.isArray(error) && needScrollToFirstError.value) {
        const t = document.querySelector(`[target="${error[0][0].field}"]`);
        t?.scrollIntoView({ block: 'center' });
      }
      return Promise.reject('表单验证失败！');
    }
  };

  const restoreValidation = () => {
    formRef.value?.restoreValidation();
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  const setValues = (initialValues: { [field: string]: any }) => {
    for (const [key, value] of Object.entries(initialValues)) {
      formRef.value.model[key] = value;
    }
  };

  const getValues = () => {
    return formRef.value.model;
  };

  return {
    formRef,
    restoreValidation,
    validate,
    resetValues,
    getValues,
    setValues
  };
}

export function useFetchField(apiFn?: Function) {
  if (!apiFn) return undefined;
  const loading = ref(false);
  const options = shallowRef([]);
  tryOnMounted(async () => {
    loading.value = true;
    const res = await apiFn();
    loading.value = false;
    options.value = res;
  });
  return { loading, options };
}
