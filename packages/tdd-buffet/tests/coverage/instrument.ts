import { transformSync as babelTransform } from '@babel/core';
// @ts-ignore no types available
import babelPluginIstanbul from 'babel-plugin-istanbul';
import { readFile } from 'fs-extra';

export async function instrument(filename: string) {
  const content = await readFile(filename, { encoding: 'utf-8' });

  // The options should match @jest/transform.
  const result = babelTransform(content, {
    auxiliaryCommentBefore: ' istanbul ignore next ',
    babelrc: false,
    caller: {
      name: '@jest/transform',
      supportsStaticESM: false
    },
    configFile: false,
    filename,
    plugins: [[
      babelPluginIstanbul, {
        compact: false,
        exclude: [],
        useInlineSourceMaps: false
      }
    ]]
  });

  if (!result || !result.code) {
    throw new Error('Could not instrument');
  }

  return result.code;
}
