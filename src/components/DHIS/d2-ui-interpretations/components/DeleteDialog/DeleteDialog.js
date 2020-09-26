'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeleteDialog = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('@material-ui/core/styles');

var _DeleteDialog = require('./styles/DeleteDialog.style');

var _DeleteDialog2 = _interopRequireDefault(_DeleteDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeleteDialog = exports.DeleteDialog = function DeleteDialog(_ref) {
    var classes = _ref.classes,
        title = _ref.title,
        text = _ref.text,
        onDelete = _ref.onDelete,
        onCancel = _ref.onCancel;
    return _react2.default.createElement(
        _Dialog2.default,
        { open: true, maxWidth: 'sm' },
        _react2.default.createElement(
            _DialogTitle2.default,
            null,
            title
        ),
        _react2.default.createElement(
            _DialogContent2.default,
            { className: classes.content },
            text,
            _react2.default.createElement(
                _DialogActions2.default,
                { className: classes.actions },
                _react2.default.createElement(
                    _Button2.default,
                    {
                        className: classes.button,
                        onClick: onCancel,
                        variant: 'outlined'
                    },
                    _d2I18n2.default.t('Cancel')
                ),
                _react2.default.createElement(
                    _Button2.default,
                    {
                        className: classes.button,
                        onClick: onDelete,
                        color: 'primary',
                        variant: 'contained'
                    },
                    _d2I18n2.default.t('Confirm')
                )
            )
        )
    );
};

exports.default = (0, _styles.withStyles)(_DeleteDialog2.default)(DeleteDialog);


DeleteDialog.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    title: _propTypes2.default.string.isRequired,
    text: _propTypes2.default.string.isRequired,
    onDelete: _propTypes2.default.func.isRequired,
    onCancel: _propTypes2.default.func.isRequired
};