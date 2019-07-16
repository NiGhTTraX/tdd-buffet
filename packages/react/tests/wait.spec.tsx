/* eslint-disable react/no-multi-comp */
import React from 'react';
import { describe, expect, it } from '../../tdd-buffet/src/suite/node';
import { $render, wait } from '../src';

describe('wait', () => {
  it('should wait for an already satisfied condition', async () => {
    await wait(() => true);
  });

  it('should wait for an already met expectation', async () => {
    await wait(() => { expect(1).to.equal(1); });
  });

  it('should wait for a pending condition', async () => {
    let pending = false;

    setTimeout(() => { pending = true; }, 10);

    await wait(() => pending);
  });

  it('should fail for an unmet condition', async () => {
    let error!: Error;

    try {
      await wait(() => false, 0);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.instanceOf(Error);
  });

  it('should fail for an unmet expectation', async () => {
    let error!: Error;

    try {
      await wait(() => { expect(1).to.equal(2); }, 10);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.instanceOf(Error);
  });

  it('should wait on the component container', async () => {
    $render(<span>foobar</span>);

    await wait($container => $container.text() === 'foobar');
  });
});
