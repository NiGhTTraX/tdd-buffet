import * as React from 'react';
import { expect } from 'tdd-buffet/expect/chai';
import { describe, it } from 'tdd-buffet/suite/node';
import {
  $find,
  $getByTestId,
  $getByText,
  getDOMElement,
  NonExistentElement,
} from '../src';
import { $render } from '../src/render';

describe('Finding elements', () => {
  describe('getDOMElement', () => {
    it('non-existent query', () => {
      $render(<span />);

      expect(() => {
        getDOMElement('non-existent');
      }).to.throw(NonExistentElement);
    });

    it('non-existent dom', () => {
      const $container = $render(<span />);

      expect(() => {
        getDOMElement($container.find('non-existent')[0]);
      }).to.throw(NonExistentElement);
    });

    it('non-existent jQuery', () => {
      const $container = $render(<span />);

      expect(() => {
        getDOMElement($container.find('non-existent'));
      }).to.throw(NonExistentElement);
    });

    it('multiple query', () => {
      $render(
        <>
          <p id="1">p1</p>
          <p id="2">p2</p>
        </>
      );

      expect(getDOMElement('p').id).to.equal('1');
    });

    it('multiple jQuery', () => {
      const $container = $render(
        <>
          <p id="1">p1</p>
          <p id="2">p2</p>
        </>
      );

      expect(getDOMElement($container.find('p')).id).to.equal('1');
    });
  });

  describe('find', () => {
    it('non existent', () => {
      expect($find('aaaa').text()).to.equal('');
    });

    it('multiple', () => {
      $render(
        <>
          <p>p1</p>
          <p>p2</p>
        </>
      );

      expect($find('p').text()).to.equal('p1p2');
    });
  });

  it('getByTestId', () => {
    $render(<span data-testid="foo">bar</span>);

    expect($getByTestId('foo').text()).to.equal('bar');
    expect(() => $getByTestId('xxx')).to.throw();
  });

  it('getByText.string', () => {
    $render(<span>FoO BaR</span>);

    expect($getByText('FoO').text()).to.equal('FoO BaR');
    expect(() => $getByText('xxx')).to.throw();
  });

  it('getByText.regexp', () => {
    $render(<span>FoO BaR</span>);

    expect($getByText(/foo/i).text()).to.equal('FoO BaR');
    expect(() => $getByText(/xxx/)).to.throw();
  });
});
