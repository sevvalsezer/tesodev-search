<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {}
</script>


<style>
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

.vue-ads-leading-loose {
  display: none!important;
}

.vue-ads-flex-grow {
  justify-content: center!important;
}

.vue-ads-bg-teal-500 {
  background-color: #204080!important;
}
</style>
