import Component, {Config} from 'metal-jsx';

import Tree from './Tree';
import EditableValue from './EditableValue';

class Node extends Component {
	getBracket(value, open = true) {
		const array = Array.isArray(value);

		let retVal = open ? '{' : '}';

		if (array) {
			retVal = open ? '[' : ']';
		}

		return retVal;
	}

	getSize(value) {
		const array = Array.isArray(value);

		return array ? value.length : Object.keys(value).length
	}

	handleExpand() {
		this.state.expanded = !this.state.expanded;
	}

	render() {
		const {
			props: {
				arrowRenderer,
				locator,
				name,
				onChange,
				value
			},
			state: {
				expanded
			}
		} = this;

		const readOnly = value !== undefined && value !== null && value.__metal_devtools_read_only;

		const displayAsObj = value instanceof Object && !readOnly;

		return (
			<li>
				<div>
					<span onClick={this.handleExpand.bind(this)} style={displayAsObj ? 'cursor: pointer;' : ''}>
						{`${name}: `}
					</span>

					{!displayAsObj &&
						<EditableValue
							locator={locator}
							name={name}
							onChange={onChange}
							value={value}
							readOnly={readOnly}
						/>
					}

					{displayAsObj &&
						<span>
							<span onClick={this.handleExpand.bind(this)} style="cursor: pointer;">
								{arrowRenderer(expanded)}
							</span>

							{this.getBracket(value)}

							{!expanded &&
								this.getSize(value)
							}

							{!expanded &&
								this.getBracket(value, false)
							}
						</span>
					}

					{expanded && displayAsObj &&
						<Tree
							arrowRenderer={arrowRenderer}
							data={value}
							locator={locator}
							onChange={onChange}
						/>
					}

					{expanded && displayAsObj &&
						this.getBracket(value, false)
					}
				</div>
			</li>
		);
	}
}

Node.PROPS = {
	arrowRenderer: Config.func().value(() => {}),
	locator: Config.array().value([]),
	name: Config.string(),
	onChange: Config.func(),
	value: Config.any()
};

Node.STATE = {
	expanded: Config.bool().value(false)
};

export default Node;