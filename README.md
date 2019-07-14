> TDD helpers

----

## Node test suite

Create a Jest test suite with Chai assertions:

```typescript
import { describe, it, expect } from '@nighttrax/little-helper/suite/node';

describe('Node suite', () => {
  it('should run a test', () => {
    expect(1).to.equal(1); 
  });
});
```
