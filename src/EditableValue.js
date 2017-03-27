// @flow

import Component, {Config} from 'metal-jsx';

import {TYPE_COLORS} from './util';

interface readOnlyType {
	__metal_devtools_read_only: ?boolean;
	value: ?any
};

interface Props {
	locator: mixed[];
	name: string;
	onChange: () => ({});
	readOnly: boolean;
	value: readOnlyType | any | null
}

interface State {
	editing: boolean
}

type BlurEvent = {
	target: {value: string}
};

class EditableValue extends Component<Props, State> {
	getTypeStyle(value): string {
		const {readOnly} = this.props;

		let type = '';

		if (value === null) {
			type = 'null';
		}
		else if (readOnly) {
			type = 'readOnly';
		}
		else {
			type = typeof value;
		}

		return `color: ${TYPE_COLORS[type]};`;
	}

	handleValueEdit() {
		if (!this.props.readOnly) {
			this.setState(
				{
					editing: true
				},
				this.refs.input.focus
			);
		}
	}

	submitValue({target}: BlurEvent) {
		const valType = typeof this.props.value;

		this.state.editing = false;

		let newVal = target.value;

		if (valType === 'boolean') {
			newVal = newVal === 'true' ? true : false;
		}
		else if (valType === 'number') {
			newVal = Number(newVal);
		}

		if (newVal !== this.props.value) {
			this.props.onChange(this.props.locator, newVal);
		}
	}

	render() {
		let {readOnly, value} = this.props;
		const {editing} = this.state;

		if (value && value.__metal_devtools_read_only) {
			value = value.value;
		}

		return (
			<span style={this.getTypeStyle(value)} onClick={this.handleValueEdit.bind(this)} title={readOnly ? 'Read Only': 'Click to Edit'}>
				{!editing && value !== undefined &&
					<span style="white-space: pre;">{String(value)}</span>
				}

				{!editing && (value === undefined || value === '') &&
					<span>
						""
					</span>
				}

				{editing &&
					<input ref="input" onBlur={this.submitValue.bind(this)} value={value} />
				}
			</span>
		);
	}
}

EditableValue.PROPS = {
	locator: {},
	name: {},
	onChange: {},
	readOnly: Config.value(false),
	value: {}
};

EditableValue.STATE = {
	editing: Config.value(false)
};

export default typeof EditableValue;
