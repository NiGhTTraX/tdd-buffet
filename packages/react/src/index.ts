import $ from 'jquery';
import ReactDOM from 'react-dom';
import { ReactElement } from 'react';
import { waitForElement } from '@testing-library/dom';

let componentContainer: HTMLDivElement;

function getJQueryContainer() {
  return $(componentContainer).children().eq(0);
}

/**
 * Wait for a condition to be fulfilled.
 *
 * @param cb Receives the currently mounted component wrapped in JQuery and will
 *   wait for it until it returns a truthy value.
 * @param timeout Time in ms to wait until condition is fulfilled.
 */
export function wait(cb: ($container: JQuery) => any, timeout = 1500) {
  return waitForElement(() => cb(getJQueryContainer()), {
    container: componentContainer,
    timeout
  });
}

/**
 * Render the given component in a freshly created detached DOM container.
 *
 * @param element
 * @param rerender If `true` the target DOM container won't be cleared before rendering.
 *   Useful for sending new props to an already rendered component.
 *
 * @example
 * ```
 * $render(<span>foobar<span>);
 * ```
 *
 * @example
 * ```
 * $render(<MyComponent foo="bar" />);
 * $render(<MyComponent foo="baz" />, true); // will cause the component to receive new props
 * ```
 */
export function $render(element: ReactElement<any>, rerender = false): JQuery {
  if (!rerender) {
    componentContainer = document.createElement('div');
  }

  ReactDOM.render(element, componentContainer);

  return getJQueryContainer();
}

/**
 * Unmount the currently mounted component.
 *
 * If there's no mounted component nothing will happen.
 */
export function unmount() {
  ReactDOM.unmountComponentAtNode(componentContainer);
}
