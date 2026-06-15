const parser = require('@babel/parser');
const fs = require('fs');
const files = [
  'src/components/pagesComponents/profile/UserProfile.js',
  'src/components/pagesComponents/profile/BusinessProfile.js',
  'src/components/pagesComponents/profile/UserProfileCard.js',
  'src/components/pagesComponents/profile/BProfileCard.js',
  'src/components/pagesComponents/profile/UserProfileSkeleton.js',
  'src/components/pagesComponents/profile/BusinessProfileSkeleton.js',
  'src/app/profile/loading.js',
  'src/components/pagesComponents/profile/Tick.js',
  'src/components/pagesComponents/profile/Loader.js',
];
let ok = true;
for (const f of files) {
  try {
    const code = fs.readFileSync(f, 'utf8');
    parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    console.log('PARSE OK   ', f);
  } catch (e) {
    ok = false;
    console.log('PARSE FAIL ', f, '->', e.message);
  }
}
process.exit(ok ? 0 : 1);
