'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WithAvatar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UserAvatar = require('./UserAvatar');

var _UserAvatar2 = _interopRequireDefault(_UserAvatar);

var _styles = require('@material-ui/core/styles');

var _Avatar = require('./styles/Avatar.style');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WithAvatar = exports.WithAvatar = function WithAvatar(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        onClick = _ref.onClick,
        firstName = _ref.firstName,
        surname = _ref.surname,
        children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: className, onClick: onClick },
        _react2.default.createElement(
            'div',
            { className: classes.avatarBox },
            _react2.default.createElement(_UserAvatar2.default, { firstName: firstName, surname: surname })
        ),
        _react2.default.createElement(
            'div',
            { className: classes.avatarBoxContent },
            children
        )
    );
};

WithAvatar.defaultProps = {
    onClick: function onClick() {
        return null;
    }
};

WithAvatar.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    className: _propTypes2.default.string,
    firstName: _propTypes2.default.string.isRequired,
    surname: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired
};

exports.default = (0, _styles.withStyles)(_Avatar2.default)(WithAvatar);