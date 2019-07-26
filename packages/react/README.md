> React desserts for [tdd-buffet](https://github.com/NiGhTTraX/tdd-buffet)

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet) ![npm type definitions](https://img.shields.io/npm/types/@tdd-buffet/react.svg)

----

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
