/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tests/coverage/webpack.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./tests/coverage/webpack.ts":
/*!***********************************!*\
  !*** ./tests/coverage/webpack.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* istanbul ignore next */
var cov_1ni36m0j7w = function () {
  var path = "/home/nightcrawler/github/tdd-buffet/packages/tdd-buffet/tests/coverage/webpack.ts";
  var hash = "f76a225473a98ad05c2acc323895853efb8cd3cb";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/nightcrawler/github/tdd-buffet/packages/tdd-buffet/tests/coverage/webpack.ts",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 12
        },
        end: {
          line: 3,
          column: 13
        }
      },
      "1": {
        start: {
          line: 4,
          column: 4
        },
        end: {
          line: 4,
          column: 14
        }
      },
      "2": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 13
        }
      },
      "3": {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 7,
          column: 11
        }
      }
    },
    fnMap: {
      "0": {
        name: "doTheFoo",
        decl: {
          start: {
            line: 2,
            column: 9
          },
          end: {
            line: 2,
            column: 17
          }
        },
        loc: {
          start: {
            line: 2,
            column: 20
          },
          end: {
            line: 6,
            column: 1
          }
        },
        line: 2
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "f76a225473a98ad05c2acc323895853efb8cd3cb"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

function doTheFoo() {
  /* istanbul ignore next */
  cov_1ni36m0j7w.f[0]++;
  let x =
  /* istanbul ignore next */
  (cov_1ni36m0j7w.s[0]++, 0);

  /* istanbul ignore next */
  cov_1ni36m0j7w.s[1]++;
  x = x + 1;

  /* istanbul ignore next */
  cov_1ni36m0j7w.s[2]++;
  return x;
}

/* istanbul ignore next */
cov_1ni36m0j7w.s[3]++;
doTheFoo();

/***/ })

/******/ });
//# sourceMappingURL=webpack-bundle.js.map