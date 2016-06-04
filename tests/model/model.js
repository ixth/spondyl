import Model from 'spondyl/model';

export default function () {
    describe('constructor', function() {
        it('should set attributes from params', function () {
            var model = new Model({ foo: 'bar' });

            chai.expect(model.get('foo')).to.equal('bar');
        });

        it('should invoke `initialize`', function (done) {
            new (class extends Model {
                initialize() {
                    done();
                }
            });
        });
    });
};