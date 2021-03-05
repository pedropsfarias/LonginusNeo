define([
    'text!position-page/position-page.html',
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

        return Vue.component('position-page', {
            components: {
                'loader-component': loaderComponent,
                'menu-component': menuComponent
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
                    showMap: true,
                    mapIcon: 'visibility',
                    postionText: 'Iniciar rastreamento',
                    postionIcon: 'play_arrow'


                };
            },
            mounted: function () {

                M.AutoInit();
                helper.setWindowTitle('Obter posição - Longinus')
                this.createMap();

            },

            methods: {

                createMap: function () {

                    if (this.showMap) {

                        mapboxgl.accessToken = config.mapboxToken;
                        this.map = new mapboxgl.Map({
                            container: 'map', // container id
                            style: 'mapbox://styles/mapbox/light-v10', // style URL
                            center: config.centerMap,
                            zoom: 1 // starting zoom
                        });
                        this.createLayers();

                    }

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
                            'id': 'point',
                            'source': 'point',
                            'type': 'circle',
                            'paint': {
                                'circle-radius': 10,
                                'circle-color': '#007cbf'
                            }
                        });

                    });


                },

                setInicialValues: function () {

                    this.latitude = '-';
                    this.longitude = '-';
                    this.altitude = '-';
                    this.accuracy = '-';
                    this.heading = '-';
                    this.speed = '-';
                    this.timestamp = '-';
                    this.postionText = 'Iniciar rastreamento';
                    this.postionIcon = 'play_arrow';

                    if (this.map) {

                        this.map.getSource('point').setData({
                            'type': 'Point',
                            'coordinates': [-999, -999]
                        });

                    }

                },

                handlePos: function () {

                    if (app.watchID) {
                        this.stopPos();
                    } else {
                        this.startPos();
                    }


                },

                startPos: function () {

                    this.postionIcon = 'hourglass_empty';
                    this.postionText = 'Iniciando...';

                    app.initPositionWatch(position => {

                        this.persistPosition(position);
                        const p = this.formatData(position);

                        this.latitude = p.latitude;
                        this.longitude = p.longitude;
                        this.altitude = p.altitude;
                        this.accuracy = p.accuracy;
                        this.heading = p.heading;
                        this.speed = p.speed;
                        this.timestamp = p.timestamp;

                        if (this.showMap) {

                            this.map.getSource('point').setData({
                                'type': 'Point',
                                'coordinates': [position.coords.longitude, position.coords.latitude]
                            });

                            this.map.setCenter([position.coords.longitude, position.coords.latitude])

                        }

                        this.postionIcon = 'stop';
                        this.postionText = 'Parar rastreamento';

                    }, e => {

                        // this.stopPos();
                        console.log(e);

                    })


                },

                stopPos: function () {

                    this.setInicialValues();
                    app.stopPositionWatch();

                },

                formatData: function (position) {

                    let p = {};

                    p.latitude = position.coords.latitude ?
                        position.coords.latitude.toFixed(8).toLocaleString() + '°' : '-';

                    p.longitude = position.coords.longitude ?
                        position.coords.longitude.toFixed(8).toLocaleString() + '°' : '-';

                    p.altitude = position.coords.altitude ?
                        position.coords.altitude.toFixed(1).toLocaleString() + 'm' : '-';

                    p.accuracy = position.coords.accuracy ?
                        position.coords.accuracy.toFixed(1).toLocaleString() + 'm' : '-';

                    p.heading = position.coords.heading ?
                        position.coords.heading.toFixed(1).toLocaleString() + '°' : '-';

                    p.speed = position.coords.speed ?
                        position.coords.speed.toFixed(1).toLocaleString() + 'm/s' : '-';

                    let date = new Date(position.timestamp);

                    p.timestamp = position.timestamp ?
                        date.toLocaleDateString() + ' ' + date.toLocaleTimeString() : '-';;

                    return p;

                },

                persistPosition: function (position) {

                    let p = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        altitude: position.coords.altitude,
                        accuracy: position.coords.accuracy,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed,
                        timestamp: position.timestamp,
                        device_id: app.deviceId
                    }

                    const options = {
                        url: config.serverUrl + '/position',
                        method: 'POST',
                        withCredentials: false,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8',
                            token: app.token,
                        },
                        data: p
                    };

                    axios(options)
                        .then(response => {
                            if (response.status != 201) {
                                app.registerError({
                                    level: 0,
                                    message: 'Não foi possível registrar a posição do dispositivo.',
                                    raw: response
                                });
                            }
                        })
                        .catch(e => {
                            app.registerError({
                                level: 0,
                                message: 'Não foi possível conectar ao servidor. Sem conexão de internet.',
                                raw: e
                            });
                        });
                }

            },
            template: template
        })

    });