/* eslint-disable no-console */
/* istanbul ignore file */
import webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export function startServer(configFactory: (webpackEnv: 'development' | 'production') => Configuration) {
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const HOST = process.env.HOST || '0.0.0.0';

  const config = configFactory('development');
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, config.devServer);

  devServer.listen(PORT, HOST, err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
}
