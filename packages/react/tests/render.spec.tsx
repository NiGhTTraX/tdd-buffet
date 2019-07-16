/* eslint-disable react/no-multi-comp */
import React from 'react';
import createReactMock from 'react-mock-component';
import { describe, expect, it } from '../../tdd-buffet/src/suite/node';
import { $render, unmount } from '../src';

describe('$render', () => {
  it('should render a component', () => {
    const Component = createReactMock();

    $render(<Component />);

    expect(Component.rendered).to.be.true;
  });

  it('should render a component with props', () => {
    const Component = createReactMock<{ foo: string }>();

    $render(<Component foo="bar" />);

    expect(Component.renderedWith({ foo: 'bar' })).to.be.true;
  });

  it('should return a jquery element', () => {
    const $component = $render(<span>foobar</span>);

    expect($component.text()).to.equal('foobar');
  });

  let rerendered;

  class Rerenderable extends React.Component {
    render() { return null; }

    componentDidUpdate() {
      rerendered = true;
    }
  }

  it('should re-render a component', () => {
    rerendered = false;

    $render(<Rerenderable />);
    $render(<Rerenderable />, true);

    expect(rerendered).to.be.true;
  });

  it('should recreate container', () => {
    rerendered = false;

    $render(<Rerenderable />);
    $render(<Rerenderable />, false);

    expect(rerendered).to.be.false;
  });

  it('should unmount component', () => {
    let unmounted = false;

    class Unmountable extends React.Component {
      render() { return null; }

      componentWillUnmount() {
        unmounted = true;
      }
    }

    $render(<Unmountable />);
    unmount();

    expect(unmounted).to.be.true;
  });
});
