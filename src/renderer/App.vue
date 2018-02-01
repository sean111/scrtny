<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  export default {
    name: 'Scrtny',
    components: {
      Navbar
    }
  }
</script>

<style>
  /* CSS */
</style>
