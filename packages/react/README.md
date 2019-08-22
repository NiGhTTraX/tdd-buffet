> React testing for [tdd-buffet](https://github.com/NiGhTTraX/tdd-buffet)

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/@tdd-buffet/react.svg)

----

This package can be used independently of `tdd-buffet`.

## Install

```sh
npm install tdd-buffet @tdd-buffet/react
```


## Render components into a test container

```typescript jsx
import React from 'react';
import { describe, it } from 'tdd-buffet/suite/node';
import { expect } from 'tdd-buffet/suite/expect';
import { $render } from '@tdd-buffet/react';

describe('My component', () => {
  it('should contain foobar', () => {
    const $component = $render(<span>foobar</span>);
  
    expect($component.text()).to.equal('foobar');
  });
});
```

The returned `$component` is a JQuery wrapper over the container that holds the component. You can use the familiar JQuery API to query for content (`$component.find('p')`), get text content (`$component.text()`), assert visibility (`$component.find('.class').is(':visible')`) and other stuff.


## Firing events

The package exposes convenience methods for firing events targeted at elements inside the currently rendered component. The methods are just wrappers over [testing-library/dom](https://github.com/testing-library/dom-testing-library).

```typescript jsx
import React from 'react';
import { $render, click } from '@tdd-buffet/react';

const $component = $render(<button onClick={() => console.log('clicked')}>
  click me
</button>);

click('button'); // will log 'clicked'
click($component.find('button')); // will log 'clicked'
```


## Waiting for conditions

```typescript jsx
import React from 'react';
import Simulate from 'react-dom/test-utils';
import { describe, it } from 'tdd-buffet/suite/node';
import { expect } from 'tdd-buffet/suite/expect';
import { $render, wait } from '@tdd-buffet/react';

class MyComponent extends React.Component {
  state = { done: false };

  render() {
    return <button onClick={() => this.setState({ done: true })}>
      {this.state.done ? 'done' : 'loading'}
    </button>;
  }
}

describe('My component', () => {
  it('should display a message when clicking', async () => {
    const $component = $render(<MyComponent />);
    Simulate.click($component.find('button')[0]);
  
    await wait(() => expect($component.text()).to.equal('done'));
  });
});
```
