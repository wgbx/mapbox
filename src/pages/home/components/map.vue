<template>
  <div id="map">

  </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

  export default {
    name: "HomeMap",
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
        mapboxgl.accessToken = 'pk.eyJ1IjoiZXZvbGxlcnMiLCJhIjoiY2p5dGV3M2RwMDNlcDNub2E4a2tsejBzcSJ9.qzdwDmfnX-gH68U77Sxzlg';
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/evollers/cjzhx2vaf35ix1cp9d7inydoc',
          center: [116.61162143510774, 40.07244927345491],
          zoom: 13.35,
          pitch: 52.99999999999999,
          bearing: -74.40000000000026,
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 100%;
    position: absolute;

  }
</style>
