import { EventEmitter2 as Emitter } from 'eventemitter2';

class Model extends Emitter {
	constructor(...args) {
        const [ attributes/*: Object*/ = {}, options/*: Object*/ = {} ] = args;
        super();
        this.attributes = {};
        this.set(attributes, options);
        this.initialize(...args);
	}

    initialize() {
    }

    get(name/*: string*/) {
        return this.attributes[name];
    }

    set(fields/*: Object*/ = {}, options/*: Object*/ = {}) {
        for (let field in fields) {
            this._set(field, fields[field], options);
        }
    }

    unset(name/*: string*/, options/*: Object*/ = {}) {
        this._set(name, null, { ...options, unset: true });
    }

    _set(name/*: string*/, value/*: any*/, options/*: Object*/ = {}) {
        const oldVal = this.get(name);

        if (options.unset) {
            delete this.attributes[name];
        } else {
            this.attributes[name] = value;
        }

        if (!options.silent && this.attributes[name] !== oldVal) {
            this.emit(`change:${name}`, { value, oldVal });
        }
    }

}

export default Model;