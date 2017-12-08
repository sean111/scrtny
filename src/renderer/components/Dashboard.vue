<template>
    <section class="section">
      Test
    </section>
</template>

<script>
    export default {
      name: 'dashboard',
      data: {
        repositories: null
      },
      mounted () {
        this.$electron.ipcRenderer.send('getrepositories')
        this.$electron.ipcRenderer.on('getrepositories-response', (event, data) => {
          console.log(data)
        })
      }
    }
</script>
