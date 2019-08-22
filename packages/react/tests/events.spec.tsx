import * as React from 'react';
import { describe, it } from 'tdd-buffet/suite/node';
import { $render, change, click } from '@tdd-buffet/react';
import Mock from 'strong-mock';

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
