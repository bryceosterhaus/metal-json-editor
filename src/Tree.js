import Component, {Config} from 'metal-jsx';

import Node from './Node';

class Tree extends Component {
  render() {
    const {
      arrowRenderer,
      data,
      expandedNodes,
      locator,
      onChange,
      onToggleExpand,
      typeColors
    } = this.props;

    return (
      <ul class="tree-container" style="list-style: none; margin: 0;">
        {Object.keys(data).map(key =>
          <Node
            arrowRenderer={arrowRenderer}
            expandedNodes={expandedNodes}
            locator={[...locator, key]}
            name={key}
            onChange={onChange}
            onToggleExpand={onToggleExpand}
            typeColors={typeColors}
            value={data[key]}
          />
        )}
      </ul>
    );
  }
}

Tree.PROPS = {
  arrowRenderer: Config.func().value(() => {}),
  data: Config.oneOfType([Config.array(), Config.object()]).value({}),
  expandedNodes: Config.instanceOf(WeakSet).required(),
  locator: Config.array().value([]),
  onChange: Config.func(),
  onToggleExpand: Config.func(),
  typeColors: Config.object()
};

export default Tree;
