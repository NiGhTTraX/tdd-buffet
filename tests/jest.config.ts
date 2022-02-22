// Using path aliases won't work because jest's ts-node integration doesn't support them.
import baseConfig from '../packages/jest-config/src/jest.config';

export default {
  ...baseConfig,
};
