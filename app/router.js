define(["avalon", "mmState"], function(avalon) {

    // 重写模板加载器，改为用text插件加载
    avalon.require = require;

    avalon.state.templateLoader = function(url, resolve, reject, reason) {
        avalon.require(["text!" + url], function(tpl) {
            resolve(avalon.templateCache[url] = tpl)
        })
    }

    avalon.state("home", {
        url: "/",
        views: {
            "": {
                template:"this is home page"
            }
        }
    }).state("demo", {
        url: "/demo",
        views: {
            "": {
                templateUrl: "app/vm/demo/demo.html",
                controllerUrl: "app/vm/demo/demo"
            }
        }
    });

    avalon.state.config({
        onError: function() {
            console.log(arguments)
        }, // 强烈打开错误配置
        onLoad: function() {
            //root.page = mmState.currentState.stateName.split(".")[1];
        },
        onViewEnter: function(newNode, oldNode) {
            avalon(oldNode).animate({
                marginLeft: "-100%"
            }, 500, "easein", function() {
                oldNode.parentNode && oldNode.parentNode.removeChild(oldNode)
            });
             
        } // 不建议使用动画，因此实际使用的时候，最好去掉onViewEnter和ms-view元素上的oni-mmRouter-slide

    });

    var start = function() {
        avalon.history.start({
            basepath: "/"
        });
    };

    return {
        start: start
    }
});