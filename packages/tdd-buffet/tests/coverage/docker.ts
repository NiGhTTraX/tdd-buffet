/* eslint-disable */
function dontForgetToReplaceTheBaseDir() {
  return '/basedir/the/original/path'
    .replace('/basedir/', '/usr/src/app/');
}

dontForgetToReplaceTheBaseDir();
