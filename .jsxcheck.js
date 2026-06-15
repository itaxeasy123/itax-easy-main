const { parse } = require('@babel/parser');
const fs = require('fs');
const files = [
  'src/components/EasyServices/GstLinks/Searchbygstin.jsx',
  'src/components/EasyServices/GstLinks/Searchbypan.jsx',
  'src/components/EasyServices/GstLinks/Trackgstreturn.jsx',
  'src/components/EasyServices/IncomeTaxLinks/VerifyPanDetails.jsx',
  'src/components/EasyServices/IncomeTaxLinks/CheckPanAadhaarStatus.jsx',
  'src/components/EasyServices/IncomeTaxLinks/SearchTan.jsx',
  'src/components/EasyServices/BankLinks/VerifyBankDetails.jsx',
  'src/components/EasyServices/MCA/CompanyDetails.jsx',
  'src/components/EasyServices/MCA/DirectorDetails.jsx',
];
let fail = 0;
for (const f of files) {
  try {
    const code = fs.readFileSync(f, 'utf8');
    parse(code, { sourceType: 'module', plugins: ['jsx'] });
    console.log('OK   ' + f);
  } catch (e) {
    fail++;
    console.log('FAIL ' + f + '  -> ' + e.message);
  }
}
process.exit(fail ? 1 : 0);
