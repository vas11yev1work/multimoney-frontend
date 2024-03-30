<template>
  <UiContainer class="flex h-full flex-col justify-center" @click="$emit('change-currency')">
    <UiTypo level="5" class="mb-1 font-semibold leading-5 text-slate-400">Общий баланс</UiTypo>
    <UiMoney type="heading" level="2" class="font-bold" :value="balance" :currency="currency" />
  </UiContainer>
</template>

<script setup lang="ts">
import { Currency, CurrencyType } from '@/shared/lib';
import { UiContainer, UiMoney, UiTypo } from '@/shared/ui';

withDefaults(
  defineProps<{
    balance?: number;
    currency?: Currency | CurrencyType;
    loading?: boolean;
  }>(),
  {
    balance: 0,
    loading: true,
    currency: undefined,
  }
);

defineEmits<{
  (e: 'change-currency'): void;
}>();
</script>
