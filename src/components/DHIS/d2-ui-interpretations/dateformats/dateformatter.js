'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatDate = formatDate;
exports.formatRelative = formatRelative;
exports.dateIsOver24Hours = dateIsOver24Hours;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDate() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var uiLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

    if (typeof global.Intl !== 'undefined' && Intl.DateTimeFormat) {
        return new Intl.DateTimeFormat(uiLocale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(value));
    }

    return value.substr(0, 19).replace('T', ' ');
}

function formatRelative(value, uiLocale) {
    var createdRelativeDate = (0, _moment2.default)(value, _moment2.default.ISO_8601).fromNow();

    return dateIsOver24Hours(createdRelativeDate) ? formatDate(value, uiLocale) : createdRelativeDate;
};

function dateIsOver24Hours(relativeDate) {
    var shouldFormatToDate = false;
    ['day', 'year', 'month'].forEach(function (item) {
        if (relativeDate.includes(item)) {
            shouldFormatToDate = true;
        }
    });

    return shouldFormatToDate;
};