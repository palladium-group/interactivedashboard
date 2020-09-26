'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.insertMarkdown = exports.markdownHandler = undefined;

var _formats = require('./formats');

var _helper = require('./helper');

var markdownHandler = exports.markdownHandler = function markdownHandler(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) {
    return highlightedText.length ? markHighlighted(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) : insertMarkdown(TYPE, currentInput, cursorStart);
};

var markHighlighted = function markHighlighted(TYPE, currentInput, highlightedText, cursorStart, cursorEnd) {
    var formatted = void 0;

    var previousChar = currentInput.substring(cursorStart - 1, cursorStart);
    var nextChar = currentInput.substring(cursorEnd, cursorEnd + 1);

    cursorStart !== _formats.TEXT_START_INDEX && previousChar !== _formats.whitespace ? formatted = (0, _helper.concatHelper)(TYPE, _helper.WITH_SPACE, currentInput, highlightedText, cursorStart, cursorEnd) : formatted = (0, _helper.concatHelper)(TYPE, _helper.WITHOUT_SPACE, currentInput, highlightedText, cursorStart, cursorEnd);

    cursorEnd !== currentInput.length && nextChar !== _formats.whitespace ? formatted.text += _formats.whitespace + currentInput.substring(cursorEnd, currentInput.length) : formatted.text += currentInput.substring(cursorEnd, currentInput.length);

    return {
        text: formatted.text,
        highlightStart: formatted.highlightStart,
        highlightEnd: formatted.highlightEnd
    };
};

var insertMarkdown = exports.insertMarkdown = function insertMarkdown(TYPE, currentInput, cursorStart) {
    var emoticon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var formatted = void 0;

    var previousChar = currentInput.substring(cursorStart - 1, cursorStart);
    var nextChar = currentInput.substring(cursorStart + 1, cursorStart);

    cursorStart !== _formats.TEXT_START_INDEX && previousChar !== _formats.whitespace ? formatted = (0, _helper.insertHelper)(TYPE, _helper.WITH_SPACE, currentInput, cursorStart, emoticon) : formatted = (0, _helper.insertHelper)(TYPE, _helper.WITHOUT_SPACE, currentInput, cursorStart, emoticon);

    cursorStart !== currentInput.length && nextChar !== _formats.whitespace ? formatted.text += _formats.whitespace + currentInput.substring(cursorStart, currentInput.length) : formatted.text += currentInput.substring(cursorStart, currentInput.length);

    return {
        text: formatted.text,
        highlightStart: formatted.highlightStart,
        highlightEnd: formatted.highlightEnd
    };
};