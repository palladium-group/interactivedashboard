'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _styles = require('@material-ui/core/styles');

var _Avatar3 = require('./styles/Avatar.style');

var _Avatar4 = _interopRequireDefault(_Avatar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserAvatar = function UserAvatar(_ref) {
    var classes = _ref.classes,
        firstName = _ref.firstName,
        surname = _ref.surname;

    var initials = firstName.charAt(0).concat(surname.charAt(0));

    return _react2.default.createElement(
        _Avatar2.default,
        { color: 'black', className: classes.avatar },
        initials
    );
};

UserAvatar.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    firstName: _propTypes2.default.string.isRequired,
    surname: _propTypes2.default.string.isRequired
};

exports.default = (0, _styles.withStyles)(_Avatar4.default)(UserAvatar);