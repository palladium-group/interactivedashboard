'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardInfo = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _Likes = require('../Interpretation/Likes');

var _Likes2 = _interopRequireDefault(_Likes);

var _Replies = require('../Interpretation/Replies');

var _Replies2 = _interopRequireDefault(_Replies);

var _CardInfo = require('./styles/CardInfo.style');

var _CardInfo2 = _interopRequireDefault(_CardInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardInfo = exports.CardInfo = function CardInfo(_ref) {
    var classes = _ref.classes,
        likedBy = _ref.likedBy,
        repliedBy = _ref.repliedBy,
        createdDate = _ref.createdDate;
    return _react2.default.createElement(
        'div',
        { className: classes.cardInfo },
        _react2.default.createElement(
            'span',
            null,
            ' ',
            createdDate,
            ' '
        ),
        _react2.default.createElement(_Likes2.default, { likedBy: likedBy }),
        _react2.default.createElement(_Replies2.default, { repliedBy: repliedBy })
    );
};

CardInfo.defaultProps = {
    likedBy: [],
    repliedBy: []
};

CardInfo.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    likedBy: _propTypes2.default.array.isRequired,
    repliedBy: _propTypes2.default.array.isRequired,
    createdDate: _propTypes2.default.string.isRequired
};

exports.default = (0, _styles.withStyles)(_CardInfo2.default)(CardInfo);