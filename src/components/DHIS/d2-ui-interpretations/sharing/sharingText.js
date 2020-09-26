'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSharingText = undefined;

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accessMapping = {
    '--------': _d2I18n2.default.t('None'),
    'r-------': _d2I18n2.default.t('Read'),
    'rw------': _d2I18n2.default.t('Read/Write')
};

var getSharingText = exports.getSharingText = function getSharingText(model) {
    var publicAccessValue = accessMapping[model.publicAccess] || _d2I18n2.default.t('Unknown');
    var publicAccess = _d2I18n2.default.t('Public') + ': ' + publicAccessValue;

    var userCount = (model.userAccesses || []).length;
    var userInfo = userCount > 2 ? userCount + ' ' + _d2I18n2.default.t('Users') : (model.userAccesses || []).map(function (users) {
        return users.displayName;
    }).join(', ');

    var userGroupsCount = (model.userGroupAccesses || []).length;
    var userGroupsInfo = userGroupsCount > 2 ? userGroupsCount + ' ' + _d2I18n2.default.t('user groups') : (model.userGroupAccesses || []).map(function (userGroup) {
        return userGroup.displayName;
    }).join(', ');

    return publicAccess + (userInfo ? ' + ' + userInfo : '') + (userGroupsInfo ? ' + ' + userGroupsInfo : '');
};