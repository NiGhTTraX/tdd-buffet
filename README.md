> TDD helpers

----

## Test suites

### Node

Create a Jest test suite with Chai assertions:

```typescript
import { describe, it, expect } from '@nighttrax/little-helper/suite/node';

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
  "extends": "@nighttrax/little-helper/config/tsconfig.json"
}
```
