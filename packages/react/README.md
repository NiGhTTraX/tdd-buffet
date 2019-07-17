> React desserts for [tdd-buffet](https://github.com/NiGhTTraX/tdd-buffet)

----

## Render components into a test container

```typescript jsx
import React from 'react';
import { $render } from '@tdd-buffet/react';

const $component = $render(<span>foobar</span>);
console.log($component.text()); // foobar
```
