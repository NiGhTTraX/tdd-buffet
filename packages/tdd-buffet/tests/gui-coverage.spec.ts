import { describe, it } from 'tdd-buffet/suite/node';
import Mock from 'strong-mock';
import { Browser, CoverageObject, createTest } from 'tdd-buffet/suite/gui';
import { expect } from 'tdd-buffet/suite/expect';

function createCoverageObject(filepaths: string[]): CoverageObject {
  return filepaths.reduce((acc, filepath) => ({
    ...acc,
    [filepath]: {
      statementMap: {
        0: {
          start: {
            line: 1,
            column: 1
          },
          end: {
            line: 1,
            column: 10
          }
        }
      },
      branchMap: {},
      fnMap: {},
      path: filepath,
      b: {},
      f: {},
      s: {
        0: 1
      }
    }
  }), {});
}

function createBrowserWithCoverage(browserCoverage: CoverageObject) {
  const browser = new Mock<Browser>();
  browser
    .when(b => b.execute)
    // eslint-disable-next-line no-eval
    .returns((fnOrString: ((...args: any[]) => any) | string) => eval(`
      var window = { 
        __coverage__: ${JSON.stringify(browserCoverage)}
      };
      ${fnOrString.toString()}
      ${typeof fnOrString === 'function' ? `${fnOrString.name}()` : ''}
    `));
  return browser;
}

describe('Gui suite', () => {
  it('should collect coverage', async () => {
    const filepath = '/path/to/file';
    const browserCoverage: CoverageObject = createCoverageObject([filepath]);
    const browser = createBrowserWithCoverage(browserCoverage);
    const expectedCoverage: CoverageObject = {};

    const test = createTest(
      () => {},
      () => browser.stub,
      'browser',
      true,
      expectedCoverage,
      ':irrelevant:'
    );

    await test(':irrelevant:');

    expect(expectedCoverage[filepath].s[0]).to.equal(1);
  });

  it('should update coverage', async () => {
    const filepath = '/path/to/file';
    const browserCoverage: CoverageObject = createCoverageObject([filepath]);
    const browser = createBrowserWithCoverage(browserCoverage);
    const expectedCoverage: CoverageObject = createCoverageObject([filepath]);

    const test = createTest(
      () => {},
      () => browser.stub,
      'browser',
      true,
      expectedCoverage,
      ':irrelevant:'
    );
    await test(':irrelevant:');

    expect(expectedCoverage[filepath].s[0]).to.equal(2);
  });

  it('should collect coverage for multiple files', async () => {
    const browserCoverage: CoverageObject = createCoverageObject([
      '/path/to/file1', '/path/to/file2'
    ]);
    const browser = createBrowserWithCoverage(browserCoverage);
    const expectedCoverage: CoverageObject = {};

    const test = createTest(
      () => {},
      () => browser.stub,
      'browser',
      true,
      expectedCoverage,
      ':irrelevant:'
    );

    await test(':irrelevant:');

    expect(expectedCoverage['/path/to/file1'].s[0]).to.equal(1);
    expect(expectedCoverage['/path/to/file2'].s[0]).to.equal(1);
  });

  it('should translate paths', async () => {
    const browserCoverage: CoverageObject = createCoverageObject([
      '/usr/src/app/file1', '/usr/src/app/file2'
    ]);
    const browser = createBrowserWithCoverage(browserCoverage);
    const expectedCoverage: CoverageObject = {};

    const test = createTest(
      () => {},
      () => browser.stub,
      'browser',
      true,
      expectedCoverage,
      '/new/dir'
    );

    await test(':irrelevant:');

    expect(expectedCoverage['/new/dir/file1'].s[0]).to.equal(1);
    expect(expectedCoverage['/new/dir/file1'].path).to.equal('/new/dir/file1');
    expect(expectedCoverage['/new/dir/file2'].s[0]).to.equal(1);
    expect(expectedCoverage['/new/dir/file2'].path).to.equal('/new/dir/file2');
  });

  it('should translate paths before merging', async () => {
    const browserCoverage: CoverageObject = createCoverageObject([
      '/usr/src/app/file'
    ]);
    const browser = createBrowserWithCoverage(browserCoverage);
    const expectedCoverage: CoverageObject = createCoverageObject([
      '/new/dir/file'
    ]);

    const test = createTest(
      () => {},
      () => browser.stub,
      'browser',
      true,
      expectedCoverage,
      '/new/dir'
    );

    await test(':irrelevant:');

    expect(expectedCoverage['/new/dir/file'].s[0]).to.equal(2);
  });
});
