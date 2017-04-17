import Tree from '../Tree';

describe('Tree', () => {
	let component;

	afterEach(() => {
		if (component) {
			component.dispose();
		}
	});

	it('renders', () => {
		component = new Tree({
			data: {
				one: 2,
				three: 'four'
			},
			expandedNodes: new WeakSet()
		});

		expect(component).toMatchSnapshot();
	});
});
