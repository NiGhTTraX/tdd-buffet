import { EventType, fireEvent } from '@testing-library/react/pure';
import { getDOMElement, Selector } from './find';

export type FireObject = {
  [E in EventType]: (selector: Selector, options?: object) => void;
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

    acc[event] = (selector: Selector, options?: object) => {
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
 * @example
 * click('button')
 * click('input[type=checkbox]')
 * click('input[type=radio]')
 * click($component.find('button.primary'))
 * click($component.find('button')[2])
 */
export function $click(selector: Selector) {
  fireEvent.click(getDOMElement(selector));
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
 * change('input', 'foobar')
 * change($component.find('input[type=password]'), 'foobar')
 * change($component.find('input')[2], 'foobar')
 */
export function $change(selector: Selector, value: string) {
  fireEvent.change(getDOMElement(selector), { target: { value } });
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
 * keyDown('input', 'a')
 * keyDown('input', 'A', 65)
 * keyDown('input', 'Enter', 13)
 */
export function $keyDown(
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

/**
 * Submit a form.
 *
 * You can fire the event on a form or on a linked submit button. The
 * submit button either has to be inside the `<form>` element, or linked
 * to it via the `form` attribute.
 *
 * @param selector If it's a string, the first element identified
 *   by this will receive the event. If it's a jQuery collection
 *   then the first element in it will receive the event.
 *
 * @example
 * $render(<form onSubmit={() => {}} />);
 * $submit('form')
 *
 * @example
 * $render(<form onSubmit={() => {}}>
 *   <button>Submit</button>
 * </form>);
 * $submit('button');
 *
 * @example
 * $render(<>
 *   <form id="my-form" onSubmit={() => {}} />
 *   <button form="my-form">Submit</button>
 * </>);
 * $submit('button');
 */
export function $submit(selector: Selector) {
  let element = getDOMElement(selector);

  // If this is a button linked to a form then fire the event
  // on the linked form.
  if (element.getAttribute('form')) {
    element = getDOMElement(`#${element.getAttribute('form')}`);
  }

  fireEvent.submit(element);
}
