import {setIn} from '../util';

describe('setIn', () => {
  it('should set value in object', () => {
    expect(setIn({foo: ''}, ['foo'], 'bar')).toMatchSnapshot();
  });

  it('should set nested value in object', () => {
    expect(setIn({foo: {bar: ''}}, ['foo', 'bar'], 'baz')).toMatchSnapshot();
  });

  it('should set value in array', () => {
    expect(setIn(['foo'], [0], 'baz')).toMatchSnapshot();
  });

  it('should return same value if not an object instance', () => {
    expect(setIn(1, [0], 'bar')).toMatchSnapshot();
  });
});
