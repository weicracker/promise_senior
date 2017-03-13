/*
 * @Author: jiwei
 * @Date: 2017-03-13 14:50:01
 * @Last Modified by: jiwei
 * @Last Modified time: 2017-03-13 14:52:17
 */
var key;
var rejectActions = {};
var resolveActions = {};
var parasmData = null;
var fs = nodeRequire("fs");
var readyDirPlace = "E:\\stations\\ibp\\dist\\portal\\microapp";
//
// ─── APP ────────────────────────────────────────────────────────────────────────
//
var App = function (viewObject) {
    try {
        if (key.search("search") > -1) {
            if (viewObject.onSearch) {
                var searchData = viewObject.onSearch(parasmData);
                resolveActions[key](searchData);
            } else {
                resolveActions[key](false);
            }
        } else {
            if (viewObject.onViewObject) {
                var onViewObjectData = viewObject.onViewObject(parasmData);
                resolveActions[key](onViewObjectData);
            } else {
                resolveActions[key](false);
            }
        }
    } catch (err) {
        rejectActions[key](false);
    }
}
//
// ─── GETSEARCHAPP ───────────────────────────────────────────────────────────────
//
function getSearchApp(type, parasm) {
    parasmData = parasm;
    var result = [];
    var dirContent = fs.readdirSync(readyDirPlace);
    for (var i = 0; i < dirContent.length; i++) {
        if (type === "search") {
            key = "search" + nodeRequire('uuid/v1')();
        } else {
            key = nodeRequire('uuid/v1')();
        }
        // if (dirContent[i] != "test.asar") {
            var a = new Promise(function (res, rej) {
                resolveActions[key] = res;
                rejectActions[key] = rej;
                nodeRequire(readyDirPlace + dirContent[i] + "\\app.js");
            });
            result.push(a);
        // }
    }
    return Promise.all(result);
}
//
// ─── TEST ───────────────────────────────────────────────────────────────────────
//
getSearchApp("search", '11111').then(function (res) {
    console.log(res)
})