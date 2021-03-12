define([], function () { // jshint ignore:line

    return [
        {
            component: 'position-page/position-page',
            path: '/position'
        },
        {
            component: 'list-device-page/list-device-page',
            path: '/devices'
        },
        {
            component: 'create-device-page/create-device-page',
            path: '/device'
        },
        {
            component: 'create-user-page/create-user-page',
            path: '/user'
        },
        {
            component: 'list-user-page/list-user-page',
            path: '/users'
        },
        {
            component: 'map-page/map-page',
            path: '/map'
        },
        {
            component: 'login-page/login-page',
            path: '/login'
        },
        {
            component: 'not-found-page/not-found-page',
            path: '*'
        }
    ]

});