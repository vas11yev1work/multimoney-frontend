<template>
  <UiContainer class="flex h-full flex-col justify-center" @click="$emit('change-currency')">
    <UiTypo level="5" class="mb-1 font-semibold leading-5 text-slate-400">Общий баланс</UiTypo>
    <UiSuspense :data="balance">
      <UiMoney type="heading" level="2" class="font-bold" :value="currentBalance" :currency="currency" />
      <template #loading>
        <UiSkeleton height="36px" width="180px" radius="8px" />
      </template>
      <!-- TODO: error -->
    </UiSuspense>
  </UiContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BalanceState, SharedData } from '@/shared/api';
import { Currency, CurrencyType } from '@/shared/lib';
import { UiContainer, UiMoney, UiSkeleton, UiSuspense, UiTypo } from '@/shared/ui';

const props = withDefaults(
  defineProps<{
    balance: SharedData<BalanceState>;
    currency?: Currency | CurrencyType;
  }>(),
  {
    currency: 'EUR',
  }
);

defineEmits<{
  (e: 'change-currency'): void;
}>();

const currentBalance = computed(() => {
  if (!props.balance.data?.total) return 0;
  return props.balance.data.total[props.currency]?.amount || 0;
});
</script>
