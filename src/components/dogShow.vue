<template>
  <img :src='result.message' />
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DogShow',
  async setup () {
    const result = await (await axios.get('https://dog.ceo/api/breeds/image/random')).data
    console.log(result)
    return {
      result
    }
  }
})
</script>
