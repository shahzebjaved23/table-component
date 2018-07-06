module.exports =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(13)(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(30);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DisplayTable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplayTable = exports.DisplayTable = function (_Component) {
	_inherits(DisplayTable, _Component);

	function DisplayTable(props) {
		_classCallCheck(this, DisplayTable);

		var _this = _possibleConstructorReturn(this, (DisplayTable.__proto__ || Object.getPrototypeOf(DisplayTable)).call(this, props));

		_this.state = { tableData: props.tableData, sortOrder: 1, indexSorted: 0 };
		return _this;
	}

	_createClass(DisplayTable, [{
		key: "getTableHeaders",
		value: function getTableHeaders() {
			if (this.state.tableData.data.length > 0) {
				var objectKeys = Object.keys(this.state.tableData.data[0]);
				objectKeys.push("");objectKeys.push("");
				return objectKeys;
			} else {
				return [];
			}
		}
	}, {
		key: "listenPaginationEvent",
		value: function listenPaginationEvent() {
			var _this2 = this;

			this.props.eventEmitter.on("paginationEvent", function (paginatedArray) {
				if (paginatedArray.data.length > 0) _this2.setState({ tableData: paginatedArray }, function () {
					return _this2.applySortStyle(_this2.state.indexSorted);
				});
			});
		}
	}, {
		key: "listenSearchEvent",
		value: function listenSearchEvent() {
			var _this3 = this;

			this.props.eventEmitter.on("searchEvent", function (searchedArray) {
				_this3.setState({ tableData: searchedArray }, function () {
					return _this3.applySortStyle(_this3.state.indexSorted);
				});
			});
		}
	}, {
		key: "sortByHeader",
		value: function sortByHeader(key, index) {
			this.toggleSortOrder();
			var sortedArray = this.state.tableData.data.sort(this.dynamicSort(key, this.state.sortOrder));
			this.setSortStyles(index);
			this.setState({ tableData: { data: sortedArray }, indexSorted: index });
		}
	}, {
		key: "setSortStyles",
		value: function setSortStyles(index) {
			this.removePrevSortStyle(this.state.indexSorted);
			this.applySortStyle(index);
		}
	}, {
		key: "applySortStyle",
		value: function applySortStyle(index) {
			if (this.refs.displayTableBody && this.refs.displayTableHead) {
				var bodyRows = this.refs.displayTableBody.childNodes;
				for (var i = 0; i < bodyRows.length; i++) {
					bodyRows[i].childNodes[index].style.color = "#71aedb";
				}

				var headerRows = this.refs.displayTableHead.childNodes;
				for (var _i = 0; _i < headerRows.length; _i++) {
					if (this.state.sortOrder === 1) {
						headerRows[_i].childNodes[index].getElementsByTagName("i")[0].style.display = "block";
						headerRows[_i].childNodes[index].getElementsByTagName("i")[1].style.display = "none";
					} else if (this.state.sortOrder === -1) {
						headerRows[_i].childNodes[index].getElementsByTagName("i")[1].style.display = "block";
						headerRows[_i].childNodes[index].getElementsByTagName("i")[0].style.display = "none";
					}
				}
			}
		}
	}, {
		key: "removePrevSortStyle",
		value: function removePrevSortStyle(index) {
			var bodyRows = this.refs.displayTableBody.childNodes;
			for (var i = 0; i < bodyRows.length; i++) {
				bodyRows[i].childNodes.forEach(function (node) {
					node.style.color = "#3d3833";
				});
			}

			var headerRows = this.refs.displayTableHead.childNodes;
			for (var _i2 = 0; _i2 < headerRows.length; _i2++) {
				headerRows[_i2].childNodes[index].getElementsByTagName("i")[0].style.display = "none";
				headerRows[_i2].childNodes[index].getElementsByTagName("i")[1].style.display = "none";
			}
		}
	}, {
		key: "toggleSortOrder",
		value: function toggleSortOrder() {
			if (this.state.sortOrder === 1) this.setState({ sortOrder: -1 });
			if (this.state.sortOrder === -1) this.setState({ sortOrder: 1 });
		}
	}, {
		key: "dynamicSort",
		value: function dynamicSort(property, sortOrder) {
			return function (a, b) {
				var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
				return result * sortOrder;
			};
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.applySortStyle(this.state.indexSorted);
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			this.listenPaginationEvent();
			this.listenSearchEvent();
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"table",
					{ ref: "displayTable", align: "center", className: "table text-centered" },
					_react2.default.createElement(
						"thead",
						{ ref: "displayTableHead" },
						_react2.default.createElement(
							"tr",
							null,
							this.getTableHeaders().map(function (key, index) {
								return _react2.default.createElement(
									"th",
									{ style: { textAlign: "center" }, key: index },
									_react2.default.createElement(
										"span",
										{ onClick: _this4.sortByHeader.bind(_this4, key, index), style: { position: "relative", cursor: "pointer" } },
										_react2.default.createElement("i", { style: { position: "absolute", right: -20, top: 1, color: "#71aedb", display: "none" }, className: "fas fa-angle-down" }),
										_react2.default.createElement("i", { style: { position: "absolute", right: -20, top: 1, color: "#71aedb", display: "none" }, className: "fas fa-angle-up" }),
										key
									)
								);
							})
						)
					),
					_react2.default.createElement(
						"tbody",
						{ ref: "displayTableBody" },
						this.state.tableData.data.map(function (dataObject, index) {
							return _react2.default.createElement(
								"tr",
								{ key: index },
								Object.keys(dataObject).map(function (key, keyIndex) {
									return _react2.default.createElement(
										"td",
										{ style: { textAlign: "center" }, key: keyIndex },
										dataObject[key]
									);
								}),
								_react2.default.createElement(
									"td",
									null,
									_react2.default.createElement("span", { style: { color: "#1ba7f5", paddingTop: 4 }, className: "fas fa-pen-square pull-right" })
								),
								_react2.default.createElement(
									"td",
									null,
									_react2.default.createElement("span", { style: { color: "#1ba7f5" }, className: "fa fa-ellipsis-v" })
								)
							);
						})
					)
				)
			);
		}
	}]);

	return DisplayTable;
}(_react.Component);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Footer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = exports.Footer = function (_Component) {
	_inherits(Footer, _Component);

	function Footer(props) {
		_classCallCheck(this, Footer);

		var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

		_this.state = { tableData: props.tableData, itemsPerPage: 10, currentPage: 1 };
		document.addEventListener("click", _this.closeAllSelect);
		return _this;
	}

	_createClass(Footer, [{
		key: "paginationItemsArray",
		value: function paginationItemsArray() {
			var pageItems = [];
			var totalItems = this.state.tableData.data.length;
			pageItems.push(this.state.itemsPerPage);
			while (true) {
				totalItems = totalItems - this.state.itemsPerPage;
				if (totalItems >= this.state.itemsPerPage) {
					pageItems.push(this.state.itemsPerPage);
				} else {
					pageItems.push(Math.abs(totalItems));
					break;
				}
			}
			return pageItems;
		}
	}, {
		key: "paginateTableData",
		value: function paginateTableData() {
			var paginatedArray = this.state.tableData.data.slice((this.state.currentPage - 1) * this.state.itemsPerPage, this.state.currentPage * this.state.itemsPerPage);
			this.props.eventEmitter.emit("paginationEvent", { data: paginatedArray });
			this.refs.pageSelect.value = this.state.currentPage;
			this.refs.itemsSelect.value = this.state.itemsPerPage;
		}
	}, {
		key: "pageStartingIndex",
		value: function pageStartingIndex() {
			return this.state.itemsPerPage * this.state.currentPage - this.state.itemsPerPage + 1;
		}
	}, {
		key: "pageEndingIndex",
		value: function pageEndingIndex() {
			if (this.state.tableData.data.length <= this.state.itemsPerPage) {
				return this.state.tableData.data.length;
			} else {
				return this.pageStartingIndex() + this.itemsInCurrentPage() - 1;
			}
		}
	}, {
		key: "itemsInCurrentPage",
		value: function itemsInCurrentPage() {
			return this.paginationItemsArray()[this.state.currentPage - 1];
		}
	}, {
		key: "itemsSelectorChanged",
		value: function itemsSelectorChanged() {
			var selectNode = this.refs.itemsSelect;
			var selected = selectNode.options[selectNode.selectedIndex].value;
			this.setState({ itemsPerPage: parseInt(selected, 16) }, this.paginateTableData);
		}
	}, {
		key: "pageSelectorChanged",
		value: function pageSelectorChanged() {
			var selectNode = this.refs.pageSelect;
			var selectedPage = selectNode.options[selectNode.selectedIndex].value;
			this.setState({ currentPage: parseInt(selectedPage, 16) }, this.paginateTableData);
		}
	}, {
		key: "getPagesNumbersList",
		value: function getPagesNumbersList() {
			var pagesNumber = this.getPagesNumber();
			var pagesNumebrsList = [];
			while (pagesNumber !== 0) {
				pagesNumebrsList.unshift(pagesNumber);
				pagesNumber--;
			}
			return pagesNumebrsList;
		}
	}, {
		key: "getPagesNumber",
		value: function getPagesNumber() {
			return Math.ceil(this.state.tableData.data.length / this.state.itemsPerPage);
		}
	}, {
		key: "nextPage",
		value: function nextPage() {
			this.props.eventEmitter.emit("nextPage", { itemsPerPage: this.state.itemsPerPage, currentPage: this.state.currentPage });
			if (this.state.currentPage !== this.getPagesNumber()) {
				this.setState({ currentPage: this.state.currentPage + 1 }, this.paginateTableData);
			}
		}
	}, {
		key: "prevPage",
		value: function prevPage() {
			this.props.eventEmitter.emit("prevPage", { itemsPerPage: this.state.itemsPerPage, currentPage: this.state.currentPage });
			if (this.state.currentPage !== 1) {
				this.setState({ currentPage: this.state.currentPage - 1 }, this.paginateTableData);
			}
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			if (this.props.footer) this.paginateTableData();
		}
	}, {
		key: "render",
		value: function render() {
			if (this.props.footer) {
				return _react2.default.createElement(
					"div",
					{ className: "footer-div" },
					_react2.default.createElement(
						"span",
						null,
						" Items per Page "
					),
					_react2.default.createElement(
						"div",
						{ className: "items-select" },
						_react2.default.createElement("span", { className: "fa fa-angle-down cursor-pointer" }),
						_react2.default.createElement(
							"select",
							{ ref: "itemsSelect", onChange: this.itemsSelectorChanged.bind(this) },
							_react2.default.createElement(
								"option",
								{ value: "10" },
								"10"
							),
							_react2.default.createElement(
								"option",
								{ value: "20" },
								"20"
							),
							_react2.default.createElement(
								"option",
								{ value: "50" },
								"50"
							)
						)
					),
					_react2.default.createElement(
						"span",
						{ className: "item-description" },
						" ",
						this.pageStartingIndex(),
						" - ",
						this.pageEndingIndex(),
						" of ",
						this.state.tableData.data.length,
						" items "
					),
					_react2.default.createElement(
						"div",
						{ className: "left-arrow" },
						_react2.default.createElement("span", { onClick: this.prevPage.bind(this), className: "fa fa-caret-left cursor-pointer" })
					),
					_react2.default.createElement(
						"div",
						{ className: "page-selector" },
						_react2.default.createElement("span", { className: "fa fa-angle-down cursor-pointer" }),
						_react2.default.createElement(
							"select",
							{ ref: "pageSelect", onChange: this.pageSelectorChanged.bind(this) },
							this.getPagesNumbersList().map(function (number, index) {
								return _react2.default.createElement(
									"option",
									{ key: index, value: number },
									number
								);
							})
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "right-arrow" },
						_react2.default.createElement("span", { onClick: this.nextPage.bind(this), className: "fa fa-caret-right cursor-pointer" })
					)
				);
			} else {
				return _react2.default.createElement("div", null);
			}
		}
	}]);

	return Footer;
}(_react.Component);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SearchBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = exports.SearchBar = function (_Component) {
	_inherits(SearchBar, _Component);

	function SearchBar(props) {
		_classCallCheck(this, SearchBar);

		var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

		_this.state = { tableData: props.tableData };
		return _this;
	}

	_createClass(SearchBar, [{
		key: "searchTableData",
		value: function searchTableData() {
			var searchQuery = this.refs.searchInput.value;
			var searchedArray = [];
			for (var i = 0; i < this.state.tableData.data.length; i++) {
				var element = this.state.tableData.data[i];
				var elementKeys = Object.keys(element);
				for (var j = 0; j < elementKeys.length; j++) {
					var elementKey = elementKeys[j];
					var elementTerm = element[elementKey];
					if (elementTerm.toString().includes(searchQuery)) {
						searchedArray.push(element);
						break;
					}
				}
			}
			this.props.eventEmitter.emit("searchEvent", { data: searchedArray });
		}
	}, {
		key: "render",
		value: function render() {
			if (this.props.searchBar) {
				return _react2.default.createElement(
					"div",
					{ className: "search-bar" },
					_react2.default.createElement(
						"div",
						{ className: "row" },
						_react2.default.createElement(
							"div",
							{ className: "col-md-2" },
							_react2.default.createElement(
								"div",
								{ className: "search-input-div" },
								_react2.default.createElement("span", { onClick: this.searchTableData.bind(this), className: "fa fa-search" }),
								_react2.default.createElement("input", { onKeyUp: this.searchTableData.bind(this), ref: "searchInput", className: "search-input", placeholder: "Search By Keyword..." })
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "col-md-2" },
							_react2.default.createElement(
								"div",
								{ className: "rules-selector" },
								_react2.default.createElement(
									"div",
									null,
									_react2.default.createElement("span", { className: "fa fa-angle-down" }),
									_react2.default.createElement("span", { className: "fa fa-search" }),
									_react2.default.createElement("input", { className: "rules-selector-input", placeholder: "View All Rules" })
								)
							)
						),
						_react2.default.createElement("div", { className: "col-md-6" }),
						_react2.default.createElement(
							"div",
							{ className: "col-md-2" },
							_react2.default.createElement(
								"button",
								{ className: "btn btn-success add-rules-button" },
								" Add Ruleset "
							)
						)
					)
				);
			} else {
				return _react2.default.createElement("div", null);
			}
		}
	}]);

	return SearchBar;
}(_react.Component);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d        = __webpack_require__(12)
  , callable = __webpack_require__(22)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Table = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Footer = __webpack_require__(5);

