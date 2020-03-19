// eslint-disable-next-line max-classes-per-file
import React, { useEffect, useState } from 'react';
import createReactMock from 'react-mock-component';
import { expect } from 'tdd-buffet/expect/jest';
import { describe, it } from 'tdd-buffet/suite/node';
import { $render, $rerender, unmount } from '../src/render';

describe('$render', () => {
  it('should render a component', () => {
    const Component = createReactMock();

    $render(<Component />);

    expect(Component).toHaveBeenRendered();
  });

  it('should render a component built with hooks', () => {
    const HookyComponent = () => {
      const [effectTriggered, setEffectTriggered] = useState(false);
      useEffect(() => {
        setEffectTriggered(true);
      }, []);

      return (
        <button type="button">
          {effectTriggered ? 'effect triggered' : 'nope'}
        </button>
      );
    };

    const $component = $render(<HookyComponent />);

    expect($component.text()).toEqual('effect triggered');
  });

  it('should render a component with props', () => {
    const Component = createReactMock<{ foo: string }>();

    $render(<Component foo="bar" />);

    expect(Component).toHaveBeenRenderedWith({ foo: 'bar' });
  });

  it('should return a jquery element', () => {
    const $component = $render(<span>foobar</span>);

    expect($component.text()).toEqual('foobar');
  });

  it('should wrap the container, not the component', () => {
    const $component = $render(<span>foobar</span>);

    expect($component.html()).toEqual('<span>foobar</span>');
  });

  let rerendered;

  class Rerenderable extends React.Component {
    render() {
      return null;
    }

    componentDidUpdate() {
      rerendered = true;
    }
  }

  it('should re-render a component', () => {
    rerendered = false;

    $render(<Rerenderable />);
    $rerender(<Rerenderable />);

    expect(rerendered).toBeTruthy();
  });

  it('should recreate container', () => {
    rerendered = false;

    $render(<Rerenderable />);
    $render(<Rerenderable />);

    expect(rerendered).toBeFalsy();
  });

  it('should update the container', () => {
    const Foo = (props: { done?: boolean }) =>
      props.done ? <span>done</span> : null;

    const $component = $render(<Foo />);
    $rerender(<Foo done />);

    expect($component.text()).toEqual('done');
  });

  it('should wrap all children', () => {
    const Bar = () => (
      <>
        <p>1</p>
        <p>2</p>
      </>
    );

    const $component = $render(<Bar />);

    expect($component.text()).toEqual('12');
  });

  it('should unmount component', () => {
    let unmounted = false;

    class Unmountable extends React.Component {
      render() {
        return null;
      }

      componentWillUnmount() {
        unmounted = true;
      }
    }

    $render(<Unmountable />);
    unmount();

    expect(unmounted).toBeTruthy();
  });

  it('should recreate container after unmounting', () => {
    const $container = $render(<span>bar</span>);
    unmount();
    const $newContainer = $render(<span>baz</span>);

    expect($container.text()).toHaveLength(0);
    expect($newContainer.text()).toEqual('baz');
  });
});
