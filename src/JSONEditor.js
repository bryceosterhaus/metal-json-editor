'use strict';

import Component, {Config} from 'metal-jsx';

import Tree from './Tree';
import {setIn} from './util';

class JSONEditor extends Component {
  handleChange(locator, value) {
    const {data, onChange} = this.props;

    onChange(setIn(data, locator, value));
  }

  handleToggleExpand(value) {
    const {expandedNodes} = this.state;

    if (expandedNodes.has(value)) {
      expandedNodes.delete(value);
    } else {
      expandedNodes.add(value);
    }

    this.state.expandedNodes = expandedNodes;
  }

  render() {
    const {arrowRenderer, data, typeColors} = this.props;

    return (
      <Tree
        arrowRenderer={arrowRenderer}
        data={data}
        expandedNodes={this.state.expandedNodes}
        onChange={this.handleChange.bind(this)}
        onToggleExpand={this.handleToggleExpand.bind(this)}
        typeColors={typeColors}
      />
    );
  }
}

JSONEditor.STATE = {
  expandedNodes: Config.instanceOf(WeakSet).value(new WeakSet())
};

JSONEditor.PROPS = {
  arrowRenderer: Config.func().value(() => {}),
  data: Config.object().value({}),
  onChange: Config.func(),
  typeColors: Config.object()
};

export default JSONEditor;
