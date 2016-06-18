import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../../app/components/App';

describe('App Component', () => {
  const wrapper = shallow(<App />);

  it('should exist', () => {
    expect(wrapper).to.exist;
  });
  
  it('should have one heading', () => {
    expect(wrapper.find('#heading').type()).to.equal('h2');
  });
});