<template>
    <section class="section">
      Test
    </section>
</template>

<script>
    export default {
      name: 'dashboard',
      mounted () {
        console.log('Hello World!')
        this.$electron.ipcRenderer.send('getrepositories')
        this.$electron.ipcRenderer.on('getrepositories-response', (event, data) => {
          console.log(data)
        })
      }
    }
</script>
