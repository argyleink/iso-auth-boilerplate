'use strict';
import React, {Component} from 'react';
const debug = require('debug')('Component:Checkbox');
debug();


export default class Checkbox extends Component {

  static displayName = 'Checkbox'

  render() {
    let input;
    if (this.props.label) {
      input = (
        <label htmlFor={`checkbox-${this.props.inputKey}`}>
          <input
            id={`checkbox-${this.props.inputKey}`}
            checked="false"
            {...this.props}
            onChange={this.props.onChangeCallback}
            type="checkbox"
          />
          {this.props.label}
        </label>
      );
    } else {
      input = (
        <input
          id={this.props.inputKey}
          checked={this.props.value}
          {...this.props}
          onChange={this.props.onChangeCallback}
          type="checkbox"
        />
      );
    }
    return input;
  }
}
