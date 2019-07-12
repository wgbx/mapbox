<template>
  <div class="warp">
    {{$store.state.home.show}}
    <div class="item">123</div>
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

<style lang="scss" scoped>
  .warp {
    width: 1200px;

    .item {

    }
  }
</style>
