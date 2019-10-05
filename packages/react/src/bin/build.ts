/* eslint-disable no-console */
import webpack, { Configuration } from 'webpack';

export const buildProd = (config: Configuration) => {
  const compiler = webpack(config);

  compiler.run(err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};
