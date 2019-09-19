<template>
  <div id="map">

  </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
  import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
  import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

  export default {
    name: "HomeMap",
    data() {
      return {
        map: {},
      }
    },
    mounted() {
      this.initMap();
      this.addMapModel();
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
      },
      addMapModel() {
        let _this = this;
        let modelOrigin = [116.60562143510774, 40.07244927345491];
        let modelAltitude = 0;
        let modelRotate = [Math.PI / 2, Math.PI / 1.9, 0];
        let modelScale = 5.41843220338983e-8;
        let modelTransform = {
          translateX: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).x,
          translateY: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).y,
          translateZ: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).z,
          rotateX: modelRotate[0],
          rotateY: modelRotate[1],
          rotateZ: modelRotate[2],
          scale: modelScale
        };

        let customLayer = {
          id: '3d-model',
          type: 'custom',
          renderingMode: '3d',
          onAdd: function (map, gl) {
            let a = new Date().getTime() / 1000;
            _this.camera = new THREE.Camera();
            _this.scene = new THREE.Scene();
            let directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(0, -70, 100).normalize();
            _this.scene.add(directionalLight);
            let directionalLight2 = new THREE.DirectionalLight(0xffffff);
            directionalLight2.position.set(0, 70, 100).normalize();
            _this.scene.add(directionalLight2);

            let gltfLoader = new GLTFLoader();
            let dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('http://airport.99xf.cn/draco/');
            gltfLoader.setDRACOLoader(dracoLoader);
            gltfLoader.load('static/build/modelDraco.gltf', (gltf => {
              gltf.scene.scale.set(10, 10, 10);
              _this.scene.add(gltf.scene);
              console.log((new Date().getTime() / 1000) - a + " s")
            }));

            _this.renderer = new THREE.WebGLRenderer({
              canvas: _this.map.getCanvas(),
              context: gl,
              antialias: true
            });
            _this.renderer.autoClear = false;
          },
          render: function (gl, matrix) {
            let rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
            let rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
            let rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);
            let m = new THREE.Matrix4().fromArray(matrix);
            let l = new THREE.Matrix4().makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
              .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
              .multiply(rotationX)
              .multiply(rotationY)
              .multiply(rotationZ);
            _this.camera.projectionMatrix.elements = matrix;
            _this.camera.projectionMatrix = m.multiply(l);
            _this.renderer.state.reset();
            _this.renderer.render(_this.scene, _this.camera);
            _this.map.triggerRepaint();
          }
        };
        _this.map.on('style.load', function () {
          _this.map.addLayer(customLayer, 'country-label');
        });
      },
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
