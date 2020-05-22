import { render as rtlRender } from '@testing-library/react/pure';
import $ from 'jquery';
import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

let componentContainer: HTMLDivElement;

export function getJQueryContainer() {
  return $(componentContainer);
}

function renderAndReturnContainer(element: ReactElement) {
  rtlRender(element, {
    container: componentContainer,
  });

  return getJQueryContainer();
}

function createContainer() {
  if (componentContainer) {
    document.body.removeChild(componentContainer);
  }

  componentContainer = document.createElement('div');
  document.body.appendChild(componentContainer);
}

/**
 * Render the given component in a freshly created DOM container.
 *
 * @returns A jQuery wrapper over the container (not the component itself).
 *
 * @example
 * const $container = $render(<span>foobar<span>);
 * console.log($container.text()) // foobar
 * console.log($container.html()) // <span>foobar</span>
 */
export function $render(element: ReactElement): JQuery {
  createContainer();

  return renderAndReturnContainer(element);
}

/**
 * Render the same component with different props.
 *
 * @example
 * $render(<MyComponent foo="bar" />);
 * $rerender(<MyComponent foo="potato" />);
 */
export function $rerender(element: ReactElement): JQuery {
  return renderAndReturnContainer(element);
}

/**
 * Unmount the currently mounted component.
 *
 * If there's no mounted component nothing will happen.
 */
export function $unmount() {
  ReactDOM.unmountComponentAtNode(componentContainer);
}
