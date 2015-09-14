import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

export default class RenderedTestComponent {
  constructor(component) {
    this.component = TestUtils.renderIntoDocument(component);
    this.$element = $(ReactDOM.findDOMNode(this.component));
  }

  elementType() {
    return this.$element.get(0).tagName.toLowerCase();
  }
}
