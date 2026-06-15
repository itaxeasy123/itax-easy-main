import userbackAxios from './userbackAxios';

// Invoice create karne ke liye
export async function createInvoice(data) {
  return userbackAxios.post('/api/invoice', data);
}

// Aadhar process karne ke liye
export async function processAadhar(data) {
  return userbackAxios.post('/api/aadhar', data);
}

// Pan process karne ke liye
export async function processPan(data) {
  return userbackAxios.post('/api/pan', data);
}

// Form16 process karne ke liye
export async function parseForm16(data) {
  return userbackAxios.post('/api/parse_form16', data);
}

// Driving licence process karne ke liye
export async function processDrivingLicence(data) {
  return userbackAxios.post('/api/driving_licence', data);
}

// Bank statement process karne ke liye
export async function processBankStatement(data) {
  return userbackAxios.post('/api/process-bank-statement', data);
}

// GST process karne ke liye
export async function processGst(data) {
  return userbackAxios.post('/api/process-gst', data);
}
