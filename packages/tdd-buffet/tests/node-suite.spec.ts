import { describe, it } from '../src/suite/node';
import { expect } from '../../tdd-buffet/src/suite/expect';


describe('Node suite', () => {
  it('empty test', () => {});

  it('pending test');

  it('simple assertion', () => {
    expect(1).to.equal(1);
  });

  describe('nested', () => {
    it('nested test', () => {});
  });
});
