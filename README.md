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
