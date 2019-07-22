/* eslint-disable no-console */
import execa from 'execa';

export async function lint(files: string[] = ['.']) {
  await execa.command(`eslint --ext ts,tsx,js ${files.join(' ')}`, { stdio: 'inherit' });
}
