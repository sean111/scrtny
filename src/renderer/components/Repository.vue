<template>
  <section class="section">
    <!--<ul>-->
      <!--<li v-for="deployment in deployments">-->
        <!--<h5>-->
          <!--<i v-if="deployment.state === 'success'" class="text-success">S</i>-->
          <!--<i class="text-danger" v-else>E</i>-->
          <!--{{ deployment.deployed_at | formatDate }} by {{ deployment.author_name }}-->
        <!--</h5>-->
        <!--<p>-->
          <!--{{ deployment.comment }}-->
        <!--</p>-->
      <!--</li>-->
    <!--</ul>-->
    <b-card v-for="deployment in deployments" :key="deployment.id" header-text-variant="white" :header="header(deployment)" :header-bg-variant="cardClass(deployment)" :border-variant="cardClass(deployment)" style="margin-top: 10px">
      <p class="card-text">{{ deployment.comment }}</p>
    </b-card>
  </section>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        deployments: null,
        lastUpdated: null
      }
    },
    watch: {
      'id': function (event) {
        this.data = null
        this.$Progress.start()
        this.$electron.ipcRenderer.send('get-deployments', {'repository_id': this.id})
        // this.$electron.ipcRenderer.on('get-deployments-response', (event, data) => {
        //   this.deployments = data.entries
        //   this.$Progress.start()
        // })
      }
    },
    mounted () {
      // this.$Progress.start()
      this.$electron.ipcRenderer.send('get-deployments', {'repository_id': this.id})
    },
    created () {
      this.$electron.ipcRenderer.on('progress-start', () => {
        this.$Progress.start()
      })
      this.$electron.ipcRenderer.on('get-deployments-response', (event, data) => {
        this.deployments = data.entries
        let deployedAt = this.$moment(data.entries[0].deployed_at).valueOf()
        console.log({'lastUpdated': this.lastUpdated, 'deployedAt': deployedAt})
        if (deployedAt !== this.lastUpdated) {
          if (deployedAt && this.lastUpdated !== null) {
            void new Notification('New Deployment', {body: 'A new deployment was found'})
          }
          this.lastUpdated = deployedAt
        }
      })
    },
    methods: {
      header: function (deployment) {
        let date = this.$options.filters.formatDate(deployment.deployed_at)
        return `${date} by ${deployment.author_name}`
      },
      cardClass: function (deployment) {
        if (deployment.state === 'success') {
          return 'success'
        } else {
          return 'danger'
        }
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.lastUpdated = null
      this.$electron.ipcRenderer.send('clear-timeout')
      next()
    },
    beforeRouteLeave (to, from, next) {
      this.lastUpdated = null
      this.$electron.ipcRenderer.send('clear-timeout')
      next()
    }
  }
</script>
