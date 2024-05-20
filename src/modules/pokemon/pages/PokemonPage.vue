<template>
  <section v-if="isLoading || !randomPokemon.id" class="flex flex-col justify-center items-center h-screen text-white">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse mt-1">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center h-screen overflow-y-auto">
    <img src="/pokemon.svg" alt="Pokemon logo" class="w-40 my-4" />
    <h1 class="text-3xl text-white">¿Quién es este Pokémon?</h1>
    <div class="flex w-[340px] justify-between mt-2 mb-5 text-white">
      <h3>Puntación Actual: {{ score }}</h3>
      <h3>Puntaje máximo: {{ maxScore }}</h3>
    </div>
    <h2 v-if="gameStatus !== GameStatus.Playing" :class="['fade-in', gameStatus].join(' ')">{{ message }}</h2>

    <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />
    <PokemonOptions :options="pokemonOptions" @selected-option="checkAnswer"
      :block-selection="gameStatus !== GameStatus.Playing" :correct-answer="randomPokemon.id" />
    <PokemonButton :game-status="gameStatus" @getNextRound="getNextRound" />

  </section>
</template>

<script setup lang="ts">
import PokemonButton from '../components/PokemonButton.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemon } from '../composables/usePokemon';
import { GameStatus } from '../interfaces';

const { gameStatus, isLoading, pokemonOptions, randomPokemon, checkAnswer, getNextRound, maxScore, score, message } = usePokemon()

</script>

<style scoped>
h2 {
  color: white;
  font-size: 18px;
  padding: 4px 16px 8px 16px;
  border-radius: 8px;
  width: 340px;
  text-align: center;
  margin: 1px 0 8px 0;
  /* background-color: #f44336; */
}

.won {
  background-color: #4caf50;
  /* border: 1px solid #4caf50; */
}

.lost {
  background-color: #f44336;
  /* border: 1px solid #ef4444; */
}
</style>