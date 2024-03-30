<template>
  <UiTypo type="heading" level="5" class="font-semibold">Выберите иконку:</UiTypo>
  <div class="grid grid-cols-6 gap-3">
    <div v-for="icon in Icons" :key="icon" class="flex justify-center">
      <button
        type="button"
        class="h-11 w-11 rounded-lg bg-slate-100 text-blue-500"
        :class="[icon === value && `!bg-blue-500 !text-white`]"
        @click="handleChange(icon)"
      >
        <UiIcon size="lg" :icon-name="icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { UiIcon, UiTypo } from '@/shared/ui';
import { Icons } from './icons.ts';

const props = defineProps<{
  name: string;
}>();

const { handleChange, value } = useField(props.name, undefined);
</script>
