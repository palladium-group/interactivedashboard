"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apiFetchWithResponse = exports.apiFetch = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _isObject = require("lodash/fp/isObject");

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiFetch = exports.apiFetch = function apiFetch(d2, urlOrPath, method) {
    var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var api = d2.Api.getApi();
    var payload = (0, _isObject2.default)(body) && method !== "GET" ? (0, _stringify2.default)(body) : body;
    var options = {
        headers: {
            "Content-Type": (0, _isObject2.default)(body) ? 'application/json' : 'text/plain'
        }
    };
    var url = urlOrPath.startsWith("/") ? api.baseUrl + urlOrPath : urlOrPath;

    return api.request(method, url, payload, options);
};

var apiFetchWithResponse = exports.apiFetchWithResponse = function apiFetchWithResponse(d2, urlOrPath, method) {
    var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var api = d2.Api.getApi();
    var url = urlOrPath.startsWith("/") ? api.baseUrl + urlOrPath : urlOrPath;
    var options = {
        method: method,
        body: body,
        mode: 'cors',
        credentials: 'include',
        cache: 'default'
    };

    return fetch(url, options);
};