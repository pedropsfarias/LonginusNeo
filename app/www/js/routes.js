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
            component: 'login-page/login-page',
            path: '/login'
        },
        {
            component: 'not-found-page/not-found-page',
            path: '*'
        }
    ]

});