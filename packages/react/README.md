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

const $container = $render(<span>foobar</span>);

expect($container.text()).to.equal('foobar');
```

The returned `$container` is a JQuery wrapper over the container that holds the component. You can use the familiar JQuery API to query for content (`$container.find('p')`), get text content (`$container.text()`), assert visibility (`$container.find('.class').is(':visible')`) etc.

### Find elements

Since `$render` returns a jQuery container you can use the [`$.find`](https://api.jquery.com/find/) method to query elements by any CSS selector (ID, class name, `data-*` attribute etc.) or by jQuery's [special selectors](https://api.jquery.com/category/selectors/jquery-selector-extensions/) ([`:contains`](https://api.jquery.com/contains-selector/), [`:checked`](https://api.jquery.com/checked-selector/#checked1), [`:disabled`](https://api.jquery.com/disabled-selector/#disabled1) etc.).

```typescript jsx
import React from 'react';
import { $render } from '@tdd-buffet/react';

const $container = $render(<div>
  <p>first paragraph</p>
  <p>second paragraph</p>
</div>);

$container.find('p:second').text() === 'second paragraph';
```

There are also a couple of convenience query methods for finding elements by test ID (`$getByTestId`) and by text (`$getByText`).

```typescript jsx
import React from 'react';
import { $render, $getByText, $getByTestId } from '@tdd-buffet/react';

$render(<div>
  <p>first paragraph</p>
  <p data-testid="second">second paragraph</p>
</div>);

$getByText('first').text() === 'first paragraph';
$getByTestId('second').text() === 'second paragraph';
```

### Fire events

The package exposes [@testing-library/react's `fireEvent` object](https://testing-library.com/docs/dom-testing-library/api-events#fireevent-eventname) wrapped in a helper that can take a DOM element, a CSS selector or a JQuery collection:

```typescript jsx
import React from 'react';
import { $render, $fireEvent } from '@tdd-buffet/react';

$render(<button onClick={() => console.log('clicked')}>
  click me
</button>);

$fireEvent.click('button'); // will log 'clicked'
```

Some aliases are also exported for the most common events:

```typescript jsx
import React from 'react';
import { $render, $click } from '@tdd-buffet/react';

$render(<button onClick={() => console.log('clicked')}>
  click me
</button>);

$click('button'); // will log 'clicked'
```

### Wait for conditions

If your component contains async logic like waiting for a promise or for a timer you can use the `wait` function to wait for a condition to be satisfied such as an element becoming visible.

Note that React doesn't guarantee that a render happens synchronously so it's safer to wrap all of your assertions with `wait`.

```typescript jsx
import React, { useState } from 'react';
import { $render, wait, $click } from '@tdd-buffet/react';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  return <button onClick={() => setIsLoading(false)}>
    {isLoading ? 'loading' : 'done'}
  </button>;
};

$render(<MyComponent />);
$click('button');

await wait($container => $container.text() === 'done');
```

### Wait for elements

The package exposes a shortcut to wait for the condition that an element is present in the container.

```typescript jsx
import React, { useState } from 'react';
import { $render, waitForElement, $click } from '@tdd-buffet/react';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  return <>
    <button onClick={() => setIsLoading(false)}>Click me</button>
    {!isLoading && <span className="present">I'm here</span>}
  </>;
};

$render(<MyComponent />);
$click('button');

await waitForElement($container => $container.find('.present'));
```

### Unmount

If your component has cleanup logic e.g. clearing timers in `componentWillUnmount` you can check them in your tests by manually unmounting the component.

```typescript jsx
import React from 'react';
import { $render, $unmount } from '@tdd-buffet/react';

const $container = $render(<span>foobar</span>);
$unmount();

$container.text() === '';
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
