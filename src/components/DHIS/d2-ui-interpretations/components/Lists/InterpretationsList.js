'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InterpretationsList = exports.interpretationsToShowOnInit = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _Link = require('../Link/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Interpretation = require('../Interpretation/Interpretation');

var _Interpretation2 = _interopRequireDefault(_Interpretation);

var _auth = require('../../authorization/auth');

var _InterpretationsList = require('./styles/InterpretationsList.style');

var _InterpretationsList2 = _interopRequireDefault(_InterpretationsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpretationsToShowOnInit = exports.interpretationsToShowOnInit = 5;

var InterpretationsList = exports.InterpretationsList = function InterpretationsList(_ref) {
    var classes = _ref.classes,
        d2 = _ref.d2,
        model = _ref.model,
        userGroups = _ref.userGroups,
        interpretations = _ref.interpretations,
        onSelect = _ref.onSelect,
        onChange = _ref.onChange,
        isExpanded = _ref.isExpanded,
        toggleShowAllInterpretations = _ref.toggleShowAllInterpretations;

    var filteredItems = interpretations.filter(function (item) {
        return (0, _auth.haveReadAccess)(d2, userGroups, item) && item;
    });

    var listItems = isExpanded ? filteredItems : filteredItems.slice(0, interpretationsToShowOnInit);

    return listItems.length ? _react2.default.createElement(
        _react.Fragment,
        null,
        filteredItems.length > interpretationsToShowOnInit && _react2.default.createElement(_Link2.default, {
            label: (isExpanded ? _d2I18n2.default.t('Hide') : _d2I18n2.default.t('Show')) + ' previous interpretations',
            onClick: toggleShowAllInterpretations
        }),
        listItems.map(function (item) {
            return _react2.default.createElement(_Interpretation2.default, {
                model: model,
                userGroups: userGroups,
                haveReadAccess: (0, _auth.haveReadAccess)(d2, userGroups, item),
                key: item.id,
                interpretation: item,
                onChange: onChange,
                onSelect: onSelect,
                extended: false
            });
        })
    ) : _react2.default.createElement(
        'div',
        { className: classes.emptyList },
        _d2I18n2.default.t("No interpretations")
    );
};

InterpretationsList.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    d2: _propTypes2.default.object.isRequired,
    model: _propTypes2.default.object.isRequired,
    interpretations: _propTypes2.default.array.isRequired,
    onSelect: _propTypes2.default.func.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    isExpanded: _propTypes2.default.bool.isRequired,
    toggleShowAllInterpretations: _propTypes2.default.func.isRequired
};

exports.default = (0, _styles.withStyles)(_InterpretationsList2.default)(InterpretationsList);