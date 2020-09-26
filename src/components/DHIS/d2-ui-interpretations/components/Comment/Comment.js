'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Comment = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _ActionButton = require('../Buttons/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _WithAvatar = require('../Avatar/WithAvatar');

var _WithAvatar2 = _interopRequireDefault(_WithAvatar);

var _CardHeader = require('../Cards/CardHeader');

var _CardHeader2 = _interopRequireDefault(_CardHeader);

var _CardText = require('../Cards/CardText');

var _CardText2 = _interopRequireDefault(_CardText);

var _CardInfo = require('../Cards/CardInfo');

var _CardInfo2 = _interopRequireDefault(_CardInfo);

var _dateformatter = require('../../dateformats/dateformatter');

var _Comment = require('./styles/Comment.style');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comment = exports.Comment = function Comment(_ref) {
    var classes = _ref.classes,
        comment = _ref.comment,
        isOwner = _ref.isOwner,
        canReply = _ref.canReply,
        locale = _ref.locale,
        onEdit = _ref.onEdit,
        onReply = _ref.onReply,
        onDelete = _ref.onDelete;
    return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
            _WithAvatar2.default,
            { className: classes.comment, key: comment.id, firstName: comment.user.firstName, surname: comment.user.surname },
            _react2.default.createElement(_CardHeader2.default, { userName: comment.user.displayName }),
            _react2.default.createElement(_CardText2.default, { text: comment.text }),
            _react2.default.createElement(_CardInfo2.default, { createdDate: (0, _dateformatter.formatDate)(comment.created, locale) }),
            isOwner && canReply ? _react2.default.createElement(
                'div',
                { className: classes.commentActions },
                _react2.default.createElement(_ActionButton2.default, {
                    iconType: 'edit',
                    onClick: function onClick() {
                        return onEdit(comment);
                    }
                }),
                _react2.default.createElement(_ActionButton2.default, {
                    iconType: 'reply',
                    onClick: function onClick() {
                        return onReply(comment);
                    }
                }),
                _react2.default.createElement(_ActionButton2.default, {
                    iconType: 'delete',
                    onClick: function onClick() {
                        return onDelete(comment);
                    }
                })
            ) : canReply && _react2.default.createElement(_ActionButton2.default, {
                iconType: 'reply',
                onClick: function onClick() {
                    return onReply(comment);
                }
            })
        )
    );
};

Comment.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    comment: _propTypes2.default.object.isRequired,
    isOwner: _propTypes2.default.bool.isRequired,
    locale: _propTypes2.default.string.isRequired,
    onEdit: _propTypes2.default.func.isRequired,
    onReply: _propTypes2.default.func.isRequired,
    onDelete: _propTypes2.default.func.isRequired
};

exports.default = (0, _styles.withStyles)(_Comment2.default)(Comment);