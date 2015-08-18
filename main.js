require.config({
    paths: {
　　    "jquery": "vendor/jquery/dist/jquery.min",
　　    "avalon": "vendor/avalon/dist/avalon.shim",
  　　  "oniui": "vendor/oniui_bak/oniui.min",
        "domReady": "vendor/domReady/domReady",
        "text": "vendor/requirejs-text/text",
        "css": "vendor/require-css/css.min",
        "mmPromise": "vendor/avalon.oniui/mmPromise/mmPromise",
        "mmHistory": "vendor/avalon.oniui/mmRouter/mmHistory",
        "mmRouter": "vendor/avalon.oniui/mmRouter/mmRouter",
        "mmState": "vendor/avalon.oniui/mmRouter/mmState",
        "zTree": "vendor/zTree/js/jquery.ztree.all-3.5.min"
　　},
    shim: {
        jquery: {
            exports: "jQuery"
        },
        "zTree": ["jquery"],
        avalon: {
            exports: "avalon"
        }
    }
});

require([
    'avalon'
    ], function(avalon) {

    require([
        "app/router",
        "oniui"
    ], function(router) {
        avalon.ready(function() {
            avalon.define({
                $id: "root",
                title: "SPA测试页面"
            });

            router.start();
        });
    });
    
});