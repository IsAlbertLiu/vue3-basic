<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <!-- <router-view/> -->
  <div>
    <Suspense>
      <template #default>
        <div>
          <async-show/>
          <dog-show/>
        </div>
        </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
    <p>{{count}}</p>
    <p>{{double}}</p>
    <button @click="increase" >+1</button>
    <ul>
      <li v-for="(item, index) in numbers" :key=index>{{item}}</li>
    </ul>
     <ul>
      <li v-for="(item, index) of person" :key=index>{{item}}</li>
    </ul>
    <p>{{gretting}}</p>
    <button @click="greet">gretting</button>
    <p>X:{{x}}</p>
    <p>Y:{{y}}</p>
    <div v-if="loading">Loading...</div>
    <img v-if="loaded" :src="result.message" alt="">
    <button @click="onModalOpen">Open Modal</button>
    <modal @close-modal='onModalClose' :isOpen='modalIsOpen'>My Modal</modal>
  </div>
</template>

<script lang="ts">
import { computed, reactive, ref, toRefs, watch } from 'vue'
import useMousePosition from '@/hooks/useMousePosition'
import useURLLoader from '@/hooks/useURLLoader'
import modal from '@/components/modal.vue'
import asyncShow from '@/components/asyncShow.vue'
import dogShow from '@/components/dogShow.vue'
interface DataProps {
  count: number;
  increase: () => void;
  double: number;
  person: object;
  numbers: number[];
}
interface DogData {
  message: string;
  status: string;
}
export default {
  name: 'App',
  components: {
    modal,
    asyncShow,
    dogShow
  },
  setup () {
    // const count = ref(1)
    // const increase = () => {
    //   count.value++
    // }
    // const double = computed(() => {
    //   return count.value * 2
    // })
    const data: DataProps = reactive({
      count: 0,
      increase: () => { data.count++ },
      double: computed(() => data.count * 2),
      person: {},
      numbers: [1, 2, 3]
    })
    const gretting = ref('hello')
    const greet = () => { gretting.value += ' hello' }
    watch([gretting, () => data.count], () => {
      document.title = gretting.value + data.count
    })
    // data.person.name = 'liuliu'
    data.numbers[0] = 5
    const toRefsData = toRefs(data)
    const { x, y } = useMousePosition()
    const { result, loading, loaded } = useURLLoader<DogData>('https://dog.ceo/api/breeds/image/random')
    watch(result, () => {
      if (result.value) {
        console.log(result.value.message)
      }
    })
    /*
      open modal
    */
    const modalIsOpen = ref(false)
    const onModalOpen = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    return {
      ...toRefsData,
      gretting,
      greet,
      x,
      y,
      result,
      loading,
      loaded,
      onModalOpen,
      onModalClose,
      modalIsOpen,
      asyncShow
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
