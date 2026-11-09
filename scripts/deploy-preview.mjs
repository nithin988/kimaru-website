// Builds the site and publishes only the compiled output to the public preview repo,
// which GitHub Pages serves at https://nithin988.github.io/kimaru-website-preview/
// The source code stays in the private kimaru-website repo.
import { execSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync, writeFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const OWNER = 'nithin988';
const REPO = 'kimaru-website-preview';
const sh = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' });

sh('pnpm exec tsc -b');
execSync(`pnpm exec vite build --outDir dist-preview --emptyOutDir`, { stdio: 'inherit', env: { ...process.env, VITE_BASE: `/${REPO}/` } });

const work = mkdtempSync(join(tmpdir(), 'kimaru-preview-'));
sh(`gh repo clone ${OWNER}/${REPO} "${work}"`);
for (const f of readdirSync(work)) if (f !== '.git') rmSync(join(work, f), { recursive: true, force: true });
cpSync('dist-preview', work, { recursive: true });
writeFileSync(join(work, '.nojekyll'), '');
writeFileSync(join(work, 'README.md'), 'Compiled design preview of the Kimaru website. Source lives in a private repo.\n');
sh('git add -A', work);
try {
  execSync('git -c user.name="nithin988" -c user.email="nithin@kimaru.ai" commit -q -m "Deploy preview build"', { cwd: work, stdio: 'inherit' });
  sh('git push origin HEAD:main', work);
} catch {
  console.log('No changes to deploy.');
}
rmSync(work, { recursive: true, force: true });
console.log(`Live at https://${OWNER}.github.io/${REPO}/ (allow a minute for Pages to update)`);
