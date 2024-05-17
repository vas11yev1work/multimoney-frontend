<template>
  <div
    class="relative h-20 w-32 min-w-32 max-w-32 overflow-hidden rounded-xl text-white"
    :class="cardColor"
    @click="$emit('click')"
  >
    <div class="flex h-full flex-col justify-between p-2">
      <div class="flex justify-between opacity-80">
        <UiTypo
          level="6"
          class="overflow-hidden overflow-ellipsis text-nowrap font-semibold"
          :class="card?.label ? 'max-w-[55%]' : 'max-w-full'"
        >
          {{ card?.name || '' }}
        </UiTypo>
        <UiTypo v-if="card?.label" level="6" class="text-nowrap font-semibold">** {{ card.label }}</UiTypo>
      </div>
      <div>
        <UiMoney :currency="card?.balance.currency" :value="card?.balance.amount ?? 0" class="font-bold" />
        <UiMoney
          v-if="card?.balance.currency !== card?.currencyBalance.currency"
          :currency="card?.currencyBalance.currency"
          :value="card?.currencyBalance.amount ?? 0"
          level="6"
          class="font-semibold opacity-80"
        />
      </div>
    </div>
    <div class="absolute -bottom-7 -right-9 h-24 w-24 rounded-full bg-white opacity-[0.08]" />
    <div class="absolute -bottom-7 -right-9 h-24 w-24 scale-[0.70] rounded-full bg-white opacity-[0.08]" />
    <div class="absolute -bottom-7 -right-9 h-24 w-24 scale-[0.40] rounded-full bg-white opacity-[0.08]" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Card } from '@/shared/api';
import { getCardColor } from '@/shared/lib';
import { UiMoney, UiTypo } from '@/shared/ui';

const props = defineProps<{
  card?: Card;
}>();

defineEmits<{
  (e: 'click'): void;
}>();

const cardColor = computed(() => {
  return getCardColor(props.card?.color);
});
</script>
