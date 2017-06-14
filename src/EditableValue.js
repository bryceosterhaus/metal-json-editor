import Component, {Config} from 'metal-jsx';

import {TYPE_COLORS} from './util';

class EditableValue extends Component {
  created() {
    this._firstRender = true;
  }

  addFlash() {
    this.element.classList.add('flash');

    this.removeFlash();
  }

  removeFlash() {
    setTimeout(() => {
      this.element.classList.remove('flash');
    }, 100);
  }

  getTypeStyle(value) {
    const {readOnly, typeColors = {}} = this.props;

    let type = '';

    if (value === null) {
      type = 'null';
    } else if (readOnly) {
      type = 'readOnly';
    } else {
      type = typeof value;
    }

    const colorMap = {
      ...TYPE_COLORS,
      ...typeColors
    };

    return `color: ${colorMap[type]};`;
  }

  handleValueEdit() {
    if (!this.props.readOnly) {
      this.setState(
        {
          editing: true
        },
        () => this.refs.input.focus()
      );
    }
  }

  submitValue({target}) {
    const valType = typeof this.props.value;

    this.state.editing = false;

    let newVal = target.value;

    if (valType === 'boolean') {
      newVal = newVal === 'true' ? true : false;
    } else if (valType === 'number') {
      newVal = Number(newVal);
    }

    if (newVal !== this.props.value) {
      this.props.onChange(this.props.locator, newVal);
    }
  }

  syncValue(newVal, oldVal) {
    if (!this._firstRender && newVal !== oldVal) {
      this.addFlash();
    } else {
      this._firstRender = false;
    }
  }

  render() {
    const {readOnly, value} = this.props;
    const {editing} = this.state;

    let retVal = value;

    if (retVal && retVal.__metal_devtools_read_only) {
      retVal = value.value;
    }

    return (
      <span
        class="json-editor-value"
        onClick={this.handleValueEdit.bind(this)}
        style={this.getTypeStyle(retVal)}
        title={readOnly ? 'Read Only' : 'Click to Edit'}
      >
        {!editing &&
          retVal !== undefined &&
          <span style="white-space: pre;">{retVal + ''}</span>}

        {!editing &&
          (retVal === undefined || retVal === '') &&
          <span>
            ""
          </span>}

        {editing &&
          <input
            onBlur={this.submitValue.bind(this)}
            ref="input"
            value={retVal}
          />}
      </span>
    );
  }
}

EditableValue.PROPS = {
  name: Config.string(),
  onChange: Config.func(),
  readOnly: Config.bool().value(false),
  typeColors: Config.object(),
  value: Config.any()
};

EditableValue.STATE = {
  editing: Config.value(false)
};

export default EditableValue;
