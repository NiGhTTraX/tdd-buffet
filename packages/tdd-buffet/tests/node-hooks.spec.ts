import { expect } from 'tdd-buffet/expect/chai';
import { after, afterEach, before, beforeEach, describe, it } from '../src/suite/node';

describe('Node hooks', () => {
  let count = 0;

  const increment = () => {
    count++;
  };

  before(increment);

  after(increment);

  beforeEach(increment);

  afterEach(increment);

  it('test 1', () => {
    expect(count).to.equal(2);
  });

  it('test 2', () => {
    expect(count).to.equal(4);
  });
});
