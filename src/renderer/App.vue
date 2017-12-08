<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './components/navbar'
  export default {
    name: 'dbot-client',
    components: {
      Navbar
    }
  }
</script>

<style>
  /* CSS */
</style>
