import {
  fireEvent,
  getByText,
  getByTestId,
  prettyDOM,
} from '@testing-library/react/pure';
import { EventType } from '@testing-library/react/pure';
import $ from 'jquery';
import { getJQueryContainer } from './render';

export type Selector = string | HTMLElement | JQuery;

export type FireObject = {
  [E in EventType]: (selector: Selector, options?: {}) => void;
};

/**
 * fireEvent from @testing-library/react that also accepts jQuery collections.
 *
 * @see https://testing-library.com/docs/dom-testing-library/api-events#fireevent-eventname
 *
 * @example
 * $fireEvent.click('button') // CSS selector
 * $fireEvent.click($component.find('button.primary')) // jQuery element
 * $fireEvent.click($component.find('button')[2]) // DOM element
 */
export const $fireEvent: FireObject = Object.keys(fireEvent).reduce(
  (acc, key) => {
    const event = key as EventType;

    acc[event] = (selector: Selector, options?: {}) => {
      fireEvent[event](getDOMElement(selector), options);
    };

    return acc;
  },
  {} as FireObject
);

/**
 * Simulate a left click. Can be used to toggle checkboxes/radios.
 *
 * @param selector If it's a string, the first element identified
 *   by this will receive the event. If it's a jQuery collection
 *   then the first element in it will receive the event.
 *
 * @deprecated Please use $click instead.
 *
 * @example
 * click('button')
 * click('input[type=checkbox]')
 * click('input[type=radio]')
 * click($component.find('button.primary'))
 * click($component.find('button')[2])
 */
export function click(selector: Selector) {
  fireEvent.click(getDOMElement(selector));
}
export const $click = click;

/**
 * Simulate a change event.
 *
 * @param selector If it's a string, the first element identified
 *   by this will receive the event. If it's a jQuery collection
 *   then the first element in it will receive the event.
 * @param value The entire value will be sent at once to the target.
 *
 * @deprecated Please use $change instead.
 *
 * @example
 * change('input', 'foobar')
 * change($component.find('input[type=password]'), 'foobar')
 * change($component.find('input')[2], 'foobar')
 */
export function change(selector: Selector, value: string) {
  fireEvent.change(getDOMElement(selector), { target: { value } });
}
export const $change = change;

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
 * @deprecated Please use $keyDown instead.
 *
 * @example
 * keyDown('input', 'a')
 * keyDown('input', 'A', 65)
 * keyDown('input', 'Enter', 13)
 */
export function keyDown(
  selector: Selector,
  key: string,
  keyCode: number = key.charCodeAt(0)
) {
  fireEvent.keyDown(getDOMElement(selector), {
    key,
    keyCode,
    charCode: keyCode,
    which: keyCode,
  });
}
export const $keyDown = keyDown;

/**
 * Find an element in the currently rendered component by its `data-testid` attribute.
 *
 * Only the first matching element is returned. If there are no matching elements
 * an error will be thrown.
 *
 * @example
 * $render(<button data-test="submit">Click me</button>);
 * $findByTestId('submit').text() === 'Click me'
 */
export function $getByTestId(id: string): JQuery {
  return $(getByTestId(getJQueryContainer()[0], id, {}));
}

/**
 * Find an element in the currently rendered component that contains the given text.
 *
 * The search is case sensitive.
 *
 * Only the first matching element is returned. If there are no matching elements
 * an error will be thrown.
 *
 * @example
 * $render(<button>Click me</button>);
 * $findByText('Click').text() === 'Click me'
 */
export function $getByText(contains: string): JQuery;
/**
 * Find an element in the currently rendered component that matches the given RegExp.
 *
 * Only the first matching element is returned. If there are no matching elements
 * an error will be thrown.
 *
 * @example
 * $render(<button>Click me</button>);
 * $findByText(/click/).text() === 'Click me'
 */
export function $getByText(matches: RegExp): JQuery;
export function $getByText(match: string | RegExp): JQuery {
  return $(getByText(getJQueryContainer()[0], match, { exact: false }));
}

export class NonExistentElement extends Error {
  constructor(selector: Selector) {
    let title: string;

    if (typeof selector === 'string') {
      title = `Couldn't find element ${selector}`;
    } else {
      title = `Couldn't find element`;
    }

    super(`${title}

Here is the state of your container:
${prettyDOM()}`);
  }
}

/**
 * Get the first element that matches the selector from the currently rendered component.
 */
function getDOMElement(selector: Selector): HTMLElement {
  let element: HTMLElement;

  if (typeof selector === 'string') {
    // eslint-disable-next-line prefer-destructuring
    element = getJQueryContainer().find(selector)[0];
  } else {
    // eslint-disable-next-line prefer-destructuring
    element = $(selector)[0];
  }

  if (!element) {
    throw new NonExistentElement(selector);
  }

  return element;
}
