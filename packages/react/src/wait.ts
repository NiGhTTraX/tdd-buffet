import { waitFor as rtlWaitFor } from '@testing-library/react/pure';
import { getJQueryContainer } from './render';

// TODO: remove after https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43102 is released
declare module '@testing-library/react/pure' {
  export function waitFor(
    callback: () => void,
    options?: {
      container?: HTMLElement;
      timeout?: number;
      interval?: number;
      mutationObserverOptions?: MutationObserverInit;
    }
  ): Promise<void>;
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
 * await $wait(() => 1 === 1);
 * await $wait(() => 1 === 1, 2000);
 * await $wait(() => expect(1).to.equal(1))
 * await $wait(() => { expect(1).to.equal(1); })
 * await $wait($container => $container.text() === 'foobar');
 */
export function $wait(
  cb: ($container: JQuery) => any,
  timeout?: number
): Promise<void>;
/**
 * Wait for a condition to be fulfilled.
 *
 * @param cb Receives the currently mounted component wrapped in JQuery and will
 *   wait for it until it either returns a truthy value or undefined.
 *   Returning a falsy value or throwing an exception will cause this
 *   to keep waiting.
 * @param message A custom message that will be thrown if the condition is not met.
 * @param timeout Time in ms to wait until condition is fulfilled.
 *
 * @example
 * await $wait(() => 1 === 1, '1 should be 1');
 * await $wait(() => expect(1).to.equal(1), '1 should be 1 before 2 secs', 2000)
 */
export function $wait(
  cb: ($container: JQuery) => any,
  message?: string,
  timeout?: number
): Promise<void>;
export function $wait(
  cb: ($container: JQuery) => any,
  timeoutOrMessage?: number | string,
  maybeTimeout = 1500
): Promise<void> {
  return rtlWaitFor(
    () => {
      let result: any;

      try {
        result = cb(getJQueryContainer());
      } catch (e) {
        if (typeof timeoutOrMessage === 'string') {
          e.message = `${timeoutOrMessage}: ${e.message}`;
          throw e;
        }
        throw e;
      }

      if (result !== undefined && !result) {
        throw new Error(
          typeof timeoutOrMessage === 'string'
            ? timeoutOrMessage
            : 'Condition not met'
        );
      }
    },
    {
      timeout:
        typeof timeoutOrMessage === 'number' ? timeoutOrMessage : maybeTimeout,
    }
  );
}

/**
 * Wait for an element to exist in the currently rendered component.
 *
 * This function listens to mutations in the container via DOMObserver and will
 * only check that the element is present when a mutation occurs. If no mutation
 * occurs before `timeout`, or if the element is not present before `timeout`
 * then it will throw.</p>
 *
 * @param selector A CSS selector.
 * @param timeout
 *
 * @example
 * $waitForElement('div.myClass')
 * $waitForElement('div > p + p')
 */
export function $waitForElement(
  selector: string,
  timeout?: number
): Promise<any>;
/**
 * Wait for an element to exist in the currently rendered component.
 *
 * This function listens to mutations in the container via DOMObserver and will
 * only check that the element is present when a mutation occurs. If no mutation
 * occurs before `timeout`, or if the element is not present before `timeout`
 * then it will throw.</p>
 *
 * @param selector A CSS selector.
 * @param message A custom message that will be thrown if the element does not appear.
 * @param timeout
 *
 * @example
 * $waitForElement('div.myClass')
 * $waitForElement('div > p + p')
 */
export function $waitForElement(
  selector: string,
  message: string,
  timeout?: number
): Promise<any>;
/**
 * Wait for an element to exist in the currently rendered component.
 *
 * This function listens to mutations in the container via DOMObserver and will
 * only check that the element is present when a mutation occurs. If no mutation
 * occurs before `timeout`, or if the element is not present before `timeout`
 * then it will throw.
 *
 * @param cb Will receive the container for the currently rendered component,
 *   wrapped in JQuery, and is supposed to return a JQuery collection. The
 *   collection will be checked that it has at least one element in it.
 * @param timeout
 *
 * @example
 * $waitForElement($container => $container.find('.foobar'))
 * $waitForElement($container => $container.find('div').children().find('p').get(1))
 */
export function $waitForElement(
  cb: ($container: JQuery) => JQuery,
  timeout?: number
): Promise<any>;
/**
 * Wait for an element to exist in the currently rendered component.
 *
 * This function listens to mutations in the container via DOMObserver and will
 * only check that the element is present when a mutation occurs. If no mutation
 * occurs before `timeout`, or if the element is not present before `timeout`
 * then it will throw.
 *
 * @param cb Will receive the container for the currently rendered component,
 *   wrapped in JQuery, and is supposed to return a JQuery collection. The
 *   collection will be checked that it has at least one element in it.
 * @param message A custom message that will be thrown if the element does not appear.
 * @param timeout
 *
 * @example
 * $waitForElement($container => $container.find('.foobar'))
 * $waitForElement($container => $container.find('div').children().find('p').get(1))
 */
export function $waitForElement(
  cb: ($container: JQuery) => JQuery,
  message: string,
  timeout?: number
): Promise<any>;
export function $waitForElement(
  cbOrSelector: string | (($container: JQuery) => JQuery),
  messageOrTimeout?: string | number,
  maybeTimeout = 1500
): Promise<any> {
  const errorMessagePrefix =
    typeof messageOrTimeout === 'string' ? `${messageOrTimeout}: ` : '';

  return rtlWaitFor(
    () => {
      if (typeof cbOrSelector === 'string') {
        if (!getJQueryContainer().find(cbOrSelector).length) {
          throw new Error(
            `${errorMessagePrefix}Waited for '${cbOrSelector}' to appear, but it never did`
          );
        }
      } else if (!cbOrSelector(getJQueryContainer()).length) {
        throw new Error(`${errorMessagePrefix}The collection was empty`);
      }
      return true;
    },
    {
      timeout:
        typeof messageOrTimeout === 'number' ? messageOrTimeout : maybeTimeout,
      container: getJQueryContainer()[0],
    }
  );
}
