import { expect } from 'tdd-buffet/expect/chai';
import { describe, it } from '../src/suite/node';


describe('Node suite', () => {
  it('empty test', () => {});

  it('pending test');

  it('simple assertion', () => {
    expect(1).to.equal(1);
  });

  describe('nested', () => {
    it('full name', (testName: string) => {
      expect(testName).to.equal('Node suite nested full name');
    });
  });
});
