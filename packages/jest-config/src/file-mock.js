module.exports = {
  process(src, filename) {
    return `module.exports = '${filename}';`;
  },
  getCacheKey(src, filename) {
    return filename;
  },
};
