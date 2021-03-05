define([], function () { // jshint ignore:line

    return [
        {
            component: 'login-page/login-page',
            path: '/login'
        },
        {
            component: 'position-page/position-page',
            path: '/position'
        },
        {
            component: 'not-found-page/not-found-page',
            path: '*'
        }
    ]

});