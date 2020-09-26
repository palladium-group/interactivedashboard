'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.itemTypeMap = exports.getLink = exports.getBaseUrl = exports.getId = exports.extractFavorite = exports.VISUALIZATION = exports.EVENT_CHART = exports.EVENT_REPORT = exports.REPORT_TABLE = exports.MAP = exports.CHART = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _itemTypeMap;

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHART = exports.CHART = 'CHART';
var MAP = exports.MAP = 'MAP';
var REPORT_TABLE = exports.REPORT_TABLE = 'REPORT_TABLE';
var EVENT_REPORT = exports.EVENT_REPORT = 'EVENT_REPORT';
var EVENT_CHART = exports.EVENT_CHART = 'EVENT_CHART';
var VISUALIZATION = exports.VISUALIZATION = 'VISUALIZATION';

var extractFavorite = exports.extractFavorite = function extractFavorite(item) {
    if (!(0, _isObject2.default)(item)) {
        return null;
    }

    switch (item.type) {
        case REPORT_TABLE:
            return item.reportTable;
        case CHART:
            return item.chart;
        case MAP:
            return item.map;
        case EVENT_REPORT:
            return item.eventReport;
        case EVENT_CHART:
            return item.eventChart;
        case VISUALIZATION:
            return item.chart || item.reportTable;
        default:
            return item.reportTable || item.chart || item.map || item.eventReport || item.eventChart || {};
    }
};

var getId = exports.getId = function getId(item) {
    return extractFavorite(item).id;
};

var getBaseUrl = exports.getBaseUrl = function getBaseUrl(d2) {
    var api = d2.Api.getApi();
    var idx = api.baseUrl.indexOf('/api');
    return idx > -1 ? api.baseUrl.slice(0, idx) : api.baseUrl;
};

var getLink = exports.getLink = function getLink(item, d2, interpretationId) {
    var baseUrl = getBaseUrl(d2);
    var appUrl = itemTypeMap[item.type].appUrl(getId(item), interpretationId);

    return baseUrl + '/' + appUrl;
};

var itemTypeMap = exports.itemTypeMap = (_itemTypeMap = {}, (0, _defineProperty3.default)(_itemTypeMap, REPORT_TABLE, {
    id: REPORT_TABLE,
    appUrl: function appUrl(modelId, interpretationId) {
        return 'dhis-web-pivot/?id=' + modelId + '&interpretationid=' + interpretationId;
    },
    propName: 'reportTable',
    appName: _d2I18n2.default.t('Pivot Tables'),
    detailsTitle: _d2I18n2.default.t('Table details')
}), (0, _defineProperty3.default)(_itemTypeMap, CHART, {
    id: CHART,
    appUrl: function appUrl(modelId, interpretationId) {
        return 'dhis-web-data-visualizer/#/' + modelId + '/interpretation/' + interpretationId;
    },
    propName: 'chart',
    appName: _d2I18n2.default.t('Visualizer'),
    detailsTitle: _d2I18n2.default.t('Chart details')
}), (0, _defineProperty3.default)(_itemTypeMap, MAP, {
    id: MAP,
    appUrl: function appUrl(modelId, interpretationId) {
        return 'dhis-web-maps/?id=' + modelId + '&interpretationid=' + interpretationId;
    },
    propName: 'maps',
    appName: _d2I18n2.default.t('Maps'),
    detailsTitle: _d2I18n2.default.t('Map details')
}), (0, _defineProperty3.default)(_itemTypeMap, EVENT_REPORT, {
    id: EVENT_REPORT,
    appUrl: function appUrl(modelId, interpretationId) {
        return 'dhis-web-event-reports/?id=' + modelId + '&interpretationid=' + interpretationId;
    },
    propName: 'eventReport',
    appName: _d2I18n2.default.t('Event Reports'),
    detailsTitle: _d2I18n2.default.t('Table details')
}), (0, _defineProperty3.default)(_itemTypeMap, EVENT_CHART, {
    id: EVENT_CHART,
    appUrl: function appUrl(modelId, interpretationId) {
        return 'dhis-web-event-visualizer/?id=' + modelId + '&interpretationid=' + interpretationId;
    },
    propName: 'eventChart',
    appName: _d2I18n2.default.t('Event Visualizer'),
    detailsTitle: _d2I18n2.default.t('Chart details')
}), (0, _defineProperty3.default)(_itemTypeMap, VISUALIZATION, {
    id: VISUALIZATION,
    appUrl: function appUrl(modelId, interpretationId) {
        return 'dhis-web-data-visualizer/#/' + modelId + '/interpretation/' + interpretationId;
    },
    propName: 'visualization',
    appName: _d2I18n2.default.t('Visualizer'),
    detailsTitle: _d2I18n2.default.t('Visualization details')
}), _itemTypeMap);