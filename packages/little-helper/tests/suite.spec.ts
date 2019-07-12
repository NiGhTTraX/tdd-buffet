import { describe, expect, it } from '../src/node/suite';

describe('Suite', () => {
  it('empty test', () => {});

  it('pending test');

  it('simple assertion', () => {
    expect(1).to.equal(1);
  });

  describe('nested', () => {
    it('nested test', () => {});
  });
});
