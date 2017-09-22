<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  *
    margin: 0
    padding: 0
  #app
    position: absolute
    top: 0
    bottom: 0
    margin: auto
    width: 100%
</style>
