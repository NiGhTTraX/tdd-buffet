import * as React from 'react';
import { expect } from 'tdd-buffet/expect/jest';
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
      }).toThrow(NonExistentElement);
    });

    it('non-existent dom', () => {
      const $container = $render(<span />);

      expect(() => {
        getDOMElement($container.find('non-existent')[0]);
      }).toThrow(NonExistentElement);
    });

    it('non-existent jQuery', () => {
      const $container = $render(<span />);

      expect(() => {
        getDOMElement($container.find('non-existent'));
      }).toThrow(NonExistentElement);
    });

    it('multiple query', () => {
      $render(
        <>
          <p id="1">p1</p>
          <p id="2">p2</p>
        </>
      );

      expect(getDOMElement('p').id).toEqual('1');
    });

    it('multiple jQuery', () => {
      const $container = $render(
        <>
          <p id="1">p1</p>
          <p id="2">p2</p>
        </>
      );

      expect(getDOMElement($container.find('p')).id).toEqual('1');
    });
  });

  describe('find', () => {
    it('non existent', () => {
      expect($find('non-existent').text()).toEqual('');
    });

    it('multiple', () => {
      $render(
        <>
          <p>p1</p>
          <p>p2</p>
        </>
      );

      expect($find('p').text()).toEqual('p1p2');
    });
  });

  it('getByTestId', () => {
    $render(<span data-testid="foo">bar</span>);

    expect($getByTestId('foo').text()).toEqual('bar');
    expect(() => $getByTestId('xxx')).toThrow();
  });

  it('getByText.string', () => {
    $render(<span>FoO BaR</span>);

    expect($getByText('FoO').text()).toEqual('FoO BaR');
    expect(() => $getByText('xxx')).toThrow();
  });

  it('getByText.regexp', () => {
    $render(<span>FoO BaR</span>);

    expect($getByText(/foo/i).text()).toEqual('FoO BaR');
    expect(() => $getByText(/xxx/)).toThrow();
  });
});
