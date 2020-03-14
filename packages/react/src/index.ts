import {
  EventType,
  fireEvent as rtlFireEvent
} from '@testing-library/react/pure';
import $ from 'jquery';
import { getJQueryContainer } from './render';

export { $ };

export * from './wait';
export * from './render';

export type Selector = string | HTMLElement | JQuery;

type FireObject = {
  [E in EventType]: (selector: Selector, options?: {}) => void;
};

/**
 * @testing-library/react's fireEvent.
 *
 * @see https://testing-library.com/docs/dom-testing-library/api-events#fireevent-eventname
 */
export const $fireEvent: FireObject = Object.keys(rtlFireEvent).reduce(
  (acc, key) => {
    const event = key as EventType;

    acc[event] = (selector: Selector, options?: {}) => {
      rtlFireEvent[event](getElement(selector), options);
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
  rtlFireEvent.click(getElement(selector));
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
  rtlFireEvent.change(getElement(selector), { target: { value } });
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
  rtlFireEvent.keyDown(getElement(selector), {
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
