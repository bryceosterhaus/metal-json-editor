import Node from '../Node';

describe('Node', () => {
  let component;

  afterEach(() => {
    if (component) {
      component.dispose();
    }
  });

  it('renders', () => {
    component = new Node({expandedNodes: new WeakSet()});

    expect(component).toMatchSnapshot();
  });

  it('should return the proper bracket', () => {
    component = new Node({expandedNodes: new WeakSet()});

    expect(component.getBracket([])).toMatchSnapshot();
    expect(component.getBracket([], false)).toMatchSnapshot();

    expect(component.getBracket({})).toMatchSnapshot();
    expect(component.getBracket({}, false)).toMatchSnapshot();
  });

  it('should return the size of the object or array', () => {
    component = new Node({expandedNodes: new WeakSet()});

    expect(component.getSize({one: 1, two: 2})).toMatchSnapshot();
    expect(component.getSize([1, 2, 3])).toMatchSnapshot();
  });

  it('should call onToggleExpand prop', () => {
    const spy = jest.fn();
    const value = 123;

    component = new Node({
      expandedNodes: new WeakSet(),
      onToggleExpand: spy,
      value
    });

    component.handleExpand();

    expect(spy).toHaveBeenCalledWith(value);
  });
});
