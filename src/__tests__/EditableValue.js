import EditableValue from '../EditableValue';

describe(
	'EditableValue',
	() => {
		let component;

		afterEach(
			() => {
				if (component) {
					component.dispose();
				}
			}
		);

		it(
			'renders',
			() => {
				component = new EditableValue();

				expect(component).toMatchSnapshot();
			}
		);

		it(
			'should render with editing enabled',
			() => {
				component = new EditableValue(
					{
						value: 1
					}
				);

				component.state.editing = true;

				jest.runAllTimers();

				expect(component).toMatchSnapshot();
			}
		);

		it(
			'should return color value',
			() => {
				component = new EditableValue();

				expect(component.getTypeStyle('')).toMatchSnapshot();
				expect(component.getTypeStyle(null)).toMatchSnapshot();
				expect(component.getTypeStyle(3)).toMatchSnapshot();

				component.props.readOnly = true;

				expect(component.getTypeStyle('Function()')).toMatchSnapshot();
			}
		);

		it(
			'should update state',
			() => {
				component = new EditableValue();

				component.refs.input = {
					focus: jest.fn()
				};

				component.handleValueEdit();

				jest.runAllTimers();

				expect(component.state).toMatchSnapshot();
			}
		);

		it(
			'should call onChange with new number value',
			() => {
				const spy = jest.fn();

				component = new EditableValue(
					{
						onChange: spy,
						value: 1
					}
				);

				component.submitValue(
					{
						target: {value: 2}
					}
				);

				jest.runAllTimers();

				expect(spy).toHaveBeenCalledTimes(1);
				expect(component.state).toMatchSnapshot();

				component.props.value = true;

				component.submitValue(
					{
						target: {value: 'false'}
					}
				);

				jest.runAllTimers();

				expect(spy).toHaveBeenCalledTimes(2);
				expect(component.state).toMatchSnapshot();

				component.props.value = false;

				component.submitValue(
					{
						target: {value: 'true'}
					}
				);

				jest.runAllTimers();

				expect(spy).toHaveBeenCalledTimes(3);
				expect(component.state).toMatchSnapshot();
			}
		);

		it(
			'should render in readOnly mode',
			() => {
				component = new EditableValue(
					{
						readOnly: true,
						value: {
							__metal_devtools_read_only: true,
							value: 'Function()'
						}
					}
				);

				expect(component).toMatchSnapshot();
			}
		);
	}
);
