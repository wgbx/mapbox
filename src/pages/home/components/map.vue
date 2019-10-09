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
          center: [-122.39082124283146, 37.686625269494385],
          zoom: 10.711743240066886,
          pitch: 0,
          bearing: -8.800000000000068,
        });
      },
      addLayer() {
        this.layer = new MapboxLayer({
          id: 'trip',
          type: TripsLayer,
          data: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/sf.trips.json',
          getPath: d => d.waypoints.map(p => p.coordinates),
          getTimestamps: d => d.waypoints.map(p => p.timestamp - 1554772579000),
          getColor: [253, 128, 93],
          opacity: 0.8,
          widthMinPixels: 5,
          rounded: true,
          trailLength: 200,
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
