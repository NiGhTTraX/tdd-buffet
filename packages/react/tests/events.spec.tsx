import * as React from 'react';
import { instance, mock, verify, when } from 'strong-mock';
import { describe, it } from 'tdd-buffet/suite/node';
import { $change, $click, $fireEvent, $keyDown, $submit } from '../src/events';
import { $render } from '../src/render';

describe('Firing events', () => {
  it('click', () => {
    const cb = mock<() => void>();
    when(cb()).thenReturn(undefined);

    $render(
      <button type="button" onClick={() => instance(cb)()}>
        click me
      </button>
    );

    $click('button');

    verify(cb);
  });

  it('click.jquery', () => {
    const cb = mock<() => void>();
    when(cb()).thenReturn(undefined);

    const $container = $render(
      <button type="button" onClick={() => instance(cb)()}>
        click me
      </button>
    );

    $click($container.find('button'));

    verify(cb);
  });

  it('click.dom', () => {
    const cb = mock<() => void>();
    when(cb()).thenReturn(undefined);

    const $container = $render(
      <button type="button" onClick={() => instance(cb)()}>
        click me
      </button>
    );

    $click($container.find('button')[0]);

    verify(cb);
  });

  it('click.checkbox.check', () => {
    const cb = mock<(s: boolean) => void>();
    when(cb(true)).thenReturn(undefined);

    $render(
      <input
        type="checkbox"
        onChange={(e) => instance(cb)(e.currentTarget.checked)}
      />
    );

    $click('input');

    verify(cb);
  });

  it('click.checkbox.uncheck', () => {
    const cb = mock<(s: boolean) => void>();
    when(cb(false)).thenReturn(undefined);

    $render(
      <input
        type="checkbox"
        checked
        onChange={(e) => instance(cb)(e.currentTarget.checked)}
      />
    );

    $click('input');

    verify(cb);
  });

  it('click.radio.check', () => {
    const cb = mock<(s: boolean) => void>();
    when(cb(true)).thenReturn(undefined);

    $render(
      <input
        type="radio"
        onChange={(e) => instance(cb)(e.currentTarget.checked)}
      />
    );

    $click('input');

    verify(cb);
  });

  it('change.target', () => {
    const cb = mock<(s: string) => void>();
    when(cb('foobar')).thenReturn(undefined);

    $render(
      <input type="text" onChange={(e) => instance(cb)(e.target.value)} />
    );

    $change('input', 'foobar');

    verify(cb);
  });

  it('change.currentTarget', () => {
    const cb = mock<(s: string) => void>();
    when(cb('foobar')).thenReturn(undefined);

    $render(
      <input
        type="text"
        onChange={(e) => instance(cb)(e.currentTarget.value)}
      />
    );

    $change('input', 'foobar');

    verify(cb);
  });

  it('keydown', () => {
    const cb = mock<(char: string, which: number) => void>();

    $render(<div onKeyDown={(e) => instance(cb)(e.key, e.which)} />);

    when(cb('A', 65)).thenReturn(undefined);
    $keyDown('div', 'A');

    when(cb('A', 100)).thenReturn(undefined);
    $keyDown('div', 'A', 100);

    when(cb('Enter', 69)).thenReturn(undefined);
    $keyDown('div', 'Enter');

    when(cb('Enter', 13)).thenReturn(undefined);
    $keyDown('div', 'Enter', 13);

    verify(cb);
  });

  it('fireEvent', () => {
    const cb = mock<() => void>();
    when(cb()).thenReturn(undefined);

    $render(
      <button type="button" onDragCapture={instance(cb)}>
        Click me
      </button>
    );

    $fireEvent.drag('button');

    verify(cb);
  });

  describe('submit', () => {
    it('button', () => {
      const cb = mock<() => void>();
      when(cb()).thenReturn();

      $render(
        <form onSubmit={instance(cb)}>
          <button type="submit">submit</button>
        </form>
      );

      $submit('button');

      verify(cb);
    });

    it('form', () => {
      const cb = mock<() => void>();
      when(cb()).thenReturn();

      $render(<form onSubmit={instance(cb)} />);

      $submit('form');

      verify(cb);
    });

    it('linked button', () => {
      const cb = mock<() => void>();
      when(cb()).thenReturn();

      $render(
        <>
          <form id="form" onSubmit={instance(cb)} />
          <button form="form" type="submit">
            submit
          </button>
        </>
      );

      $submit('button');

      verify(cb);
    });
  });
});
