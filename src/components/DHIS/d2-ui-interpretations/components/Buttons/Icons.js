'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Visibility = require('@material-ui/icons/Visibility');

var _Visibility2 = _interopRequireDefault(_Visibility);

var _VisibilityOff = require('@material-ui/icons/VisibilityOff');

var _VisibilityOff2 = _interopRequireDefault(_VisibilityOff);

var _ThumbUp = require('@material-ui/icons/ThumbUp');

var _ThumbUp2 = _interopRequireDefault(_ThumbUp);

var _Reply = require('@material-ui/icons/Reply');

var _Reply2 = _interopRequireDefault(_Reply);

var _Create = require('@material-ui/icons/Create');

var _Create2 = _interopRequireDefault(_Create);

var _Share = require('@material-ui/icons/Share');

var _Share2 = _interopRequireDefault(_Share);

var _Delete = require('@material-ui/icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _Launch = require('@material-ui/icons/Launch');

var _Launch2 = _interopRequireDefault(_Launch);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _Icons = require('./styles/Icons.style');

var _Icons2 = _interopRequireDefault(_Icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	visibility: {
		icon: _react2.default.createElement(_Visibility2.default, { style: _Icons2.default.interpretationCommentIcon }),
		tooltip: _d2I18n2.default.t('View')
	},
	visibilityOff: {
		icon: _react2.default.createElement(_VisibilityOff2.default, { style: _Icons2.default.interpretationCommentIcon }),
		tooltip: _d2I18n2.default.t('Exit View')
	},
	like: {
		icon: _react2.default.createElement(_ThumbUp2.default, { style: (0, _extends3.default)({}, _Icons2.default.interpretationCommentIcon, _Icons2.default.unlikedThumbUp) }),
		tooltip: _d2I18n2.default.t('Like')
	},
	unlike: {
		icon: _react2.default.createElement(_ThumbUp2.default, { style: (0, _extends3.default)({}, _Icons2.default.interpretationCommentIcon, _Icons2.default.likedThumbUp) }),
		tooltip: _d2I18n2.default.t('Unlike')
	},
	reply: {
		icon: _react2.default.createElement(_Reply2.default, { style: _Icons2.default.interpretationCommentIcon }),
		tooltip: _d2I18n2.default.t('Reply')
	},
	edit: {
		icon: _react2.default.createElement(_Create2.default, { style: _Icons2.default.interpretationCommentIcon }),
		tooltip: _d2I18n2.default.t('Edit')
	},
	share: {
		icon: _react2.default.createElement(_Share2.default, { style: _Icons2.default.interpretationCommentIcon }),
		tooltip: _d2I18n2.default.t('Manage sharing') },
	delete: {
		icon: _react2.default.createElement(_Delete2.default, { style: _Icons2.default.interpretationCommentIcon }),
		tooltip: _d2I18n2.default.t('Delete')
	},
	openApp: {
		icon: _react2.default.createElement(_Launch2.default, { style: _Icons2.default.interpretationCommentIcon })
	}
};