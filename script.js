import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
const Key = ({ char, span, active }) => {
    return (React.createElement("div", { className: ['key', span && 'span', active && 'active'].filter(Boolean).join(' ') },
        React.createElement("div", { className: 'side' }),
        React.createElement("div", { className: 'top' }),
        React.createElement("div", { className: 'char' }, char)));
};
const Column = ({ children }) => {
    return (React.createElement("div", { className: 'column' }, children));
};
const Row = ({ children }) => {
    return (React.createElement("div", { className: 'row' }, children));
};
const useSetState = (initialState = []) => {
    const [state, setState] = useState(new Set(initialState));
    const add = (item) => setState(state => new Set(state.add(item)));
    const remove = (item) => setState(state => {
        state.delete(item);
        return new Set(state);
    });
    return { set: state, add, remove, has: char => state.has(char) };
};
const Keyboard = () => {
    const { add, remove, has } = useSetState([]);
    useEffect(() => {
        document.addEventListener('keydown', e => add(e.key));
        document.addEventListener('keyup', e => remove(e.key));
    }, []);
    const keys = (chars, spans = []) => chars.map((char, i) => (React.createElement(Key, { key: char, char: char, span: spans[i] || false, active: has(char) })));
    return (React.createElement("div", { className: 'keyboard' },
        React.createElement(Column, null,
            React.createElement(Row, null, keys(['7', '8', '9'])),
            React.createElement(Row, null, keys(['4', '5', '6'])),
            React.createElement(Row, null, keys(['1', '2', '3'])),
            React.createElement(Row, null, keys(['0', '.'], [true, false]))),
        React.createElement(Column, null, keys(['+', '-'], [true, true])),
        React.createElement("div", { className: 'shade' }),
        React.createElement("div", { className: 'cover' })));
};
ReactDOM.render(React.createElement(Keyboard, null), document.body);