var _DisplayTable = __webpack_require__(4);

var _SearchBar = __webpack_require__(6);

var _eventEmitter = __webpack_require__(7);

var EventEmitter = _interopRequireWildcard(_eventEmitter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = exports.Table = function (_Component) {
	_inherits(Table, _Component);

	function Table(props) {
		_classCallCheck(this, Table);

		var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

		_this.state = { tableData: props.data };
		return _this;
	}

	_createClass(Table, [{
		key: "render",
		value: function render() {
			console.log(EventEmitter);
			var eventEmitter = EventEmitter.default();
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_SearchBar.SearchBar, { eventEmitter: eventEmitter, tableData: this.state.tableData, searchBar: this.props.searchBar }),
				_react2.default.createElement(_DisplayTable.DisplayTable, { eventEmitter: eventEmitter, tableData: this.state.tableData }),
				_react2.default.createElement(_Footer.Footer, { eventEmitter: eventEmitter, tableData: this.state.tableData, footer: this.props.footer })
			);
		}
	}]);

	return Table;
}(_react.Component);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "table thead{\n\tbackground-color: #f6f7fb;\n\tcolor: #62656c;\n\tborder-top: 1px solid #f2f2f2;\n\tborder-bottom: 1px solid #f2f2f2;\n}\n\ntable thead tr th{\n\tfont-weight: normal;\n\tborder-top: none;\n\tborder: none;\n}\n\ntable tbody tr:first-child{\n\tborder: none;\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".footer-div{\n\tbackground-color: #ffffff;\n\tcolor: #bbbbbd;\n\tpadding: 20px;\n\tborder-top: 1px solid #f2f2f2;\n\tposition: relative;\n}\n\n.items-select{\n\tposition: absolute;\n\tdisplay: inline;\n\tbackground-color: white; \n\tborder: 1px solid #f1f1f1;\n\twidth: 60px;\n\theight: 30px;\n\ttop: 15px;\n\tleft: 130px;\n}\n\n.items-select .fa-angle-down{\n\tposition: absolute;\n\ttop: 8px;\n\tleft: 40px;\n\tpointer-events: none;\n}\n\n.items-select select{\n\tborder-radius: 0px;\n\tbackground-color: white;\n\t-webkit-appearance: none;\n\t-webkit-border-radius: 0px;\n\twidth: 60px;\n\theight: 30px;\n\tborder:  1px solid #f1f1f1;\n\ttext-indent: 10px;\n\tcolor: black;\n}\n\n.cursor-pointer{\n\tcursor: pointer;\n}\n\n.select-number{\n\tposition: absolute;\n\ttop: 5px;\n\tleft: 5px;\n}\n\n.item-description{\n\tposition: absolute;\n\tleft: 200px;\n}\n\n.left-arrow .fa-caret-left{\n\tposition: absolute;\n\tright: 120px;\n\ttop: 20px;\n\tborder: 1px solid #f1f1f1;\n\tpadding: 8px;\n\theight: 30px;\n\tcolor: #71aedb;\n}\n\n.page-selector{\n\tposition: absolute;\n\ttop: 20px;\n\tright: 50px;\n}\n\n.page-selector select{\n\tborder-radius: 0px;\n\tbackground-color: white;\n\tcolor: black;\n\t-webkit-appearance: none;\n\t-webkit-border-radius: 0px;\n\twidth: 60px;\n\theight: 30px;\n\tborder:  1px solid #f1f1f1;\n\ttext-indent: 10px;\n}\n\n.page-selector .fa-angle-down{\n\tposition: absolute;\n\ttop: 8px;\n\tleft: 40px;\n\tpointer-events: none;\n}\n\n\n.right-arrow .fa-caret-right{\n\tposition: absolute;\n\tborder: 1px solid #f1f1f1;\n\tpadding: 8px;\n\ttop: 20px;\n\tright: 20px;\n\theight: 30px;\n\tcolor: #71aedb;\n}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".search-bar{ background-color: #f6f7fb; }\n\n.search-input-div{ padding: 10px; border: 1px solid #f3f2f2; border-radius: 5px; }\n\n.search-input{\n\tborder: 1px solid #f3f2f2;\n\tborder-radius: 2px;\t\n\tfont-size: 14px;\n\tpadding: 6px;\n\twidth: 200px;\n}\n\n.rules-selector{ margin: 10px; }\n\n.add-rules-button{ margin: 10px; }\n\n\n.search-input-div { position: relative; }\n.search-input-div input { text-indent: 5px }\n.search-input-div .fa-search { \n  position: absolute;\n  top: 20px;\n  left: 180px;\n  font-size: 15px;\n  color: #72aedb;\n}\n\n.rules-selector-input{\n\tbackground-color: white;\n\tborder-radius: none;\n\tborder: 1px solid #f3f2f2;\n\tborder-radius: 2px;\t\n\tfont-size: 14px;\n\tpadding: 6px;\n}\n.rules-selector { position: relative; }\n.rules-selector input { text-indent: 30px }\n.rules-selector .fa-angle-down { \n  position: absolute;\n  top: 10px;\n  left: 140px;\n  font-size: 15px;\n  color: #72aedb;\n}\n\n.rules-selector .fa-search { \n  position: absolute;\n  top: 10px;\n  left: 10px;\n  font-size: 15px;\n  color: #72aedb;\n}\n\n\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(14)
  , normalizeOpts = __webpack_require__(21)
  , isCallable    = __webpack_require__(17)
  , contains      = __webpack_require__(24)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(15)()
	? Object.assign
	: __webpack_require__(16);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(18)
  , value = __webpack_require__(23)
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
 return typeof obj === "function";
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(19)() ? Object.keys : __webpack_require__(20);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(2);

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(2);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(2);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(25)()
	? String.prototype.contains
	: __webpack_require__(26);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(9);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./DisplayTable.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./DisplayTable.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(10);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./Footer.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./Footer.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(11);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./SearchBar.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./SearchBar.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);