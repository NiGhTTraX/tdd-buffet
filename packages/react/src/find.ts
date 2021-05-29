import {
  getAllByTestId,
  getByTestId,
  getByText,
  prettyDOM,
  queryByTestId,
  queryByText,
} from '@testing-library/react/pure';
import $ from 'jquery';
import { getJQueryContainer } from './render';

export type Selector = string | HTMLElement | JQuery;

/**
 * Find an element by a test ID.
 *
 * @param id The test ID assigned to the `data-testid` attribute.
 *
 * @param container By default, the function will search through the whole component
 *   that's currently rendered. You can override this by passing an optional container.
 *
 * @throws Will throw if multiple elements match or if no element matches.
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
export function $getByTestId(
  id: string,
  container: Selector = getJQueryContainer()
): JQuery {
  return $(getByTestId(getDOMElement(container), id, {}));
}

/**
 * Find all the elements that match a test ID.
 *
 * @param id The test ID assigned to the `data-testid` attribute.
 *
 * @param container By default, the function will search through the whole component
 *   that's currently rendered. You can override this by passing an optional container.
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
export function $getAllByTestId(
  id: string,
  container: Selector = getJQueryContainer()
): JQuery {
  return $(getAllByTestId(getDOMElement(container), id, {}));
}

/**
 * Find a single element that matches a test ID.
 *
 * @param id The test ID assigned to the `data-testid` attribute.
 *
 * @param container By default, the function will search through the whole component
 *   that's currently rendered. You can override this by passing an optional container.
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
export function $queryByTestId(
  id: string,
  container: Selector = getJQueryContainer()
): JQuery | null {
  const elements = queryByTestId(getDOMElement(container), id, {});

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
 * @param container By default, the function will search through the whole component
 *   that's currently rendered. You can override this by passing an optional container.
 *
 * @throws Will throw if multiple elements match, or if no element matches.
 *
 * @example
 * $render(<button>Click me</button>);
 * $getByText('Click').text() === 'Click me'
 */
export function $getByText(contains: string, container?: Selector): JQuery;
/**
 * Find an element in the currently rendered component that matches the given RegExp.
 *
 * @param matches A regular expression.
 *
 * @param container By default, the function will search through the whole component
 *   that's currently rendered. You can override this by passing an optional container.
 *
 * @throws Will throw if multiple elements match, or if no element matches.
 *
 * @example
 * $render(<button>Click me</button>);
 * $getByText(/click/).text() === 'Click me'
 */
export function $getByText(matches: RegExp, container?: Selector): JQuery;
export function $getByText(
  match: string | RegExp,
  container: Selector = getJQueryContainer()
): JQuery {
  return $(getByText(getDOMElement(container), match, { exact: false }));
}

/**
 * Find an element in the currently rendered component that contains the given text.
 *
 * @param contains A substring to look for. The search is case **insensitive**.
 *
 * @param container By default, the function will search through the whole component
 *   that's currently rendered. You can override this by passing an optional container.
 *
 * @returns If there are no matching elements `null` will be returned.
 *
 * @throws Will throw if multiple elements match.
 *
 * @example
 * $render(<button>Click me</button>);
 * $queryByText('Click').text() === 'Click me'
 */
export function $queryByText(
  contains: string,
  container?: Selector
): JQuery | null;
/**
 * Find an element in the currently rendered component that matches the given RegExp.
 *
 * @param matches A regular expression.
 *
 * @param container By default, the function will search through the whole component
 *   that's currently rendered. You can override this by passing an optional container.
 *
 * @returns If there are no matching elements `null` will be returned.
 *
 * @throws Will throw if multiple elements match.
 *
 * @example
 * $render(<button>Click me</button>);
 * $queryByText(/click/).text() === 'Click me'
 */
export function $queryByText(
  matches: RegExp,
  container?: Selector
): JQuery | null;
export function $queryByText(
  match: string | RegExp,
  container: Selector = getJQueryContainer()
): JQuery | null {
  const element = queryByText(getDOMElement(container), match, {
    exact: false,
  });

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
 * jQuery's `find` method.
 *
 * @param selector Can be any CSS selector or jQuery powered selector.
 *
 * @see https://api.jquery.com/find/
 *
 * @param container By default, the function will search through the whole component
 *   that's currently rendered. You can override this by passing an optional container.
 *
 * @returns A jQuery collection.
 *
 * @example
 * $render(<span id="text">some text</span>);
 * console.log($find('#text').text()); // some text
 */
export function $find(
  selector: Selector,
  container: Selector = getJQueryContainer()
): JQuery {
  return $(getDOMElement(container)).find(selector);
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
  maxLength?: number
): string {
  return (
    prettyDOM(getDOMElement(selector), maxLength) ||
    /* istanbul ignore next: because the types are silly, this should never return falsy */ ''
  );
}
