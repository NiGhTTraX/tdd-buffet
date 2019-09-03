import { expect as chaiExpect } from 'tdd-buffet/expect/chai';
import { expect as jestExpect } from 'tdd-buffet/expect/jest';
import { describe, it } from 'tdd-buffet/suite/node';

describe('Expect', () => {
  describe('chai', () => {
    it('should compare things', () => {
      chaiExpect(1).to.equal(1);
      chaiExpect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
    });
  });

  describe('jest', () => {
    it('should compare things', () => {
      jestExpect(1).toEqual(1);
      jestExpect({ foo: 'bar' }).toEqual({ foo: 'bar' });
    });
  });
});
