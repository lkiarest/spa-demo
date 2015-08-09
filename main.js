require.config({
    paths: {
　　    "jquery": "vendor/jquery/jquery.min",
　　    "avalon": "vendor/avalon/dist/avalon.shim",
　　    "oniui": "vendor/oniui",
        "domReady": "vendor/domReady/domReady",
        "text": "vendor/requirejs-text/text",
        "css": "vendor/require-css/css.min",
        "mmRouter": "vendor/mmRouter/mmRouter",
        "mmState": "vendor/mmRouter/mmState",
        "mmPromise": "vendor/mmRouter/mmPromise",
        "mmHistory": "vendor/mmRouter/mmHistory"
　　},
    shim: {
        jquery: {
            exports: "jQuery"
        },
        avalon: {
            exports: "avalon"
        }
    }
});

require([
    "avalon",
    "app/router",
    ], function(avalon, router) {

    avalon.ready(function() {
        avalon.define({
            $id: "root",
            title: "SPA测试页面"
        });

        router.start();

        avalon.scan();
    });
});