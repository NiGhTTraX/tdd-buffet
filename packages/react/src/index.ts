import $ from 'jquery';
import ReactDOM from 'react-dom';
import { ReactElement } from 'react';
import waitForExpect from 'wait-for-expect';
import { fireEvent } from '@testing-library/dom';

let componentContainer: HTMLDivElement;

function getJQueryContainer() {
  return $(componentContainer);
}

/**
 * Wait for a condition to be fulfilled.
 *
 * @param cb Receives the currently mounted component wrapped in JQuery and will
 *   wait for it until it either returns a truthy value or undefined.
 *   Returning a falsy value or throwing an exception will cause this
 *   to keep waiting.
 * @param timeout Time in ms to wait until condition is fulfilled.
 *
 * @example
 * ```
 * await wait(() => 1 === 1);
 * await wait(() => expect(1).to.equal(1))
 * await wait(() => { expect(1).to.equal(1); })
 * await wait($container => $container.text() === 'foobar');
 * ```
 */
export function wait(cb: ($container: JQuery) => any, timeout = 1500) {
  return waitForExpect(() => {
    const result = cb(getJQueryContainer());

    if (result !== undefined && !result) {
      throw new Error('Condition not met');
    }
  }, timeout);
}

/**
 * Render the given component in a freshly created DOM container.
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
    // Tidy up the document in case users want to inspect it.
    if (componentContainer) {
      document.body.removeChild(componentContainer);
    }

    componentContainer = document.createElement('div');
    document.body.appendChild(componentContainer);
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

/**
 * Simulate a left click.
 *
 * @param selector If it's a string, the first element identified
 *   by this will receive the event. If it's a jQuery collection
 *   then the first element in it will receive the event.
 *
 * @example
 * ```
 * click('button')
 * click($component.find('button.primary'))
 * click($component.find('button')[2])
 * ```
 */
export function click(selector: string | JQuery | HTMLElement) {
  fireEvent.click(getElement(selector));
}

/**
 * Simulate a change event.
 *
 * @param selector If it's a string, the first element identified
 *   by this will receive the event. If it's a jQuery collection
 *   then the first element in it will receive the event.
 * @param value The entire value will be sent at once to the target.
 *
 * @example
 * ```
 * change('input', 'foobar')
 * change($component.find('input[type=password]'), 'foobar')
 * change($component.find('input')[2], 'foobar')
 * ```
 */
export function change(selector: string | JQuery | HTMLElement, value: string) {
  fireEvent.change(getElement(selector), { target: { value } });
}

/**
 * Get the first element that matches the selector from the currently rendered component.
 */
function getElement(selector: string | JQuery | HTMLElement) {
  if (typeof selector === 'string') {
    return getJQueryContainer().find(selector)[0];
  }

  return $(selector)[0];
}
