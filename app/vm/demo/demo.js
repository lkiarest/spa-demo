define([
    'jquery',
    "css!./demo.css",
    // "smartgrid/avalon.smartgrid",
    "dialog/avalon.dialog",
    "zTree"
    ], function($) {

    var perPage = 10;
    var listdata = [];
    var vmlist = null;
    var ztree = null;

    var zTreeClick = function(event, treeId, treeNode) {
        alert(treeNode.tId + ", " + treeNode.name);
    };

    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: zTreeClick
        }
    };

    var zNodes =[
        { id:1, pId:0, name:"父节点1 - 展开", open:true},
        { id:11, pId:1, name:"父节点11 - 折叠"},
        { id:111, pId:11, name:"叶子节点111"},
        { id:112, pId:11, name:"叶子节点112"},
        { id:113, pId:11, name:"叶子节点113"},
        { id:114, pId:11, name:"叶子节点114"},
        { id:12, pId:1, name:"父节点12 - 折叠"},
        { id:121, pId:12, name:"叶子节点121"},
        { id:122, pId:12, name:"叶子节点122"},
        { id:123, pId:12, name:"叶子节点123"},
        { id:124, pId:12, name:"叶子节点124"},
        { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
        { id:2, pId:0, name:"父节点2 - 折叠"},
        { id:21, pId:2, name:"父节点21 - 展开", open:true},
        { id:211, pId:21, name:"叶子节点211"},
        { id:212, pId:21, name:"叶子节点212"},
        { id:213, pId:21, name:"叶子节点213"},
        { id:214, pId:21, name:"叶子节点214"},
        { id:22, pId:2, name:"父节点22 - 折叠"},
        { id:221, pId:22, name:"叶子节点221"},
        { id:222, pId:22, name:"叶子节点222"},
        { id:223, pId:22, name:"叶子节点223"},
        { id:224, pId:22, name:"叶子节点224"},
        { id:23, pId:2, name:"父节点23 - 折叠"},
        { id:231, pId:23, name:"叶子节点231"},
        { id:232, pId:23, name:"叶子节点232"},
        { id:233, pId:23, name:"叶子节点233"},
        { id:234, pId:23, name:"叶子节点234"},
        { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
    ];

    function getDatas() { //随机产生列表
        var data = [],
            number = Math.ceil(5 + Math.random() * 30);

        for (var i = 0; i < number; i++) {
            data.push({
                id: i,
                name: null,
                age: parseInt(10 + Math.random() * 20),
                // selected: i%3 ? false: true,
                salary: parseInt(Math.random() * 100),
                operate : i % 5 ? 0 : 1,
                busy : !i%3 && !i%5 ? 0 : 1
            });
        }

        return data;
    };

    var cols = [
        {
            key : "name", //列标识
            name : "姓名", //列名
            sortable : true, //是否可排序
            isLock : true, //是否锁死列让其始终显示
            align: "center", //列的对象方式
            defaultValue: "shirly", //列的默认值
            customClass: "ddd", //自定义此列单元格类
            toggle: false, //控制列的显示隐藏
            width: "26%", //设置列的宽度
            type: "string"
        }, {
            key : "age",
            name : "年龄",
            sortable : true,
            align: "center", //列的对象方式
            width: "30%"
        }, {
            key : "salary",
            name : "薪水",
            type : "Number",
            sortable : true,
            align: "center",
            width: "30%"
        }, {
            key: "operate",
            name: "操作",
            title: "操作",
            align: "center",
            width: "10%",
            format: "optDel"
        }
    ];

    var htmlHelper = {
        optDel: function(vmId, field, index, cellValue, rowData) {
            return '<div class="btn btn-default">删除</div>';
        }
    };

    var updateList = function() {
        var data = getDatas();
        listdata = filter(data);

        showPageData();
    };

    var showPageData = function() {
        var sg1 = vmlist;
        var pager = sg1.pager;

        if (! pager) {
            pager = {
                currentPage: 1
            };
        }

        if (! sg1) {
            console.log("sg1 does not exist !");
            return;
        }

        pager.totalItems = listdata.length;

        var start = (pager.currentPage - 1) * perPage;
        var end = start + perPage;

        var data = listdata.slice(start, end);
        sg1.render(data);
    };

    var save = function() {
        // save to server first
        // ...

        // update list
        var info = vm.detailInfo;
        var list = vmlist.data;
        for (var i = 0, len = list.length; i < len; i ++) {
            var item = list[i];
            if (info.id ===  item.id) {
                list[i] = info;
                vmlist.render(list);
                return;
            }
        }
    };

    var newId = 1000;

    var add = function() {
        var addInfo = vm.addInfo;
        addInfo.id = newId ++;
        listdata.push(addInfo);
        showPageData();
    };

    var deleteById = function(id) {
        for (var i = 0, len = listdata.length; i < len; i++) {
            if (listdata[i].id === id) {
                listdata.splice(i, 1);
                return;
            }
        }
    };

    var del = function() {
        var list = vmlist.getSelected();
        if (list.length === 0) {
            console.log("no record selected !");
            return;
        }

        for (var i = 0, len = list.length; i < len; i++) {
            deleteById(list[i].id);
        }

        showPageData();
    };

    var hasParam = function(param, name) {
        return param[name] != undefined && param[name] != "";
    };

    var filter = function(data) {
        var params = vm.searchParams;
        var ret = [];
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            if (hasParam(params, "name")) {
                if (item.name != params.name) {
                    continue;
                }
            }
            if (hasParam(params, "age")) {
                if (item.age != params.age) {
                    continue;
                }
            }
            if (hasParam(params, "salary")) {
                if (item.salary != params.salary) {
                    continue;
                }
            }
            ret.push(item);
        }

        return ret;
    };

    var _addDlg = null;
    var _delDlg = null;

    var vm = avalon.define({
        $id: "demo",
        detailInfo: {},
        searchParams: {
            name: "",
            age: null,
            salary: ""
        },
        search:updateList,
        save: save,
        addInfo: {
            name: "",
            age: "",
            salary: ""
        },
        showAdd: function() {
            _addDlg.toggle = true;
        },
        $addDlgOpts: {
            onConfirm: function() {
                add();
            },
            onInit: function(vm) {
                _addDlg = vm;
            }
        },
        del: function() {
            _delDlg.toggle = true;
        },
        $delDlgOpts: {
            onConfirm: function(){
                del();
            },
            onInit: function(vm) {
                _delDlg = vm;
            }
        },
        $opts: {
            columns: cols,
            data: [],
            htmlHelper: htmlHelper,
            selectable: {
                type: "Checkbox"
            },
            onInit: function(vm) {
                vmlist = vm;
            },
            onRowSelect: function(rowData, isSelected, dataIndex) {
                isSelected && (vm.detailInfo = rowData);
            },
            pager: {
                perPages: 10,
                onInit: function(pagerVM, options, vmodels) {
                    updateList();
                },
                onJump: function(e, page) {
                    showPageData();
                }
            }
        },
        refresh: function() {
            vm.searchParams = {
                name: "",
                age: "",
                salary: ""
            };
            updateList();
        }
    });

    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function() {
            ztree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        };
        // 进入视图
        $ctrl.$onEnter = function() {
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {}
        // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
        $ctrl.$vmodels = [];
    });

});