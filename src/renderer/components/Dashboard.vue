<template>
    <section class="section">
      <b-card v-for="repository in repositories" :title="repository.name" :key="repository.id" class="mb-2">
        <p class="card-text">
          Created On: {{ repository.created_at | formatDate }}<br />
          Last Updated: {{ repository.updated_at | formatDate }}
        </p>
      </b-card>
    </section>
</template>

<script>
    export default {
      name: 'dashboard',
      data () {
        return {
          repositories: null
        }
      },
      mounted () {
        this.$electron.ipcRenderer.send('get-repositories')
        this.$electron.ipcRenderer.on('get-repositories-response', (event, data) => {
          console.log(data.entries)
          this.repositories = data.entries
        })
      }
    }
</script>
