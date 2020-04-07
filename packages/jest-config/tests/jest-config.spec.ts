import './png.png';
import './styles.css';

describe('Jest config', () => {
  it('should ignore static assets', () => {
    // The test is empty because we rely on the imports at the top.
  });

  it('should polyfill fetch', () => {
    expect(fetch).toBeInstanceOf(Function);
  });

  it('should polyfill MutationObserver', () => {
    expect(MutationObserver).toBeDefined();
  });
});
