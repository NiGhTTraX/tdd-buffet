import {
  getAllByTestId,
  getByTestId,
  getByText,
  prettyDOM,
  queryByTestId,
  queryByText,
} from '@testing-library/react/pure';
import $ from 'jquery';
import { OptionsReceived } from 'pretty-format';
import { getJQueryContainer } from './render';

export type Selector = string | HTMLElement | JQuery;

/**
 * Find an element in the currently rendered component by its `data-testid` attribute.
 *
 * @returns Only the first matching element is returned.
 *
 * @throws If there are no matching elements an error will be thrown.
 *
 * @see $getAllByTestId Use the `getAll` variant if you want to match
 *   multiple elements.
 * @see $queryByTestId Use the `query` variant if you want to check
 *   that an element is not rendered.
 *
 * @example
 * $render(<button data-test="submit">Click me</button>);
 * $getByTestId('submit').text() === 'Click me'
 */
export function $getByTestId(id: string): JQuery {
  return $(getByTestId(getJQueryContainer()[0], id, {}));
}

/**
 * Find all the elements in the currently rendered component that match
 * the given `data-testid` attribute.
 *
 * @throws If there are no matching elements an error will be thrown.
 *
 * @see $getByTestId Use the `get` variant if you're looking for a single element.
 * @see $queryByTestId Use the `query` variant if you want to check
 *   that an element is not rendered.
 *
 * @example
 * $render(<button data-test="submit">Click me</button>);
 * $getAllByTestId('submit').length === 1
 */
export function $getAllByTestId(id: string): JQuery {
  return $(getAllByTestId(getJQueryContainer()[0], id, {}));
}

/**
 * Find a single element in the currently rendered component that matches
 * the given `data-testid` attribute.
 *
 * @returns If there are no matching elements `null` will be returned.
 *
 * @throws Will throw if multiple elements match.
 *
 * @see $getByTestId Use the `get` variant if you're looking for a single element.
 * @see $getAllByTestId Use the `getAll` variant if you want to match
 *   multiple elements.
 *
 * @example
 * $render(<button data-test="submit">Click me</button>);
 * $getAllByTestId('submit').length === 1
 */
export function $queryByTestId(id: string): JQuery | null {
  const elements = queryByTestId(getJQueryContainer()[0], id, {});

  if (!elements) {
    return null;
  }

  return $(elements);
}

/**
 * Find an element in the currently rendered component that contains the given text.
 *
 * @param contains A substring to look for. The search is case **insensitive**.
 *
 * @throws Will throw if multiple elements match, or if no element matches.
 *
 * @example
 * $render(<button>Click me</button>);
 * $getByText('Click').text() === 'Click me'
 */
export function $getByText(contains: string): JQuery;
/**
 * Find an element in the currently rendered component that matches the given RegExp.
 *
 * @param matches A regular expression.
 *
 * @throws Will throw if multiple elements match, or if no element matches.
 *
 * @example
 * $render(<button>Click me</button>);
 * $getByText(/click/).text() === 'Click me'
 */
export function $getByText(matches: RegExp): JQuery;
export function $getByText(match: string | RegExp): JQuery {
  return $(getByText(getJQueryContainer()[0], match, { exact: false }));
}

/**
 * Find an element in the currently rendered component that contains the given text.
 *
 * @param contains A substring to look for. The search is case **insensitive**.
 *
 * @returns If there are no matching elements `null` will be returned.
 *
 * @throws Will throw if multiple elements match.
 *
 * @example
 * $render(<button>Click me</button>);
 * $queryByText('Click').text() === 'Click me'
 */
export function $queryByText(contains: string): JQuery | null;
/**
 * Find an element in the currently rendered component that matches the given RegExp.
 *
 * @param matches A regular expression.
 *
 * @returns If there are no matching elements `null` will be returned.
 *
 * @throws Will throw if multiple elements match.
 *
 * @example
 * $render(<button>Click me</button>);
 * $queryByText(/click/).text() === 'Click me'
 */
export function $queryByText(matches: RegExp): JQuery | null;
export function $queryByText(match: string | RegExp): JQuery | null {
  const element = queryByText(getJQueryContainer()[0], match, { exact: false });

  if (!element) {
    return null;
  }
  return $(element);
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
 * jQuery's `find` method bound on the container.
 *
 * @see https://api.jquery.com/find/
 *
 * @example
 * $render(<span id="text">some text</span>);
 * console.log($find('#text').text()); // some text
 */
export function $find(selector: Selector): JQuery {
  return getJQueryContainer().find(selector);
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

/**
 * Get a readable representation of a DOM element.
 *
 * @param selector If not given the container for the currently rendered component
 *   will be used.
 * @param maxLength Limit the length of the output.
 * @param options pretty-format options.
 *
 * @example
 * $render(<div>foobar</div>);
 * console.log($prettyDOM())
 *
 * @example
 * $render(<div><span>foobar</span><div>);
 * console.log($prettyDOM($find('span')))
 */
export function $prettyDOM(
  selector: Selector = getJQueryContainer(),
  maxLength?: number,
  options?: OptionsReceived
): string {
  return (
    prettyDOM(getDOMElement(selector), maxLength, options) ||
    /* istanbul ignore next: because the types are silly, this should never return falsy */ ''
  );
}
