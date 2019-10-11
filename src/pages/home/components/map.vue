<template>
  <div id="map">

  </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
  import {MapboxLayer} from '@deck.gl/mapbox';
  import {TripsLayer} from '@deck.gl/geo-layers';

  export default {
    name: "HomeMap",
    data() {
      return {
        map: {},
        time: 0,
        _animationFrame: {},
        layer: {},
      }
    },
    mounted() {
      this.initMap();
      this.addLayer();
    },
    destroyed() {
      window.cancelAnimationFrame(this.animate);
    },
    methods: {
      initMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZXZvbGxlcnMiLCJhIjoiY2p5dGV3M2RwMDNlcDNub2E4a2tsejBzcSJ9.qzdwDmfnX-gH68U77Sxzlg';
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/evollers/cjzhx2vaf35ix1cp9d7inydoc',
          center: [-74, 40.72],
          zoom: 13,
          pitch: 45,
          bearing: 0
        });
      },
      addLayer() {
        this.layer = new MapboxLayer({
          id: 'trip',
          type: TripsLayer,
          data: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips-v7.json',
          getPath: d => d.path,
          getTimestamps: d => d.timestamps,
          getColor: d => (d.vendor === 0 ? [253, 128, 93]: [23, 184, 190]),
          opacity: 0.3,
          widthMinPixels: 3,
          rounded: true,
          trailLength: 180,
          currentTime: this.time,
        });
        this.map.on('load', () => {
          this.map.addLayer(this.layer, 'country-label');
        });
        this.animate()
      },
      animate() {
        const loopLength = 1800;
        const animationSpeed = 30;
        const timestamp = Date.now() / 1000;
        const loopTime = loopLength / animationSpeed;
        this.time = ((timestamp % loopTime) / loopTime) * loopLength;
        console.log(this.time);
        window.requestAnimationFrame(this.animate);
        this.layer.setProps({
          currentTime: this.time,
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
