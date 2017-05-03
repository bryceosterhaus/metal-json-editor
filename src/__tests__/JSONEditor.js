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

  it('renders with custom typeColors', () => {
    component = new JSONEditor({
      data: {
        bar: 1,
        baz: true,
        foo: 'bar'
      }
    });

    expect(component).toMatchSnapshot();

    const componentWithColors = new JSONEditor({
      data: {
        bar: 1,
        baz: true,
        foo: 'bar'
      },
      typeColors: {
        boolean: '#000',
        number: '#111',
        string: '#222'
      }
    });

    expect(componentWithColors).toMatchSnapshot();
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
