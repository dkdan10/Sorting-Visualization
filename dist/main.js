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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vis_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vis_view */ \"./src/vis_view.js\");\n\n\n$(() => {\n    const visField = $('#sorting-vis');\n    new _vis_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](visField);\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/vis_view.js":
/*!*************************!*\
  !*** ./src/vis_view.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return VisView; });\n\nclass VisView {\n    constructor($visEl) {\n        this.$visEl = $visEl\n\n        this.renderQueue = []\n\n        this.config = {\n            arrayLength: 10,\n            sortMethod: 0\n        }\n        this.sortingArray = []\n        this.resetSortingArray()\n        this.mergeSort(\"first\", 0)\n\n        this.renderQueueInterval = setInterval(() => {\n            this.checkRenderQueue();\n        }, 1000);\n    }\n\n    mergeSort(arr, index) {\n        if (arr === \"first\") arr = this.sortingArray\n        if (arr.length <= 1) {\n            return arr;\n        }\n        // In order to divide the array in half, we need to figure out the middle\n        const middle = Math.floor(arr.length / 2);\n\n        // This is where we will be dividing the array into left and right\n        const left = arr.slice(0, middle);\n        const right = arr.slice(middle);\n\n        // Using recursion to combine the left and right\n        const sortedHalves = this.merge(\n            this.mergeSort(left, index), this.mergeSort(right, index + middle)\n        );\n        this.sortingArray = this.sortingArray.slice(0, index).concat(sortedHalves).concat(this.sortingArray.slice(index + sortedHalves.length))\n        this.pushToRenderQueue(this.sortingArray)\n        return sortedHalves\n    }\n\n    checkRenderQueue () {\n        if (this.renderQueue.length) {\n            this.render(this.renderQueue.shift())\n        }\n    }\n\n    pushToRenderQueue (arrToRender) {\n        this.renderQueue.push(arrToRender.slice())\n    }\n\n    merge(left, right) {\n        let resultArray = [], leftIndex = 0, rightIndex = 0;\n\n        // We will concatenate values into the resultArray in order\n        while (leftIndex < left.length && rightIndex < right.length) {\n            if (left[leftIndex] < right[rightIndex]) {\n                resultArray.push(left[leftIndex]);\n                leftIndex++; // move left array cursor\n            } else {\n                resultArray.push(right[rightIndex]);\n                rightIndex++; // move right array cursor\n            }\n        }\n        // We need to concat here because there will be one element remaining\n        // from either left OR the right\n        return resultArray\n            .concat(left.slice(leftIndex))\n            .concat(right.slice(rightIndex));\n    }\n\n    render (arr) {\n        this.$visEl.empty();\n        const arrayUl = $(\"<ul>\").addClass(\"visUl\")\n        for (let i = 0; i < arr.length; i++) {\n            const el = arr[i];\n            const nextLi = $(\"<li>\").append(`${el}`).addClass(\"visLi\").height(Math.floor(el / this.config.arrayLength * 10) + \"%\")\n            arrayUl.append(nextLi)\n        }\n        this.$visEl.append(arrayUl)\n    }\n\n    resetSortingArray () {\n        this.sortingArray = []\n        for (let i = 0; i < this.config.arrayLength; i++) {\n            const randomNumber = Math.floor(Math.random() * this.config.arrayLength * 10) + 1\n            this.sortingArray.push(randomNumber)\n        }\n        this.render(this.sortingArray)\n    }\n\n}\n\n\n//# sourceURL=webpack:///./src/vis_view.js?");

/***/ })

/******/ });