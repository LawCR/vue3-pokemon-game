<template>
  <div class="flex justify-center items-center mt-6">
    <button v-if="gameStatus !== GameStatus.Playing" @click="$emit('getNextRound')"
      class="bg-blue-500 text-white w-[340px] px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
      {{ gameStatus === GameStatus.Won ? 'Siguiente ronda' : '¿Jugar de nuevo?' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { GameStatus } from '../interfaces';
interface Props {
  gameStatus: GameStatus
}
defineEmits<{
  getNextRound: []
}>()
defineProps<Props>()

</script>

<style scoped></style>