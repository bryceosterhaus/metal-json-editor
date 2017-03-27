// @flow

import Component, {Config} from 'metal-jsx';

import Node from './Node';
import Tree from './Tree';
import {setIn} from './util';

interface Props {
	arrowRenderer: () => any;
	data: {};
	onChange: () => ({});
}

interface State {
	expandedNodes: WeakSet<*>
}

class JSONEditor extends Component<Props, State> {
	handleChange(locator: mixed[], value: ?any) {
		const {data, onChange} = this.props;

		onChange(
			setIn(data, locator, value)
		);
	}

	handleToggleExpand(value: {}) {
		const {expandedNodes} = this.state;

		if (expandedNodes.has(value)) {
			expandedNodes.delete(value);
		}
		else {
			expandedNodes.add(value);
		}

		this.state.expandedNodes = expandedNodes;
	}

	render() {
		const {arrowRenderer, data} = this.props;

		return (
			<Tree
				arrowRenderer={arrowRenderer}
				data={data}
				expandedNodes={this.state.expandedNodes}
				onChange={this.handleChange.bind(this)}
				onToggleExpand={this.handleToggleExpand.bind(this)}
			/>
		);
	}
}

JSONEditor.STATE = {
	expandedNodes: Config.value(new WeakSet())
};

JSONEditor.PROPS = {
	arrowRenderer: Config.value(() => {}),
	data: Config.value({}),
	onChange: {}
};

export default typeof JSONEditor;
