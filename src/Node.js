// @flow

import Component, {Config} from 'metal-jsx';

import Tree from './Tree';
import EditableValue from './EditableValue';

type ReadOnly = {
	__metal_devtools_read_only: boolean;
}

interface Props {
	arrowRenderer: (val: boolean) => ?any;
	data: ({} | []);
	expandedNodes: WeakSet<*>;
	locator: mixed[];
	name: string;
	onChange: () => ({});
	onToggleExpand: () => ?any;
	value: ReadOnly | ?any;
}

type ArrOrObj = [] | {};

class Node extends Component<Props, {}> {
	getBracket(value: ArrOrObj, open: boolean = true): string {
		const array = Array.isArray(value);

		let retVal = open ? '{' : '}';

		if (array) {
			retVal = open ? '[' : ']';
		}

		return retVal;
	}

	getSize(value: ArrOrObj): number {
		const array = Array.isArray(value);

		return array ? value.length : Object.keys(value).length
	}

	handleExpand() {
		this.props.onToggleExpand(this.props.value);
	}

	render() {
		const {
			arrowRenderer,
			expandedNodes,
			locator,
			name,
			onChange,
			value
		} = this.props;

		const expanded = expandedNodes.has(value);

		const readOnly = typeof value === "object" && value !== null && value.__metal_devtools_read_only;

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
							expandedNodes={expandedNodes}
							locator={locator}
							onChange={onChange}
							onToggleExpand={this.props.onToggleExpand}
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
	arrowRenderer: Config.value(() => {}),
	expandedNodes: Config.required(),
	locator: Config.value([]),
	name: {},
	onChange: {},
	onToggleExpand: {},
	value: {}
};

export default typeof Node;
