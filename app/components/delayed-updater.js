import React from 'react';
import PropTypes from 'prop-types';
import componentFactory from '../lib/componentFactory';

const DelayedUpdater = componentFactory({
  propTypes: {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  },
  state(props) {
    return {
      localValue: props.value,
      updatesSent: 0
    };
  },
  actions: {
    sendUpdate() {
      this.$props.onChange(this.localValue);
      this.updatesSent += 1;
    }
  },
  computed: {
    propVal() {
      return `${this.$props.value}`;
    },
    msg() {
      return `Prop value is ${this.propVal}`;
    }
  },
  watch: {
    propVal(newValue) {
      // eslint-disable-next-line
      console.debug("Value changed", newValue);
    }
  },
  willReceiveProps(newValue) {
    this.localValue = newValue.value;
  },
  render() {
    const updateLocal = (event) => {
      this.localValue = event.target.value;
    };

    return (
      <div>
        <h2>Delayed Updater</h2>
        <div>Updates sent: {this.updatesSent}</div>
        Value: <input value={this.localValue} onChange={updateLocal} />
        <button onClick={this.sendUpdate}>Send Update</button>
        <div>{this.msg}</div>
      </div>
    );
  }
});

export default DelayedUpdater;
