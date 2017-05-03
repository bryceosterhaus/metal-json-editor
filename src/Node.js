import Component, {Config} from 'metal-jsx';

import EditableValue from './EditableValue';
import Tree from './Tree';

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

    return array ? value.length : Object.keys(value).length;
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
      typeColors,
      value
    } = this.props;

    const expanded = expandedNodes.has(value);

    const readOnly =
      value !== undefined && value !== null && value.__metal_devtools_read_only;

    const displayAsObj = value instanceof Object && !readOnly;

    return (
      <li>
        <div>
          <span
            onClick={this.handleExpand.bind(this)}
            style={displayAsObj ? 'cursor: pointer;' : ''}
          >
            {`${name}: `}
          </span>

          {!displayAsObj &&
            <EditableValue
              locator={locator}
              name={name}
              onChange={onChange}
              readOnly={readOnly}
              typeColors={typeColors}
              value={value}
            />}

          {displayAsObj &&
            <span>
              <span
                onClick={this.handleExpand.bind(this)}
                style="cursor: pointer;"
              >
                {arrowRenderer(expanded)}
              </span>

              {this.getBracket(value)}

              {!expanded && this.getSize(value)}

              {!expanded && this.getBracket(value, false)}
            </span>}

          {expanded &&
            displayAsObj &&
            <Tree
              arrowRenderer={arrowRenderer}
              data={value}
              expandedNodes={expandedNodes}
              locator={locator}
              onChange={onChange}
              onToggleExpand={this.props.onToggleExpand}
              typeColors={typeColors}
            />}

          {expanded && displayAsObj && this.getBracket(value, false)}
        </div>
      </li>
    );
  }
}

Node.PROPS = {
  arrowRenderer: Config.func().value(() => {}),
  expandedNodes: Config.instanceOf(WeakSet).required(),
  locator: Config.array().value([]),
  name: Config.string(),
  onChange: Config.func(),
  onToggleExpand: Config.func(),
  typeColors: Config.object(),
  value: Config.any()
};

export default Node;
