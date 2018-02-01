<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand href="#">Scrtny</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item-dropdown text="Repositories">
        <router-link v-for="repository in repositories" class="dropdown-item" :to="{ name: 'repository', params: {id: repository.id}}" :key="repository.id">{{ repository.title }}</router-link>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <router-link class="nav-item" to="/config">Config</router-link>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        repositories: [],
        selected: null
      }
    },
    mounted () {
      this.getRepositories()
    },
    methods: {
      getRepositories: function (event) {
        this.$electron.ipcRenderer.send('get-repositories')
        this.$electron.ipcRenderer.on('get-repositories-response', (event, data) => {
          this.repositories = data.entries
        })
      }
    },
    watch: {
      'selected': function () {
        this.$router.push({name: 'repository', params: {id: this.selected}})
      }
    }
  }
</script>
