<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand href="#">DeployBot</b-navbar-brand>
    <b-navbar-nav>
      <router-link class="nav-item" to="/">Repositories</router-link>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <router-link class="nav-item" to="config">Config</router-link>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>
