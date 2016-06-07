import { EventEmitter2 as Emitter } from 'eventemitter2';
import isEqual from 'lodash.isequal';

class Model extends Emitter {
	constructor(attributes/*: Object*/ = {}, options/*: Object*/ = {}) {
        super();
        this.attributes = {};
        this.set(attributes, options);
        this.initialize(attributes, options);
	}

    initialize() {
    }

    _validate(attrs/*: Object*/ = {}, options/*: Object*/ = {}) {
        return true;
    }

    get(attr/*: string*/) {
        return this.attributes[attr];
    }

    set(attrs/*: Object*/ = {}, options/*: Object*/ = {}) {
        if (!this._validate(attrs, options)) {
            return false;
        }

        if (!this._changing) {
            this._originalAttributes = { ...this.attributes };
            this.changed = {};
        }

        var changing = this._changing;
        this._changing = true;

        var changes = [];

        for (var attr in attrs) {
            if (!isEqual(this.attributes[attr], attrs[attr])) {
                changes.push(attr);
            }

            this._set(attr, attrs[attr], options);
        }

        if (attrs.hasOwnProperty(this.idAttribute)) {
            this.id = this.get(this.idAttribute);
        }

        if (!options.silent) {
            if (changes.length) {
                this._pending = options;
            }
            for (var i = 0; i < changes.length; i++) {
                this.emit(`change:${changes[i]}`, {
                    model: this,
                    value: this.attributes[changes[i]],
                    options
                });
            }
        }

        if (changing) {
            return this;
        }

        if (!options.silent) {
            while (this._pending) {
                options = this._pending;
                this._pending = false;
                this.emit('change', {
                    model: this,
                    options
                });
            }
        }

        this._pending = false;
        this._changing = false;

        return this;
    }

    unset(attr/*: string*/, options/*: Object*/ = {}) {
        this.set({ [attr]: void 0 }, { ...options, unset: true });
    }

    _set(attr/*: string*/, val/*: any*/, options/*: Object*/ = {}) {
        if (!isEqual(this._originalAttributes[attr], val)) {
            this.changed[attr] = val;
        } else {
            delete this.changed[attr];
        }

        if (options.unset) {
            delete this.attributes[attr];
        } else {
            this.attributes[attr] = val;
        }
    }
}

export default Model;