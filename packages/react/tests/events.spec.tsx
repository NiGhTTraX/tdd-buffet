import { $render, change, click } from '@tdd-buffet/react';
import * as React from 'react';
import Mock from 'strong-mock';
import { expect } from 'tdd-buffet/expect/chai';
import { describe, it } from 'tdd-buffet/suite/node';

describe('Firing events', () => {
  it('click', () => {
    const cb = new Mock<() => void>();
    cb.when(c => c()).returns(undefined);

    $render(<button type="button" onClick={() => cb.stub()}>click me</button>);

    click('button');

    cb.verifyAll();
  });

  it('click.jquery', () => {
    const cb = new Mock<() => void>();
    cb.when(c => c()).returns(undefined);

    const $component = $render(<button type="button" onClick={() => cb.stub()}>click me</button>);

    click($component.find('button'));

    cb.verifyAll();
  });

  it('click.dom', () => {
    const cb = new Mock<() => void>();
    cb.when(c => c()).returns(undefined);

    const $component = $render(<button type="button" onClick={() => cb.stub()}>click me</button>);

    click($component.find('button')[0]);

    cb.verifyAll();
  });

  it('click non-existent selector', () => {
    $render(<span />);

    expect(() => {
      click('non-existent');
    }).to.throw('Element does not exist');
  });

  it('click non-existent dom', () => {
    const $container = $render(<span />);

    expect(() => {
      click($container.find('non-existent')[0]);
    }).to.throw('Element does not exist');
  });

  it('click non-existent jQuery', () => {
    const $container = $render(<span />);

    expect(() => {
      click($container.find('non-existent'));
    }).to.throw('Element does not exist');
  });

  it('click.checkbox.check', () => {
    const cb = new Mock<(s: boolean) => void>();
    cb.when(c => c(true)).returns(undefined);

    $render(<input type="checkbox" onChange={e => cb.stub(e.currentTarget.checked)} />);

    click('input');

    cb.verifyAll();
  });

  it('click.checkbox.uncheck', () => {
    const cb = new Mock<(s: boolean) => void>();
    cb.when(c => c(false)).returns(undefined);

    $render(<input type="checkbox" checked onChange={e => cb.stub(e.currentTarget.checked)} />);

    click('input');

    cb.verifyAll();
  });

  it('click.radio.check', () => {
    const cb = new Mock<(s: boolean) => void>();
    cb.when(c => c(true)).returns(undefined);

    $render(<input type="radio" onChange={e => cb.stub(e.currentTarget.checked)} />);

    click('input');

    cb.verifyAll();
  });

  it('change.target', () => {
    const cb = new Mock<(s: string) => void>();
    cb.when(c => c('foobar')).returns(undefined);

    $render(<input type="text" onChange={e => cb.stub(e.target.value)} />);

    change('input', 'foobar');

    cb.verifyAll();
  });

  it('change.currentTarget', () => {
    const cb = new Mock<(s: string) => void>();
    cb.when(c => c('foobar')).returns(undefined);

    $render(<input type="text" onChange={e => cb.stub(e.currentTarget.value)} />);

    change('input', 'foobar');

    cb.verifyAll();
  });
});
