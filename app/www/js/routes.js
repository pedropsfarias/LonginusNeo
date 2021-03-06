define([], function () { // jshint ignore:line

    return [
        {
            component: 'login-page/login-page',
            path: '/login'
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