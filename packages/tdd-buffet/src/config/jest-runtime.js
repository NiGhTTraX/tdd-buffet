/* eslint-disable no-underscore-dangle */
const Runtime = require('jest-runtime');
const { shouldInstrument } = require('@jest/transform');

/**
 * Augment Jest's default runtime with a way to add coverage from external sources.
 *
 * This will add a method to the global `jest` object called `registerExternalCoverage`
 * that accepts a file path. The method will instrument the file with jest's transformer
 * and will register the source map in its internal registries so that, when the jest
 * coverage reporter will encounter coverage data for the same file path, it will know
 * how to map it back to the original source code.
 *
 * NOTE: This depends on jest's internals so future versions might break things.
 */
module.exports = class JestRuntime extends Runtime {
  constructor(config, environment, resolver, cacheFS, coverageOptions) {
    super(config, environment, resolver, cacheFS, coverageOptions);

    this.config = config;
    this._createJestObjectFor = this.createCustomJestObjectFor;
  }

  createCustomJestObjectFor(from, localRequire) {
    const jestObject = super._createJestObjectFor(from, localRequire);

    // TODO: remove dangerous methods like jest.mock?
    return {
      ...jestObject,
      config: this.config,
      addCoverageFor: this.addCoverageFor.bind(this)
    };
  }

  addCoverageFor(filename) {
    if (
      !shouldInstrument(
        filename,
        this._getFullTransformationOptions(undefined),
        this.config
      )
    ) {
      return false;
    }

    // This is copied from jest's guts.
    const transformedFile = this._scriptTransformer.transform(
      filename,
      this._getFullTransformationOptions(undefined),
      this._cacheFS[filename]
    );

    if (transformedFile.sourceMapPath) {
      this._sourceMapRegistry[filename] = transformedFile.sourceMapPath;

      if (transformedFile.mapCoverage) {
        this._needsCoverageMapped.add(filename);
      }
    }

    return true;
  }
};
