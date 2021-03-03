define([], function () { // jshint ignore:line

    return [
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