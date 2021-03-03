<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
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
