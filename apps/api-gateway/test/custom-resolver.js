/* eslint-disable @typescript-eslint/no-unused-vars */
module.exports = (moduleName, _paths, _option, _config) => {
  // Handle @elbruso/database and @elbruso/types specifically
  if (moduleName === '@elbruso/database') {
    return '/home/ivan/git/elbruso/packages/database/src/index.ts';
  }
  if (moduleName === '@elbruso/types') {
    return '/home/ivan/git/elbruso/packages/types/src/index.ts';
  }
  // Handle @database/* paths
  if (moduleName.startsWith('@database/')) {
    return moduleName.replace(
      '@database',
      '/home/ivan/git/elbruso/apps/api/src/database',
    );
  }
  return undefined;
};
