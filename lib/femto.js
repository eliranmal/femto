'use strict';


// a dmz object to ensure a well-known binding context
const ø = Object.create(null);

const placeholder = {};


const _weaveArgs = (sparseArgs, denseArgs) => sparseArgs
    .map(arg => arg === placeholder ? denseArgs.shift() : arg)
    .concat(denseArgs);

const _partial = (fn, ...args) => bind(fn, ø, ...args);

const _partialSparse = (fn, ...args) => (...callArgs) => fn(..._weaveArgs(args, callArgs));


const identity = (x) => x;

const bind = (fn, ctx, ...args) => fn.bind(ctx, ...args);

const partial = (fn, ...args) => args.includes(placeholder) ? _partialSparse(fn, ...args) : _partial(fn, ...args);

const partialRight = (fn, ...args) => (...callArgs) => fn(...callArgs, ...args.reverse());

const bindMethod = (obj, method, ...args) => bind(obj[method], obj, ...args);

const invoke = (fn, ...args) => fn(...args);

const invokeEach = (fns, ...commonArgs) => fns.map(fn => fn(...commonArgs));

const spread = (fn) => (args) => fn(...args);

const rest = (fn) => (...args) => fn(args);

const prop = (key) => (obj) => obj[key];

const props = (...keys) => (obj) => keys.map(k => obj[k]);

const compose = (...fns) => (...callArgs) => fns
    .reduceRight((argsAccum, fn) => {
        const arity = fn.length;
        const args = arity ? argsAccum.slice(0, arity) : argsAccum;
        const nextArgs = argsAccum.slice(arity || 1);
        nextArgs.unshift(fn(...args));
        return nextArgs;
    }, callArgs)
    .shift();

const seq = (...fns) => compose(...fns.reverse());


module.exports = {
    identity,
    bind,
    partial,
    partialRight,
    bindMethod,
    spread,
    rest,
    prop,
    props,
    compose,
    seq,
    invoke,
    invokeEach,
    placeholder,
};
