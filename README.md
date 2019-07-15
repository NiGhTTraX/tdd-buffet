> All you can eat delicious TDD helpers, healthy configs, React desserts and TypeScript beverages

----

## Test suites

### Node

Create a Jest test suite with Chai assertions:

```typescript
import { describe, it, expect } from 'tdd-buffet/suite/node';

describe('Node suite', () => {
  it('should run a test', () => {
    expect(1).to.equal(1); 
  });
});
```


## Configs

### TypeScript

```json
{
  "extends": "tdd-buffet/config/tsconfig.json"
}
```


## React

```typescript jsx
import React from 'react';
import { $render } from '@tdd-buffet/react';

const $component = $render(<span>foobar</span>);
console.log($component.text()); // foobar
```


## Selenium

```shell script
npx tdd-buffet-selenium start
```
