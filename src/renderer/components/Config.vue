<template>
  <section class="section">
    <b-form @submit="saveConfig">
      <b-form-group label="API Token">
        <b-form-input id="api_token" type="text" v-model="token" required></b-form-input>
      </b-form-group>
      <b-form-group label="Account Domain">
        <b-form-input id="account_domain" type="text" v-model="domain" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </section>
</template>

<script>
  export default {
    name: 'config',
    data () {
      return {
        token: null,
        domain: null
      }
    },
    methods: {
      saveConfig: function (event) {
        this.$electron.ipcRenderer.send('set-config', {'token': this.token, 'domain': this.domain})
        this.$router.push('/')
      }
    },
    mounted () {
      this.$electron.ipcRenderer.send('get-config')
      this.$electron.ipcRenderer.on('get-config-response', (event, data) => {
        this.token = data.token
        this.domain = data.domain
      })
    }
  }
</script>
