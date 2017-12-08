<template>
  <section class="section">
    <b-form @submit="saveConfig">
      <b-form-group label="API Token">
        <b-form-input id="api_token" type="text" v-model="token" required></b-form-input>
      </b-form-group>
    </b-form>
  </section>
</template>

<script>
  export default {
    name: 'config',
    data: {
      token: null,
      domain: null
    },
    mounted () {

    }
  }
</script>
