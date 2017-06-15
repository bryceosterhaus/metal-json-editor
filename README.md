# metal-json-editor
[![Build Status](https://travis-ci.org/bryceosterhaus/metal-json-editor.svg?branch=master)](https://travis-ci.org/bryceosterhaus/metal-json-editor)
[![npm](https://img.shields.io/npm/dm/metal-json-editor.svg)](https://www.npmjs.com/package/metal-json-editor)
[![npm](https://img.shields.io/npm/v/metal-json-editor.svg)](https://www.npmjs.com/package/metal-json-editor)

Metal JSX component used to edit json objects

## Installation

`npm install --save metal-json-editor`

## Usage

```js
render() {
  return (
    <JSONEditor
      arrowRenderer={}
      data={}
      onChange={}
      typeColors={}
    />
  );
}
```

| Property | Type | Description | Default |
| -------- | ---- | ----------- | ------- |
| **arrowRenderer** | func | Renders arrows for each row | `() => {}` |
| **data** | object | Data that is rendered in tree | `{}` |
| **onChange** | func | Callback when data in tree changes. Returns all data | `undefined` |
| **typeColors** | object | Overrides default colors for value types | `{boolean: '#AA0D91',null: '#FF8C00',  number: '#1C00CF',  readOnly: '#117700',  string: '#C41A16'}` |
