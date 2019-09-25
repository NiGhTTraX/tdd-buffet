> React testing tools for [tdd-buffet](https://github.com/NiGhTTraX/tdd-buffet)

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/@tdd-buffet/react.svg)

----

> This package can be used independently of `tdd-buffet`.


## Install

```sh
npm install @tdd-buffet/react
```

## Testing

### Render components

```typescript jsx
import React from 'react';
import { expect } from 'tdd-buffet/suite/chai';
import { $render } from '@tdd-buffet/react';

const $component = $render(<span>foobar</span>);

expect($component.text()).to.equal('foobar');
```

The returned `$component` is a JQuery wrapper over the container that holds the component. You can use the familiar JQuery API to query for content (`$component.find('p')`), get text content (`$component.text()`), assert visibility (`$component.find('.class').is(':visible')`) and other stuff.


### Fire events

The package exposes convenience methods for firing events targeted at elements inside the currently rendered component.

```typescript jsx
import React from 'react';
import { $render, click } from '@tdd-buffet/react';

$render(<button onClick={() => console.log('clicked')}>
  click me
</button>);

click('button'); // will log 'clicked'
```

The methods are just wrappers over [testing-library/dom](https://github.com/testing-library/dom-testing-library). The following events are currently supported:

- `click`,
- `change`.


### Wait for conditions

If your component contains async logic like waiting for a promise or for a timer you can use the `wait` function to wait for a condition to be satisfied such as an element becoming visible.

Note that React doesn't guarantee that a render happens synchronously so it's safer to wrap your all of your assertions with `wait`.

```typescript jsx
import React from 'react';
import { expect } from 'tdd-buffet/suite/chai';
import { $render, wait, click } from '@tdd-buffet/react';

class MyComponent extends React.Component {
  state = { done: false };

  render() {
    return <button onClick={() => this.setState({ done: true })}>
      {this.state.done ? 'done' : 'loading'}
    </button>;
  }
}

(async () => {
  $render(<MyComponent />);
  click('button');

  await wait($container => expect($container.text()).to.equal('done'));
})();
```


### Unmount

If your component has cleanup logic e.g. clearing timers in `componentWillUnmount` you can check them in your tests by manually unmounting the component.

```typescript jsx
import React from 'react';
import { expect } from 'tdd-buffet/suite/chai';

import { $render, unmount } from '@tdd-buffet/react';

const $container = $render(<span>foobar</span>);
unmount();

expect($container.text()).to.equal('');
```


### Rerender

Rerendering a component with new props can be useful if you want to check that it reacts to the new props e.g. `getDerivedStateFromProps`.

```typescript jsx
import React from 'react';
import { $render, $rerender } from '@tdd-buffet/react';

$render(<span>foobar</span>);
$rerender(<span>potato</span>);
```


## Building

### Webpack


```js
const baseConfig = require('tdd-buffet/config/webpack.config.js');

module.exports = {
  ...baseConfig
}
```

Setting `COVERAGE=1` in your environment will instrument your code for coverage and is needed to [aggregate reports](../tdd-buffet/README.md#coverage).
