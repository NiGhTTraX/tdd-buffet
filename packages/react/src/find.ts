import { getByTestId, getByText, prettyDOM } from '@testing-library/react/pure';
import $ from 'jquery';
import { getJQueryContainer } from './render';

export type Selector = string | HTMLElement | JQuery;

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
export function getDOMElement(selector: Selector): HTMLElement {
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
