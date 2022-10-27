import React, { useEffect } from 'react';
import { expect } from 'tdd-buffet/expect/jest';
import { it } from 'tdd-buffet/suite/node';
import { $render, $unmount } from '../src/render';

describe('unmount', () => {
  // This test needs to be first
  it('should no-op if there is nothing to unmount', () => {
    $unmount();
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
    $unmount();

    expect(unmounted).toBeTruthy();
  });

  it('should recreate container after unmounting', () => {
    const $container = $render(<span>bar</span>);
    $unmount();
    const $newContainer = $render(<span>baz</span>);

    expect($container.text()).toHaveLength(0);
    expect($newContainer.text()).toEqual('baz');
  });

  it('should cleanup after unmounting', () => {
    let flushed = false;

    const Foo = () => {
      useEffect(() => () => {
        flushed = true;
      });

      return null;
    };

    $render(<Foo />);
    $unmount();

    expect(flushed).toBeTruthy();
  });
});
