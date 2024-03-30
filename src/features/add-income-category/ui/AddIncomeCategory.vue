<template>
  <form class="flex flex-col gap-3" @submit="onSubmit">
    <UiInput label="Название категории" name="name" required />
    <IncomeIconSelect name="icon" />
    <UiButton type="submit" size="large" class="sticky bottom-4 mt-2">Добавить</UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { UiInput, IncomeIconSelect, UiButton } from '@/shared/ui';
import { validationSchema } from '../model';

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(validationSchema),
  initialValues: {
    name: '',
    icon: 'faMoneyBill',
  },
});

const onSubmit = handleSubmit(values => {
  console.log(values);
});
</script>
