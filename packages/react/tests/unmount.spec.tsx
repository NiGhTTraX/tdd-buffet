import React, { useEffect } from 'react';
import { $render, $unmount } from '../src/render';

describe('unmount', () => {
  // This test needs to be first.
  it('should not blow up if unmounting nothing', () => {
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
