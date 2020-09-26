'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setInitialSharing = exports.getSharing = exports.shouldUpdateSharing = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shouldUpdateSharing = exports.shouldUpdateSharing = function shouldUpdateSharing(sharingInfo, interpretation) {
    var externalAccess = !(0, _isEqual2.default)(sharingInfo.externalAccess, interpretation.externalAccess);
    var publicAccess = !(0, _isEqual2.default)(sharingInfo.publicAccess, interpretation.publicAccess);
    var userAccesses = !(0, _isEqual2.default)(sharingInfo.userAccesses || [], interpretation.userAccesses);
    var userGroupAccesses = !(0, _isEqual2.default)(sharingInfo.userGroupAccesses || [], interpretation.userGroupAccesses);

    return externalAccess || publicAccess || userAccesses || userGroupAccesses;
};

var getSharing = exports.getSharing = function getSharing(user, interpretation, model) {
    return {
        object: {
            user: { id: user.id, name: user.displayName },
            displayName: model.displayName,
            userAccesses: interpretation.userAccesses,
            userGroupAccesses: interpretation.userGroupAccesses,
            publicAccess: interpretation.publicAccess,
            externalAccess: interpretation.externalAccess,
            modelId: model.id
        },
        meta: {
            allowPublicAccess: model.publicAccess.includes('r'),
            allowExternalAccess: model.externalAccess
        }
    };
};

var setInitialSharing = exports.setInitialSharing = function setInitialSharing(user, object) {
    return {
        object: {
            user: { id: user.id, name: user.displayName },
            displayName: object.displayName,
            userAccesses: object.userAccesses.map(function (obj) {
                return (0, _assign2.default)({}, obj, { access: 'rw------' });
            }),
            userGroupAccesses: object.userGroupAccesses.map(function (obj) {
                return (0, _assign2.default)({}, obj, { access: 'rw------' });
            }),
            publicAccess: object.publicAccess.includes('r') ? 'rw------' : object.publicAccess,
            externalAccess: object.externalAccess,
            modelId: object.id
        },
        meta: {
            allowPublicAccess: object.publicAccess.includes('r'),
            allowExternalAccess: object.externalAccess
        }
    };
};