<template>
  <div class="p-3">
    <UiTypo type="heading" class="mb-3 font-semibold">Debug page</UiTypo>
    <pre class="mb-4">Date: {{ date }}</pre>
    <UiDatepicker v-model="date" range :max-date="dayjs()" />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref } from 'vue';
import { UiDatepicker, UiTypo } from '@/shared/ui';
import type { DatepickerModel } from '@/shared/ui';

const date = ref<DatepickerModel>([dayjs().startOf('month'), dayjs().endOf('day')]);
</script>
