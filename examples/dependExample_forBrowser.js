require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var makerjs = require('./../target/js/node.maker.js');

function M(height, columnSpace, columnWidth, dropHigh, dropLow, dropConnect, innerSerifWidth, serifWidth, serifHeight) {

    var columnRef = serifWidth + columnWidth;
    var halfColumnSpace = columnSpace / 2;
    var center = columnRef + halfColumnSpace;
    var serifH = Math.min(height / 2, serifHeight);

    var points = [];

    points.push([center, height * dropHigh]);
    points.push([columnRef, height]);
    points.push([0, height]);
    points.push([0, height - serifH]);
    points.push([serifWidth, height - serifH]);
    points.push([serifWidth, serifH]);
    points.push([0, serifH]);
    points.push([0, 0]);
    points.push([columnRef + halfColumnSpace * innerSerifWidth, 0]);
    points.push([columnRef + halfColumnSpace * innerSerifWidth, serifH]);
    points.push([columnRef, serifH]);
    points.push([columnRef, serifH + (height - serifH) * dropConnect]);
    points.push([center, height * dropLow]);

    var halfModel = new makerjs.models.ConnectTheDots(false, points);
    var otherHalf = makerjs.model.move(makerjs.model.mirror(halfModel, true, false), [center * 2, 0])

    this.units = makerjs.unitType.Inch;
    this.models = [halfModel, otherHalf];
}

M.metaParameters = [
    { title: "height", type: "range", min: .2, max: 6, step: .1, value: 1.5 },
    { title: "columnSpace", type: "range", min: .01, max: 4, step: .1, value: .7 },
    { title: "columnWidth", type: "range", min: .01, max: 2, step: .01, value: 0.46 },
    { title: "dropHigh", type: "range", min: 0, max: 1, step: .01, value: 0.65 },
    { title: "dropLow", type: "range", min: 0, max: 1, step: .01, value: 0.3 },
    { title: "dropConnect", type: "range", min: 0, max: 1, step: .01, value: 0.65 },
    { title: "innerSerifWidth", type: "range", min: 0, max: 1, step: .01, value: .5 },
    { title: "serifWidth", type: "range", min: 0, max: 1, step: .01, value: 0.2 },
    { title: "serifHeight", type: "range", min: 0, max: 2, step: .01, value: 0.2 },
];

module.exports = M;

},{"../target/js/node.maker.js":undefined}],2:[function(require,module,exports){
var makerjs = require('./../target/js/node.maker.js');

function smile(span, teeth, droop, dainty, gaze, heady) {

    this.origin = [3, 3];

    this.paths = {
        head: new makerjs.paths.Circle([0, 0], 2.7),
        rightEye: new makerjs.paths.Circle([1, heady], gaze),
        leftEye: new makerjs.paths.Circle([-1, heady], gaze)
    };

    var mouth = new makerjs.models.OvalArc(270 - span, 270 + span, dainty, teeth);
    
    mouth.origin = [0, droop];

    this.models = {
        mouth: mouth
    };
}

smile.metaParameters = [
    { title: "smile span", type: "range", min: 0, max: 90, value: 45 },
    { title: "toothiness", type: "range", min: 0, max: 1, step: 0.05, value: .3 },
    { title: "droopiness", type: "range", min: -1, max: 2, step: 0.1, value: .8 },
    { title: "daintyness", type: "range", min: 0.2, max: 3, step: .1, value: 2 },
    { title: "gazyness", type: "range", min: 0.05, max: 1, step: .05, value: .4 },
    { title: "headyness", type: "range", min: 0.05, max: 2, step: .05, value: .8 }
];

module.exports = smile;

//from the root:
//browserify -r ./examples/smile.js:smile > ./debug/browser.smile.js
},{"../target/js/node.maker.js":undefined}],"dependExample":[function(require,module,exports){
var makerjs = require('./../target/js/node.maker.js');
var smile = require('./smile.js');
var m = require('./m.js');

function dependExample() {

    var m1 = makerjs.model.scale(new m(1.5, 0.7, .46, .65, .3, .65, .5, .2, .2), 3);

    var smile1 = new smile(45, .3, .8, 2, .4, .8);
    smile1.origin = [3, 7.5];

    this.models = {
        m1: m1,
        smile1: smile1
    };

    this.units = makerjs.unitType.Inch;
}

module.exports = dependExample;

console.log('dependExample is running!');
console.log(makerjs.exporter.toSVG(new dependExample()));

/*to make this run from node, use this command line (from the root of your git):
node ./examples/dependExample_forNode.js
*/

/*to make this run in the browser, use this command line (from the root of your git):
browserify -r ./examples/dependExample_forNode.js:dependExample --exclude ../target/js/node.maker.js > ./examples/dependExample_forBrowser.js
*/
},{"../target/js/node.maker.js":undefined,"./m.js":1,"./smile.js":2}]},{},[]);
