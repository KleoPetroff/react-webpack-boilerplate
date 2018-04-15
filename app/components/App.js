import React from 'react';
import PropTypes from 'prop-types';
import img from '../assets/images/react_logo_512x512.png';
import componentFactory from '../lib/componentFactory';
import DemoParent from './demo-parent';

const Obj = componentFactory({
  propTypes: {
    bar: PropTypes.string
  },
  state() {
    return {
      foo: 1
    };
  },
  actions: {
    increment() {
      this.foo += 1;
    }
  },
  computed: {
    unfoo() {
      return `${10 - this.foo}/${this.$props.bar}`;
    }
  },
  willMount() {
    // eslint-disable-next-line
    console.debug("Mounting");
  },
  didMount() {
    // eslint-disable-next-line
    console.debug("Mounted", this.$el);
  },
  watch: {
    unfoo(newValue) {
      // eslint-disable-next-line
      console.debug("Unfoo is now", newValue);
    }
  },
  render() {
    return (
      <button
        data-el-id={this.$elId}
        type="button"
        onClick={this.increment}
      >
        {this.foo} and {this.$props.bar} and {this.unfoo}
      </button>
    );
  }
});

const App = () => (
  <div>
    <DemoParent />
    <Obj bar="1" />
    <Obj bar="2" />
    <Obj bar="bar3" />
    <h2 id="heading">Hello ReactJS</h2>
    <img
      className="image"
      style={{ margin: '0.5em' }}
      height="40"
      width="40"
      src={img}
      alt="React Logo"
    />
  </div>
);

export default App;
