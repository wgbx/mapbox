<template>
  <div class="map"
       ref="map">

  </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
  import MapboxLanguage from '@mapbox/mapbox-gl-language'

  export default {
    name: 'homeMap',
    data() {
      return {
        map: {},
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        let language = new MapboxLanguage();
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2dieCIsImEiOiJjanlzYmZ0cmcwYXI0M3BzNXNtZHJncGF2In0.J4xGHXLaGljxa6DwR2BctQ';
        this.map = new mapboxgl.Map({
          container: this.$refs.map,
          style: 'mapbox://styles/mapbox/streets-v10',
          center: [116.59108409724627, 40.08441341752007],
          zoom: 11.5,
          trackResize: true,
        });
        this.map.addControl(language);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .map {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
