import { render as rtlRender } from '@testing-library/react/pure';
import $ from 'jquery';
import { ReactElement } from 'react';
import { act } from 'react-dom/test-utils';

let componentContainer: HTMLDivElement;
let rootUnmount: () => void;

export function getJQueryContainer() {
  return $(componentContainer);
}

function renderAndReturnContainer(element: ReactElement) {
  const { unmount } = rtlRender(element, {
    container: componentContainer,
  });

  rootUnmount = unmount;

  return getJQueryContainer();
}

function createContainer() {
  if (componentContainer) {
    try {
      document.body.removeChild(componentContainer);
    } catch (e) {
      /* istanbul ignore else because I don't want to simulate other exceptions */
      if (e instanceof DOMException && e.name === 'NotFoundError') {
        // The container might have been removed by other means e.g. mixing
        // tdd-buffet with RTL which auto-injects a cleanup function.
      } else {
        // Rethrow the error so the user can deal with it.
        throw e;
      }
    }
  }

  componentContainer = document.createElement('div');
  componentContainer.dataset.testid = '__tdd-buffet-container__';
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
  act(() => {
    if (!rootUnmount) {
      return;
    }

    rootUnmount();
  });
}
