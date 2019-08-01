<template>
  <div class="home">
    <home-map></home-map>
  </div>
</template>

<script>
  import HomeMap from "./components/map";

  export default {
    name: "Home",
    components: {HomeMap},
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .home {

  }
</style>
