module.exports = {
  process(src, filename) {
    return { code: `module.exports = '${filename}';` };
  },
  getCacheKey(src, filename) {
    return filename;
  },
};
