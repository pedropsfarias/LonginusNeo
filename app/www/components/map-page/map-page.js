define([
    'text!map-page/map-page.html',
    'vue',
    'axios',
    'loader-component/loader-component',
    'menu-component/menu-component',
    'helper',
    'config',
    'sha256',
    'page',
    'app',
    'mapbox'
],
    function (
        template,
        Vue,
        axios,
        loaderComponent,
        menuComponent,
        helper,
        config,
        sha256,
        page,
        app,
        mapboxgl) { // jshint ignore:line

        return Vue.component('map-page', {
            components: {
                'loader-component': loaderComponent,
                'menu-component': menuComponent
            },
            data: function () {
                return {
                    showLoader: true,
                    loaderMessage: '',
                    markers: [],
                    fit: true
                };
            },
            mounted: function () {

                M.AutoInit();
                helper.setWindowTitle('Obter posição - Longinus')
                this.createMap();

            },

            methods: {

                createMap: function () {

                    mapboxgl.accessToken = config.mapboxToken;
                    this.map = new mapboxgl.Map({
                        container: 'map', // container id
                        style: 'mapbox://styles/mapbox/light-v10', // style URL
                        center: config.centerMap,
                        zoom: 3,// starting zoom,
                    });
                    this.createLayers();

                },

                createLayers: function () {

                    this.map.on('load', () => {

                        this.showLoader = false;

                        this.map.addSource('point', {
                            'type': 'geojson',
                            'data': {
                                'type': 'Point',
                                'coordinates': [-999, -999]
                            }
                        });

                        this.map.addLayer({
                            'id': 'poi-labels',
                            'type': 'symbol',
                            'source': 'point',
                            'layout': {
                                'text-field': ['get', 'description'],
                                'text-variable-anchor': ['left', 'right'],
                                'text-radial-offset': 1.5,
                                'text-justify': 'auto',
                            }
                        });

                        this.handlePosition();

                    });

                },

                handlePosition() {

                    this.getPositions();
                    app.intervalId = setInterval(this.getPositions, config.interval);

                },

                getPositions() {


                    const options = {
                        url: config.serverUrl + '/position',
                        method: 'GET',
                        withCredentials: false,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8',
                            token: app.token,
                        }
                    };

                    axios(options)
                        .then(response => {
                            if (response.status == 200) {

                                this.createMarkers(response.data);
                                this.fitBBox(response.data);
                                let gjson = this.createGeoJson(response.data);
                                this.map.getSource('point').setData(gjson);

                            }
                        })

                },

                createMarkers(list) {

                    this.markers.forEach(e => e.remove());
                    this.markers = [];

                    list.forEach(e => {

                        const element = document.createElement('div');
                        element.innerHTML = `<i class="material-icons map-icon" >${e.device.deviceType}</i>`;

                        const marker = new mapboxgl.Marker({ element })
                            .setLngLat([e.longitude, e.latitude]);
                        this.markers.push(marker);

                    });

                    this.markers.forEach(e => e.addTo(this.map));

                },

                createGeoJson(list) {

                    let features = [];
                    let type = "FeatureCollection";

                    list.forEach(e => {

                        let feature = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [e.longitude, e.latitude]
                            },
                            "properties": { ...e, ...e.device }
                        }

                        features.push(feature);

                    });

                    return { type, features }

                },

                fitBBox(list) {

                    if (this.fit) {

                        let padding = Number.parseInt(document.getElementById('map').clientWidth / 4);

                        let bounds = new mapboxgl.LngLatBounds();
                        list.forEach(e => {
                            bounds.extend([e.longitude, e.latitude]);
                        });
                        this.map.fitBounds(bounds, {
                            padding
                        });

                    }

                },


            },
            template: template
        })

    });