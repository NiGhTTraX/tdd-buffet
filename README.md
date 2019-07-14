> TDD helpers

----

## Node test suite

Create a Jest test suite with Chai assertions:

```typescript
import { describe, it, expect } from '@nighttrax/little-helper/node/suite';

describe('Test suite', () => {
  it('should run a test', () => {
    expect(1).to.equal(1); 
  });
});
```
