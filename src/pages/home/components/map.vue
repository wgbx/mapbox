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
      this.setMapLanguage();
      this.threeDMap();
      this.tripsLayer();
    },
    methods: {
      initMap() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2dieCIsImEiOiJjanlzYmZ0cmcwYXI0M3BzNXNtZHJncGF2In0.J4xGHXLaGljxa6DwR2BctQ';
        this.map = new mapboxgl.Map({
          container: this.$refs.map,
          style: 'mapbox://styles/mapbox/streets-v10',
          center: [116.59108409724627, 40.08441341752007],
          zoom: 11.5,
          trackResize: true,
        });
      },
      setMapLanguage() {
        let language = new MapboxLanguage();
        this.map.addControl(language);
      },
      threeDMap() {
        let _this = this;
        _this.map.on('load', function () {
          let layers = _this.map.getStyle().layers;
          let labelLayerId;
          for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
              labelLayerId = layers[i].id;
              break;
            }
          }
          _this.map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
              ],
              'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
              ],
              'fill-extrusion-opacity': .6
            }
          }, labelLayerId);
        });
      },
      tripsLayer() {

      }
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
