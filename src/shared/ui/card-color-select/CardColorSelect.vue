<template>
  <UiTypo type="heading" level="5" class="font-semibold">Выберите цвет карты:</UiTypo>
  <div class="grid grid-cols-6 gap-4">
    <div v-for="color in CardColor" :key="color" class="flex justify-center">
      <button
        type="button"
        class="h-10 w-10 rounded-full border-4 border-white"
        :class="[getCardColor(color), color === value && `ring-4 ${ringColor}`]"
        @click="handleChange(color)"
      />
      <!-- Фича. Tailwind вырезает неиспользуемые классов, динамически стили не вычисляются, поэтому нужно только ради подгрузки классов -->
      <div v-show="false">
        <div class="ring-slate-700"></div>
        <div class="ring-red-500"></div>
        <div class="ring-orange-500"></div>
        <div class="ring-amber-500"></div>
        <div class="ring-lime-500"></div>
        <div class="ring-emerald-500"></div>
        <div class="ring-cyan-500"></div>
        <div class="ring-blue-500"></div>
        <div class="ring-indigo-500"></div>
        <div class="ring-violet-500"></div>
        <div class="ring-pink-500"></div>
        <div class="ring-rose-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed } from 'vue';
import { CardColor } from '@/shared/api';
import { getCardColor } from '@/shared/lib';
import { UiTypo } from '@/shared/ui';

const props = defineProps<{
  name: string;
}>();

const { handleChange, value } = useField(props.name, undefined);

const ringColor = computed(() => {
  const arr = getCardColor(value.value as CardColor).split('-');
  arr[0] = 'ring';
  return arr.join('-');
});
</script>
