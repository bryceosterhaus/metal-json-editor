import Component, {Config} from 'metal-jsx';

import Node from './Node';

class Tree extends Component {
	render() {
		const {arrowRenderer, data, locator, onChange} = this.props;

		return (
			<ul class="tree-container" style="list-style: none; margin: 0;">
				{
					Object.keys(data).map(
						key => (
							<Node
								arrowRenderer={arrowRenderer}
								locator={[...locator, key]}
								name={key}
								onChange={onChange}
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
	arrowRenderer: Config.func().value(() => {}),
	data: Config.oneOfType(
		[
			Config.array(),
			Config.object()
		]
	),
	onChange: Config.func(),
	locator: Config.array().value([])
};

export default Tree;