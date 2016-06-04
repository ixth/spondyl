import Model from 'spondyl/model';

export default function () {
    describe('#unset', function () {
        it('should properly set attributes', function () {
            var model = new Model();

            model.set({ foo: 'bar' });

            chai.expect(model.get('foo')).to.equal('bar');
        });

        describe('', function () {
            beforeEach(function () {
                this.model = new Model({ foo: 'bar' });
            });

            it('should emit `change` event', function (done) {
                this.model.on('change:foo', function () {
                    done();
                });

                this.model.set({ foo: 'baz' });
            });

            it('should pass proper value to `change` event', function (done) {
                this.model.on('change:foo', function ({ value }) {
                    assert.equal(value, 'baz');
                    done();
                });

                this.model.set({ foo: 'baz' });
            });

            it('should not emit `change` event when value is not changed', function () {
                return new Promise(resolve => {
                    setTimeout(resolve, 20);

                    this.model.on('change:foo', function () {
                        throw new Error('Expected not to emit `change` event');
                    });

                    this.model.set({ foo: 'bar' });
                });
            });

            it('should not emit `change` event when value is set with `option.silent` == true', function () {
                return new Promise(resolve => {
                    setTimeout(resolve, 20);

                    this.model.on('change:foo', function () {
                        throw new Error('Expected not to emit `change` event');
                    });

                    this.model.set({ foo: 'bar' }, { silent: true });
                });
            });
        });
    });
}