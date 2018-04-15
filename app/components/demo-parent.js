import React from 'react';
import PropTypes from 'prop-types';
import componentFactory from '../lib/componentFactory';
import LiveUpdater from './live-updater';
import DelayedUpdater from './delayed-updater';

function FnUpdater(props) {
  return (
    <div>
      <h2>Functional updating component</h2>
      Change: <input value={props.value} onChange={props.onChange} />
    </div>
  );
}

FnUpdater.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const DemoParent = componentFactory({
  state() {
    return {
      value: 'initial value'
    };
  },
  actions: {
    updateValue(value) {
      this.value = value.toString();
    },
    updateValueFromEvent(event) {
      // eslint-disable-next-line
      this.value = event.target.value.toString();
    }
  },
  render() {
    return (
      <div>
        <div>Current value: {this.value}</div>
        <LiveUpdater value={this.value} onChange={this.updateValue} />
        <DelayedUpdater value={this.value} onChange={this.updateValue} />
        <FnUpdater value={this.value} onChange={this.updateValueFromEvent} />
      </div>
    );
  }
});

export default DemoParent;
