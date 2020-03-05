<template>
  <div id="map">

  </div>
</template>

<script>
    import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

    export default {
        name: "HomeMap",
        data() {
            return {}
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
                    center: [116.585115, 40.07452],
                    zoom: 12.44,
                    pitch: 52.99,
                    bearing: -74.40,
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
