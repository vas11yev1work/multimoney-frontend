<template>
  <div class="flex h-8 w-12 min-w-12 max-w-12 items-start justify-end rounded pr-1 pt-1" :class="cardColor">
    <span class="text-[10px] font-semibold leading-3 text-white">{{ card?.label ?? '****' }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Card } from '@/shared/api';
import { getCardColor } from '@/shared/lib';

const props = defineProps<{
  card?: Card;
}>();

const cardColor = computed(() => {
  return getCardColor(props.card?.color);
});
</script>
