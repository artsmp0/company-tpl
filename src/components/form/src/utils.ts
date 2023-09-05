export function useForm(initialValues: Recordable) {
  const formRef = shallowRef();

  const validate = async (...args: any[]) => {
    await formRef.value?.validate(...args);
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
