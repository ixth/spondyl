import Model from 'spondyl/model';

export default function () {
    describe('#unset', function () {
        it('should properly unset attributes', function () {
            this.model = new Model({ foo: null });

            this.model.unset('foo');

            chai.expect(this.model.get('foo')).to.be.undefined;
        });

        describe('', function () {
            beforeEach(function () {
                this.model = new Model({ foo: 'bar' });
            });

            it('should emit `change` event', function () {
                return new Promise(resolve => {
                    this.model.on('change:foo', resolve);

                    this.model.unset('foo');
                });
            });

            it('should pass proper value to `change` event', function () {
                return new Promise(resolve => {
                    this.model.on('change:foo', ({ model, value }) => {
                        chai.expect(value).to.be.undefined;
                        chai.expect(value).to.be.equal(model.get('foo'));
                        resolve();
                    });

                    this.model.unset('foo');
                });
            });

            it('should not emit `change` event when value is not changed', function () {
                this.model = new Model({});

                return new Promise(resolve => {
                    setTimeout(resolve, 20);

                    this.model.on('change:foo', () => {
                        throw new Error('Expected not to emit `change` event');
                    });

                    this.model.unset('foo');
                });
            });

            it('should not emit `change` event when value is set with `option.silent` == true', function () {
                this.model = new Model({ foo: null });

                return new Promise(resolve => {
                    setTimeout(resolve, 20);

                    this.model.on('change:foo', () => {
                        throw new Error('Expected not to emit `change` event');
                    });

                    this.model.unset('foo', { silent: true });
                });
            });
        });
    });
}