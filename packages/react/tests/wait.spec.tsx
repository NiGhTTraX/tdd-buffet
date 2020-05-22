/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';
import { expect } from 'tdd-buffet/expect/chai';
import { expect as jExpect } from 'tdd-buffet/expect/jest';
import { afterEach, beforeEach, describe, it } from 'tdd-buffet/suite/node';
import { $render, $rerender } from '../src/render';
import { $wait, $waitForElement } from '../src/wait';

describe('wait', () => {
  it('should wait for an already satisfied condition', async () => {
    await $wait(() => true);
  });

  it('should wait for an already met expectation', async () => {
    await $wait(() => {
      expect(1).to.equal(1);
    });
  });

  it('should wait for an already met assertion', async () => {
    await $wait(() => expect(1).to.equal(1));
  });

  it('should wait for a pending condition', async () => {
    let pending = false;

    setTimeout(() => {
      pending = true;
    }, 10);

    await $wait(() => pending);
  });

  it('should fail for an unmet condition', async () => {
    await jExpect($wait(() => false, 0)).rejects.toThrow();
  });

  it('should fail for an unmet expectation', async () => {
    await jExpect(
      $wait(() => {
        expect(1).to.equal(2);
      }, 10)
    ).rejects.toThrow();
  });

  it('should wait on the component container', async () => {
    $render(<span>foobar</span>);

    await $wait(($container) => $container.text() === 'foobar');
  });

  it('should throw a custom error message', async () => {
    await jExpect($wait(() => false, 'foobar', 10)).rejects.toThrow('foobar');
  });

  it('should throw a default error message', async () => {
    await jExpect($wait(() => false, 10)).rejects.toThrow('Condition not met');
  });

  it('should append the custom error message when the cb throws', async () => {
    const error = new Error('original');

    await jExpect(
      $wait(
        () => {
          throw error;
        },
        'custom',
        10
      )
    ).rejects.toThrow('custom: original');
  });

  it('should preserve the error with a custom message', async () => {
    const error = new Error('original');

    await jExpect(
      $wait(
        () => {
          throw error;
        },
        'custom',
        10
      )
    ).rejects.toThrow(error);
  });

  describe('effects', () => {
    const originalError = console.error;

    beforeEach(() => {
      console.error = (...args: any[]) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
          throw new Error(args[0]);
        }

        originalError.call(console, ...args);
      };
    });

    afterEach(() => {
      console.error = originalError;
    });

    it('should wait for async effects', async () => {
      const HookyComponent = () => {
        const [effectTriggered, setEffectTriggered] = useState(false);
        useEffect(() => {
          setTimeout(() => setEffectTriggered(true), 0);
        }, []);

        return (
          <button type="button">
            {effectTriggered ? 'effect triggered' : 'nope'}
          </button>
        );
      };

      const $component = $render(<HookyComponent />);

      await $wait(() => expect($component.text()).to.equal('effect triggered'));
    });
  });
});

describe('waitForElement', () => {
  it('should not wait for an element that already exists', async () => {
    $render(<span className="existing" />);

    await $waitForElement('.existing');
    await $waitForElement(($container) => $container.find('.existing'));
  });

  it('should wait for an element', async () => {
    $render(<span>foobar</span>);

    setTimeout(() => {
      $rerender(<span className="soon" />);
    }, 10);

    await $waitForElement('.soon');
    await $waitForElement(($container) => $container.find('.soon'));
  });

  it('should throw for an element that does not appear', async () => {
    await jExpect($waitForElement('.not-found', 10)).rejects.toThrow(
      "Waited for '.not-found' to appear, but it never did"
    );

    await jExpect(
      $waitForElement(($container) => $container.find('.not-found'), 10)
    ).rejects.toThrow('The collection was empty');
  });

  it('should throw a custom error message', async () => {
    await jExpect($waitForElement('.not-found', 'foobar', 10)).rejects.toThrow(
      "foobar: Waited for '.not-found' to appear, but it never did"
    );

    await jExpect(
      $waitForElement(
        ($container) => $container.find('.not-found'),
        'foobar',
        10
      )
    ).rejects.toThrow('foobar: The collection was empty');
  });
});
