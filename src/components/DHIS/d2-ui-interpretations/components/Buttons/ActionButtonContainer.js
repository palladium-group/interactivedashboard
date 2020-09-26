'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionButtonContainer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _ActionButton = require('./ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _RedirectButton = require('./RedirectButton');

var _RedirectButton2 = _interopRequireDefault(_RedirectButton);

var _ActionButtonContainer = require('./styles/ActionButtonContainer.style');

var _ActionButtonContainer2 = _interopRequireDefault(_ActionButtonContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UNLIKE_INDEX = 0;
var LIKE_INDEX = 1;
var VIEW_INDEX = 2;
var EXIT_VIEW_INDEX = 3;
var SHARE_INDEX = 4;
var EDIT_INDEX = 5;
var DELETE_INDEX = 6;
var REPLY_INDEX = 7;

var ActionButtonContainer = exports.ActionButtonContainer = function ActionButtonContainer(_ref) {
    var classes = _ref.classes,
        isFocused = _ref.isFocused,
        interpretationId = _ref.interpretationId,
        currentUserLikesInterpretation = _ref.currentUserLikesInterpretation,
        canReply = _ref.canReply,
        canManage = _ref.canManage,
        onClickHandlers = _ref.onClickHandlers;
    return _react2.default.createElement(
        'div',
        { className: classes.actions },
        _react2.default.createElement(_ActionButton2.default, {
            iconType: currentUserLikesInterpretation ? 'unlike' : 'like',
            onClick: onClickHandlers[currentUserLikesInterpretation ? UNLIKE_INDEX : LIKE_INDEX]
        }),
        canReply && _react2.default.createElement(_ActionButton2.default, {
            iconType: 'reply',
            onClick: onClickHandlers[REPLY_INDEX]
        }),
        _react2.default.createElement(_ActionButton2.default, {
            iconType: isFocused ? 'visibilityOff' : 'visibility',
            onClick: onClickHandlers[isFocused ? EXIT_VIEW_INDEX : VIEW_INDEX]
        }),
        _react2.default.createElement(_RedirectButton2.default, { interpretationId: interpretationId }),
        canManage && _react2.default.createElement(
            _react.Fragment,
            null,
            _react2.default.createElement(_ActionButton2.default, {
                iconType: 'share',
                onClick: onClickHandlers[SHARE_INDEX]
            }),
            _react2.default.createElement(_ActionButton2.default, {
                iconType: 'edit',
                onClick: onClickHandlers[EDIT_INDEX]
            }),
            _react2.default.createElement(_ActionButton2.default, {
                iconType: 'delete',
                onClick: onClickHandlers[DELETE_INDEX]
            })
        )
    );
};

ActionButtonContainer.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    isFocused: _propTypes2.default.bool.isRequired,
    interpretationId: _propTypes2.default.string.isRequired,
    currentUserLikesInterpretation: _propTypes2.default.bool.isRequired,
    canReply: _propTypes2.default.bool.isRequired,
    canManage: _propTypes2.default.bool.isRequired,
    onClickHandlers: _propTypes2.default.array.isRequired
};

exports.default = (0, _styles.withStyles)(_ActionButtonContainer2.default)(ActionButtonContainer);