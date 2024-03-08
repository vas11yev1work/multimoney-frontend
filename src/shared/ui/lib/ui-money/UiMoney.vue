<template>
  <UiTypo v-bind="$attrs">
    {{ integerPart }}<span class="opacity-50">.{{ mantissa }} {{ currencySymbol }}</span>
  </UiTypo>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Currency, type CurrencyType, getCurrencySymbol } from '@/shared/lib';
import { UiTypo } from '../ui-typo';

const props = defineProps<{
  currency?: Currency | CurrencyType;
  value: number;
}>();

const integerPart = computed(() => {
  return `${Math.trunc(props.value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
});

const mantissa = computed(() => {
  return props.value.toFixed(2).split('.')[1];
});

const currencySymbol = computed(() => {
  return getCurrencySymbol(props.currency);
});
</script>
