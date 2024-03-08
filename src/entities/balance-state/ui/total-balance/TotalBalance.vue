<template>
  <UiContainer class="flex h-full flex-col justify-center">
    <UiTypo level="5" class="mb-1 font-semibold leading-5 text-slate-400">Общий баланс</UiTypo>
    <UiMoney type="heading" level="2" class="font-bold" :value="balance?.amount || 0" :currency="balance?.currency" />
  </UiContainer>
</template>

<script setup lang="ts">
import { AmountModel } from '@/shared/lib';
import { UiContainer, UiMoney, UiTypo } from '@/shared/ui';

withDefaults(
  defineProps<{
    balance?: AmountModel;
    loading?: boolean;
  }>(),
  {
    balance: undefined,
    loading: true,
  }
);
</script>
