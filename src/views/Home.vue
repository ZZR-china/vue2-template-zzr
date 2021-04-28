<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld
      msg="Welcome to Your Vue.js App"
      :title="title"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { getInfo } from '@/api/user'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      title: '2'
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      await getInfo()
    }
  }
}
</script>
