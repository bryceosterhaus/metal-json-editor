import JSONEditor from '../JSONEditor';

describe('JSONEditor', () => {
  let component;

  afterEach(() => {
    if (component) {
      component.dispose();
    }
  });

  it('renders', () => {
    component = new JSONEditor();

    expect(component).toMatchSnapshot();
  });

  it('should call onChange', () => {
    const spy = jest.fn();

    component = new JSONEditor({
      data: {
        foo: 'bar'
      },
      onChange: spy
    });

    component.handleChange(['foo'], 'baz');

    expect(spy.mock.calls).toMatchSnapshot();
  });

  it('should set and remove expanded value from "expandedNodes"', () => {
    component = new JSONEditor();

    component.state.expandedNodes = new WeakSet();

    const obj = {foo: 'foo'};

    component.handleToggleExpand(obj);

    jest.runAllTimers();

    expect(component.state.expandedNodes.has(obj)).toMatchSnapshot();

    component.handleToggleExpand(obj);

    jest.runAllTimers();

    expect(component.state.expandedNodes.has(obj)).toMatchSnapshot();
  });
});
