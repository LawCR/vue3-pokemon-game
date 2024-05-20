import { computed, onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces'
import { pokemonApi } from '../api/pokemonApi'
import confetti from 'canvas-confetti'

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export const usePokemon = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing)
  const pokemons = ref<Pokemon[]>([])
  const pokemonOptions = ref<Pokemon[]>([])
  const message = ref<string>('')
  const score = ref<number>(0)
  const maxScore = ref<number>(0)
  const isLoading = computed(() => pokemons.value.length === 0)

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length)
    return pokemonOptions.value[randomIndex]
  })

  const getPokemons = async (): Promise<Pokemon[]> => {
    const { data } = await pokemonApi.get<PokemonListResponse>('/?limit=151')
    const pokemonsArray = data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/')
      const id = Number(urlParts.at(-2) || 0)
      return {
        name: pokemon.name,
        id,
      }
    })

    return pokemonsArray.sort(() => Math.random() - 0.5)
  }

  onMounted(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    const shootConfetti = () => {
      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: 350,
        origin: {
          x: Math.random(),
          y: Math.random() * 1 - 0.2,
        },
        colors: ['#ffffff'],
        shapes: ['circle'],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      })
    }

    setInterval(() => {
      shootConfetti()
    }, 150)
    pokemons.value = await getPokemons()
    maxScore.value = Number(localStorage.getItem('maxScore')) || 0
    getNextRound()
  })

  const getNextRound = async (quantity: number = 4) => {
    if (gameStatus.value === GameStatus.Lost) {
      score.value = 0
    }
    gameStatus.value = GameStatus.Playing
    pokemonOptions.value = pokemons.value.slice(0, quantity)
    pokemons.value = pokemons.value.slice(quantity)

    // if (pokemons.value.length < quantity) {
    //   gameStatus.value = GameStatus.Won
    // }
  }

  const checkAnswer = (pokemonId: number) => {
    const hasWon = randomPokemon.value.id === pokemonId
    if (hasWon) {
      gameStatus.value = GameStatus.Won
      score.value += 1
      message.value = '¡Correcto!'
      if (score.value > maxScore.value) {
        maxScore.value = score.value
        localStorage.setItem('maxScore', maxScore.value.toString())
      }
      confetti({
        particleCount: 250, // Cantidad de confetti
        spread: 150, // Distancia de dispersión
        origin: { y: 0.6 }, // Origen de la lluvia de confetti
      })
      return
    }

    gameStatus.value = GameStatus.Lost
    message.value = '¡Incorrecto!'
  }

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    score,
    maxScore,
    message,

    // Methods
    getNextRound,
    checkAnswer,
  }
}
