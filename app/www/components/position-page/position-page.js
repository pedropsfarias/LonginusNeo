define([
    'text!position-page/position-page.html',
    'vue',
    'axios',
    'loader-component/loader-component',
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
        helper,
        config,
        sha256,
        page,
        app,
        mapboxgl) { // jshint ignore:line

        return Vue.component('position-page', {
            components: {
                'loader-component': loaderComponent
            },
            data: function () {
                return {
                    showLoader: true,
                    loaderMessage: '',
                    latitude: '-',
                    longitude: '-',
                    altitude: '-',
                    accuracy: '-',
                    heading: '-',
                    speed: '-',
                    timestamp: '-',
                    map: null,
                    mapIsDone: false,
                };
            },
            mounted: function () {
                M.AutoInit();
                helper.setWindowTitle('Obter posição - Longinus')

                this.createMap();



                // this.map.on('load', () => {

                //     this.showLoader = false;

                //     this.map.addSource('point', {
                //         'type': 'geojson',
                //         'data': {
                //             "type": "Feature",
                //             "geometry": {
                //                 'type': 'Point',
                //                 'coordinates': [-49.25, -25.45]
                //             },
                //             'properties': {
                //                 'title': 'fence'
                //             }
                //         }
                //     });

                //     this.map.addLayer({
                //         'id': 'point',
                //         'source': 'point',
                //         'type': 'circle',
                //         'paint': {
                //             'circle-radius': 10,
                //             'circle-color': '#007cbf'
                //         }
                //     });



                //     this.mapIsDone = true;

                //     app.initPositionWatch(position => {
                //         this.latitude = position.coords.latitude
                //         this.longitude = position.coords.longitude

                //         if (this.mapIsDone) {

                //             this.map.getSource('point').setData({
                //                 'type': 'geojson',
                //                 'data': {
                //                     'type': 'Point',
                //                     'coordinates': [this.longitude, this.latitude]
                //                 }
                //             }


                //             );

                //         }
                //     }, e => {

                //         console.log(e);

                //     })


                // });


            },
            methods: {

                createMap: function () {

                    mapboxgl.accessToken = config.mapboxToken;
                    this.map = new mapboxgl.Map({
                        container: 'map', // container id
                        style: 'mapbox://styles/mapbox/light-v10', // style URL
                        center: config.centerMap,
                        zoom: 1 // starting zoom
                    });



                }

            },
            template: template
        })

    });