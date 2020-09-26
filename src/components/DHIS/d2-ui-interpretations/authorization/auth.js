'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.haveWriteAccess = exports.haveReadAccess = exports.userCanManage = undefined;

var _some = require('lodash/fp/some');

var _some2 = _interopRequireDefault(_some);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userCanManage = exports.userCanManage = function userCanManage(d2, object) {
    var _ref = d2 || {},
        currentUser = _ref.currentUser;

    if (!object || !object.user || !currentUser) {
        return false;
    } else if (object.user.id === currentUser.id) {
        return true;
    } else if (currentUser.authorities.has("ALL")) {
        return true;
    } else {
        return false;
    }
};

var haveReadAccess = exports.haveReadAccess = function haveReadAccess(d2, userGroups, object) {
    var _ref2 = d2 || {},
        currentUser = _ref2.currentUser;

    if (!object || !currentUser) {
        return false;
    } else if (object.user && currentUser.id === object.user.id) {
        return true;
    } else if (currentUser.authorities.has('ALL')) {
        return true;
    } else if (object.publicAccess.includes('r')) {
        return true;
    } else if (sharedUserAccess(currentUser.id, object.userAccesses, 'r')) {
        return true;
    } else if (sharedUserGroups(userGroups, object.userGroupAccesses, 'r')) {
        return true;
    } else {
        return false;
    }
};

var haveWriteAccess = exports.haveWriteAccess = function haveWriteAccess(d2, userGroups, object) {
    var _ref3 = d2 || {},
        currentUser = _ref3.currentUser;

    if (!object || !currentUser) {
        return false;
    } else if (object.user && currentUser.id === object.user.id) {
        return true;
    } else if (currentUser.authorities.has('ALL')) {
        return true;
    } else if (object.publicAccess.includes('w')) {
        return true;
    } else if (sharedUserAccess(currentUser.id, object.userAccesses, 'w')) {
        return true;
    } else if (sharedUserGroups(userGroups, object.userGroupAccesses, 'w')) {
        return true;
    } else {
        return false;
    }
};

var sharedUserAccess = function sharedUserAccess(userId, users, accessBit) {
    return (0, _some2.default)(function (user) {
        return user.id === userId && user.access.includes(accessBit);
    }, users);
};

var sharedUserGroups = function sharedUserGroups(userGroups, objectGroups, accessBit) {
    var isMember = false;

    userGroups.forEach(function (id) {
        if ((0, _some2.default)(function (objectGroup) {
            return objectGroup.id === id && objectGroup.access.includes(accessBit);
        }, objectGroups)) {
            isMember = true;
        }
    });

    return isMember;
};