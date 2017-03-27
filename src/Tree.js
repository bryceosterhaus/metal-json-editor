// @flow

import Component, {Config} from 'metal-jsx';

import Node from './Node';

interface Props {
	arrowRenderer: () => any;
	data: {};
	expandedNodes: WeakSet<*>;
	locator: mixed[];
	onChange: () => ({});
	onToggleExpand: () => any;
}

class Tree extends Component<Props, {}> {
	render() {
		const {
			arrowRenderer,
			data,
			expandedNodes,
			locator,
			onChange,
			onToggleExpand
		} = this.props;

		return (
			<ul class="tree-container" style="list-style: none; margin: 0;">
				{
					Object.keys(data).map(
						(key: string) => (
							<Node
								arrowRenderer={arrowRenderer}
								expandedNodes={expandedNodes}
								locator={[...locator, key]}
								name={key}
								onChange={onChange}
								onToggleExpand={onToggleExpand}
								value={data[key]}
							/>
						)
					)
				}
			</ul>
		);
	}
}

Tree.PROPS = {
	arrowRenderer: Config.value(() => {}),
	data: {},
	expandedNodes: Config.required(),
	onChange: {},
	onToggleExpand: {},
	locator: Config.value([])
};

export default typeof Tree;
