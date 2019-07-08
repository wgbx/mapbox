<template>
  <div>
    {{$store.state.home.show}}
  </div>
</template>

<script>
  export default {
    name: "Home",
    created() {
      this.updata();
    },
    methods: {
      updata() {
        let self = this;
        setTimeout(function () {
          self.$store.commit('switch');
          self.$store.getters.reverse;
        }, 2000)
      }
    }
  }
</script>

<style scoped>

</style>
