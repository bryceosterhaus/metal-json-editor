'use strict';

import Component, {Config} from 'metal-jsx';

import Node from './Node';
import Tree from './Tree';
import {setIn} from './util';

class JSONEditor extends Component {
	handleChange(locator, value) {
		const {data, onChange} = this.props;

		onChange(
			setIn(data, locator, value)
		);
	}

	render() {
		const {arrowRenderer, data} = this.props;

		return (
			<Tree
				arrowRenderer={arrowRenderer}
				data={data}
				onChange={this.handleChange.bind(this)}
			/>
		);
	}
}

JSONEditor.PROPS = {
	arrowRenderer: Config.func().value(() => {}),
	data: Config.object().value({}),
	onChange: Config.func()
};

export default JSONEditor;