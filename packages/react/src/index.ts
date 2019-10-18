import { fireEvent, wait as rtlWait } from '@testing-library/react';
import $ from 'jquery';
import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

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
export function wait(cb: ($container: JQuery<HTMLElement>) => any, timeout = 1500) {
  return rtlWait(() => {
    const result = cb(getJQueryContainer());

    if (result !== undefined && !result) {
      throw new Error('Condition not met');
    }
  }, { timeout });
}

/**
 * Render the given component in a freshly created DOM container.
 *
 * @returns A jQuery wrapper over the container (not the component itself).
 *
 * @example
 * ```
 * const $container = $render(<span>foobar<span>);
 * console.log($container.text()) // foobar
 * console.log($container.html()) // <span>foobar</span>
 * ```
 */
export function $render(element: ReactElement<any>): JQuery<HTMLElement> {
  if (componentContainer) {
    document.body.removeChild(componentContainer);
  }

  componentContainer = document.createElement('div');
  document.body.appendChild(componentContainer);

  act(() => {
    ReactDOM.render(element, componentContainer);
  });

  return getJQueryContainer();
}

/**
 * Render the same component with different props.
 *
 * @example
 * ```
 * $render(<MyComponent foo="bar" />);
 * $rerender(<MyComponent foo="potato" />);
 */
export function $rerender(element: ReactElement<any>): JQuery<HTMLElement> {
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

export type Selector = string | HTMLElement | JQuery<HTMLElement>;

/**
 * Simulate a left click. Can be used to toggle checkboxes/radios.
 *
 * @param selector If it's a string, the first element identified
 *   by this will receive the event. If it's a jQuery collection
 *   then the first element in it will receive the event.
 *
 * @example
 * ```
 * click('button')
 * click('input[type=checkbox]')
 * click('input[type=radio]')
 * click($component.find('button.primary'))
 * click($component.find('button')[2])
 * ```
 */
export function click(selector: Selector) {
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
export function change(selector: Selector, value: string) {
  fireEvent.change(getElement(selector), { target: { value } });
}

/**
 * Simulate a keyDown event.
 *
 * @param selector If it's a string, the first element identified
 *   by this will receive the event. If it's a jQuery collection
 *   then the first element in it will receive the event.
 * @param key See `key` from https://keycode.info/.
 * @param keyCode See `which` from https://keycode.info/. If not provided
 *   it will default to the char code for the first char in `key`.
 *
 * @example
 * ```
 * keyDown('input', 'a')
 * keyDown('input', 'A', 65)
 * keyDown('input', 'Enter', 13)
 * ```
 */
export function keyDown(
  selector: Selector,
  key: string,
  keyCode: number = key.charCodeAt(0)
) {
  fireEvent.keyDown(getElement(selector), {
    key,
    keyCode,
    charCode: keyCode,
    which: keyCode
  });
}

/**
 * Get the first element that matches the selector from the currently rendered component.
 */
function getElement(selector: Selector) {
  let element: HTMLElement;

  if (typeof selector === 'string') {
    // eslint-disable-next-line prefer-destructuring
    element = getJQueryContainer().find(selector)[0];
  } else {
    // eslint-disable-next-line prefer-destructuring
    element = $(selector)[0];
  }

  if (!element) {
    throw new Error('Element does not exist');
  }

  return element;
}
