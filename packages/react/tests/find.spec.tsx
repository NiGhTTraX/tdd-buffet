import * as React from 'react';
import stripAnsi from 'strip-ansi';
import { expect } from 'tdd-buffet/expect/jest';
import { describe, it } from 'tdd-buffet/suite/node';
import {
  $find,
  $getAllByTestId,
  $getByTestId,
  $getByText,
  $prettyDOM,
  $queryByTestId,
  $queryByText,
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

  describe('prettyDOM', () => {
    it('should print the container', () => {
      $render(<div>foo</div>);

      expect(stripAnsi($prettyDOM())).toEqual(`<div
  data-testid="__tdd-buffet-container__"
>
  <div>
    foo
  </div>
</div>`);
    });

    it('should print an element', () => {
      const $container = $render(
        <div>
          <span>foobar</span>
        </div>
      );

      expect(stripAnsi($prettyDOM($container.find('span')))).toEqual(`<span>
  foobar
</span>`);
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

    it('get', () => {
      $render(
        <>
          <p>p1</p>
          <p>p2</p>
        </>
      );

      expect($find('p').get(1).textContent).toEqual('p2');
    });
  });

  it('getByTestId', () => {
    $render(<span data-testid="foo">bar</span>);

    expect($getByTestId('foo').text()).toEqual('bar');
    expect(() => $getByTestId('xxx')).toThrow();

    $render(
      <>
        <span data-testid="foo">bar</span>
        <span data-testid="foo">baz</span>
      </>
    );

    expect(() => $getByTestId('foo')).toThrow();
  });

  it('getAllByTestId', () => {
    $render(
      <>
        <span data-testid="foo">bar</span>
        <span data-testid="foo">baz</span>
      </>
    );

    expect($getAllByTestId('foo')).toHaveLength(2);
    expect(() => $getAllByTestId('xxx')).toThrow();
  });

  it('queryByTestId', () => {
    $render(<span data-testid="foo">bar</span>);

    expect($queryByTestId('foo')).toHaveLength(1);
    expect($queryByTestId('xxx')).toBeNull();

    $render(
      <>
        <span data-testid="foo">bar</span>
        <span data-testid="foo">baz</span>
      </>
    );

    expect(() => $queryByTestId('foo')).toThrow();
  });

  it('getByText.string', () => {
    $render(<span>FoO BaR</span>);

    expect($getByText('FoO').text()).toEqual('FoO BaR');
    expect($getByText('foo').text()).toEqual('FoO BaR');
    expect(() => $getByText('xxx')).toThrow();

    $render(
      <>
        <span>foobar</span>
        <span>foobar</span>
      </>
    );

    expect(() => $getByText('foo')).toThrow();
  });

  it('getByText.regexp', () => {
    $render(<span>FoO BaR</span>);

    expect($getByText(/foo/i).text()).toEqual('FoO BaR');
    expect(() => $getByText(/xxx/)).toThrow();
  });

  it('queryByText.string', () => {
    $render(<span>FoO BaR</span>);

    expect($queryByText('FoO')).toHaveLength(1);
    expect($queryByText('xxx')).toBeNull();

    $render(
      <>
        <span>foobar</span>
        <span>foobar</span>
      </>
    );

    expect(() => $queryByText('foobar')).toThrow();
  });

  it('queryByText.regexp', () => {
    $render(<span>FoO BaR</span>);

    expect($queryByText(/foo/i)).toHaveLength(1);
    expect($queryByText(/xxx/)).toBeNull();
  });
});
