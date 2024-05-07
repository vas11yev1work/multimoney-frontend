<template>
  <div class="flex w-full items-center justify-between">
    <div class="flex items-center">
      <div class="mr-3 flex h-10 w-10 min-w-10 items-center justify-center rounded-xl bg-gray-100">
        <UiIcon :icon-name="category?.icon ?? 'faHome'" size="lg" class="text-blue-500" />
      </div>
      <div>
        <UiTypo level="5" class="font-medium text-slate-400">{{ category?.name ?? '' }}</UiTypo>
        <div class="flex items-end">
          <UiMoney :value="amount?.amount ?? 0" :currency="amount?.currency" class="font-semibold" />
          <div v-if="category?.limit" class="ml-1 flex">
            <UiTypo level="6" class="mr-1 font-semibold leading-6">/</UiTypo>
            <UiMoney
              level="6"
              class="font-semibold leading-6 opacity-60"
              :value="category.limit.amount ?? 0"
              :currency="category.limit.currency"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="category?.limit" class="flex items-center">
      <div class="h-1.5 w-12 overflow-hidden rounded-full bg-gray-100">
        <div class="h-full w-full origin-left" :class="limitColor" :style="`transform: scaleX(${scaleParam})`" />
      </div>
      <UiTypo level="6" class="ml-1.5 font-medium text-slate-400">{{ limitPercent }}%</UiTypo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ExpenseCategory } from '@/shared/api';
import { AmountModel } from '@/shared/lib';
import { UiIcon, UiMoney, UiTypo } from '@/shared/ui';

const props = defineProps<{
  category?: ExpenseCategory;
  amount?: AmountModel;
}>();

const limitPercent = computed(() => {
  if (!props.category?.limit) {
    return 0;
  }

  return Math.floor(((props.amount?.amount ?? 0) / props.category.limit.amount) * 100);
});

const scaleParam = computed(() => {
  return limitPercent.value / 100 > 100 ? 1 : limitPercent.value / 100;
});

const limitColor = computed(() => {
  if (limitPercent.value > 100) {
    return 'bg-red-500';
  }

  if (limitPercent.value > 80) {
    return 'bg-amber-500';
  }

  return 'bg-green-500';
});
</script>
