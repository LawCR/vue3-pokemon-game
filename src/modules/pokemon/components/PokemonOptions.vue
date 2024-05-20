<template>
  <section class="mt-5">
    <div class="option-list">
      <button v-for="{ id, name } in options" :key="id" :disabled="blockSelection"
        :class="['hover:bg-gray-100 hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none', { correct: id === correctAnswer && blockSelection, wrong: id !== correctAnswer && blockSelection && id === selectedOption }]"
        @click="onSelectedOption(id)">{{
          name }}</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[]
  blockSelection: boolean
  correctAnswer: number
}

defineProps<Props>()
const emits = defineEmits<{
  selectedOption: [id: number]
}>()
const selectedOption = ref<number | null>(null)
const onSelectedOption = (id: number) => {
  selectedOption.value = id
  emits('selectedOption', id)
}
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 w-40 text-center transition-all capitalize;
}

.option-list {
  @apply grid grid-cols-2 gap-5;
}

.correct {
  @apply bg-green-500 text-white animate-bounce;
}

.wrong {
  @apply bg-red-500 opacity-85 text-white;
}
</style>