const invoice = '/icons/home/services/invoice.png';
const gst = '/icons/home/gst.png';
const hsn = '/icons/home/hsn.png';
const sac = '/icons/home/sac.png';

const BACK_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = 'https://ocr.itaxeasy.com';

import {
  Authentication,
  Bank,
  ImagePDF,
  Post_Office,
  E_KYC,
  Extraction,
  All_Apis,
  pan,
  ifsc,
  logout,
  login,
  signUp,
  pdfMerge,
  form16,
  google,
  aadhar,
  verify,
  pinCode,
  pinCity,
  compress,
} from './icons';

export const iconList = {
  Signup: { icon: signUp },
  'Admin SignUp': { icon: signUp },
  'Form-16': { icon: form16 },
  Aadhaar: { icon: aadhar },
  Pan: { icon: pan },
  Login: { icon: login },
  'Admin Login': { icon: login },
  Logout: { icon: logout },
  Invoice: { src: invoice },
  'E-KYC': { icon: E_KYC },
  'IFSC Details': { icon: ifsc },
  'Verify Accounts': { icon: verify },
  'PIN Code Info': { icon: pinCode },
  'PIN Code by City': { icon: pinCity },
  'PDF Merge': { icon: pdfMerge },
  'IMG to PDF': { icon: ImagePDF },
  Compress: { icon: compress },
  'Login with Google': { icon: google },
  'HSN Code API': { src: hsn },
  'SAC Code API': { src: sac },
  Verify: { icon: verify },
};

export const categories = [
  {
    id: 'all_apis',
    icon: All_Apis,
    title: 'All Apis',
    path: `${process.env.BACK_URL}/apis/get-all-apis`,
  },
  {
    id: 'authentication',
    icon: Authentication,
    title: 'Authentication',
    path: `${process.env.BACK_URL}/apis/authentication`,
  },
  {
    id: 'bank',
    icon: Bank,
    title: 'Bank',
    path: `${process.env.BACK_URL}/apis/bank`,
  },
  {
    id: 'image_pdf',
    icon: ImagePDF,
    title: 'Image/PDF',
    path: `${process.env.BACK_URL}/apis/image_pdf`,
  },
  {
    id: 'post_office',
    icon: Post_Office,
    title: 'Post Office',
    path: `${process.env.BACK_URL}/apis/post_office`,
  },
  {
    id: 'gst',
    src: gst,
    title: 'GST',
    path: `${process.env.BACK_URL}/apis/gst`,
  },
  {
    id: 'extraction_e_kyc',
    icon: Extraction,
    title: 'Extraction & E-KYC',
    path: `${process.env.BACK_URL}/apis/extraction_e_kyc`,
  },
];

export const list = [
  {
    title: 'Authentication',
    id: 'authentication',
    icon: Authentication,
    apis: [
      {
        upcoming: false,
        icon: signUp,
        label: 'SignUp',
        description:
          'API enables users to register for a service by sending a request with their information and receiving a response with status and authentication credentials.',
      },
      {
        upcoming: false,
        icon: login,
        label: 'Login',
        description:
          'API allows users to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.',
      },
      {
        upcoming: false,
        icon: signUp,
        label: 'Admin SignUp',
        description:
          'API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.',
      },
      {
        upcoming: false,
        icon: logout,
        label: 'Logout',
        description:
          'API allows users to log out of a system by sending a request to invalidate their current session and terminate authentication.',
      },
      {
        upcoming: true,
        icon: google,
        label: 'Login With Google',
        description:
          'API allows users to log in to a system using their Google credentials, enabling a secure and streamlined authentication process.',
      },
      {
        upcoming: false,
        icon: login,
        label: 'Admin Login',
        description:
          ' API allows administrators to create a new account by sending a request with their information and receiving a response with status and authentication credentials.',
      },
    ],
  },
  {
    title: 'Extraction E-KYC',
    id: 'extraction_e_kyc',
    icon: Extraction,
    apis: [
      {
        icon: form16,
        upcoming: false,
        label: 'Form-16',
        description:
          'The API uses OCR technology to convert the image data into machine-readable text and retrieve the required information, such as the employees name, PAN number, and salary details.',
      },
      {
        upcoming: false,
        icon: pan,
        label: 'Pan',
        description:
          'API is used to retrieve information about an individual or entitys PAN card, including the cardholders name, date of birth, and PAN number, using the PAN number as the key identifier.',
      },
      {
        upcoming: false,
        icon: aadhar,
        label: 'Aadhaar',
        description:
          'The unique identification number assigned to Indian citizens, for various purposes such as e-KYC (electronic Know Your Customer) verification, demographic data retrieval, and digital signature.',
      },
      {
        upcoming: false,
        icon: invoice,
        isPNG: true,
        label: 'Invoice',
        description:
          'Revamp your invoice management with our API-powered image recognition solution. Our API offers accurate and efficient recognition of invoice data, saving you time and effort. Say goodbye to manual data entry and hello to streamlined invoice processing. Get started today!',
      },
    ],
  },
  {
    title: 'Bank',
    id: 'bank',
    icon: Bank,
    apis: [
      {
        upcoming: false,
        icon: ifsc,
        label: 'IFSC Details',
        description:
          'The IFSC (Indian Financial System Code) Details API is used to retrieve information about a particular bank branch in India, including the banks name, address, contact details, and IFSC code, using the IFSC code as the key identifier.',
      },
      {
        upcoming: false,
        icon: verify,
        label: 'Verify Accounts',
        description:
          'API provides a simple way to verify the authenticity of a users account information, typically by sending a confirmation code to their email or phone number.',
      },
    ],
  },
  {
    title: 'Post Office',
    id: 'post_office',
    icon: Post_Office,
    apis: [
      {
        upcoming: false,
        icon: pinCode,
        label: 'Pin Code Info',
        description:
          'API provides access to information about postal codes, including location, state, district, and geographical coordinates.',
      },
      {
        icon: pinCity,
        upcoming: false,
        label: 'Pin Code by City',
        description:
          'Pin code API provides a solution for retrieving postal codes (known as PIN codes) based on a given city name.',
      },
    ],
  },
  {
    title: 'Image/PDF',
    id: 'image_pdf',
    icon: ImagePDF,
    apis: [
      {
        upcoming: true,
        label: 'PDF Merge',
        icon: pdfMerge,
        description:
          'PDF Merge APIs provide solutions for combining multiple PDF files into a single document.',
      },
      {
        upcoming: true,
        icon: ImagePDF,
        label: 'IMG To PDF',
        description:
          'Image to PDF APIs convert images to PDF format, supporting various image formats with customization options for the resulting PDF.',
      },
      {
        upcoming: true,
        icon: compress,
        label: 'Compress',
        description:
          'API offers a simple UI for compressing JPEG, PNG, GIF, and SVG images with bulk compression option.',
      },
    ],
  },
  {
    title: 'GST',
    id: 'gst',
    isPng: true,
    icon: gst,
    apis: [
      {
        upcoming: false,
        icon: hsn,
        isPNG: true,
        label: 'HSN Code API',
        description:
          'Get accurate HSN code information at your fingertips with our powerful API. Streamline your GST compliance processes and stay ahead of the game. Contact us today to learn more.',
      },
      {
        upcoming: false,
        isPNG: true,
        icon: sac,
        label: 'SAC Code API',
        description:
          'Integrate our API to streamline your business operations. Our user-friendly interface provides real-time information and automates processes, making it easy for you to manage your business. Plus, our API is fully compliant with GST regulations and accepts SAC codes for accurate reporting. Try it now and experience the benefits of seamless integration.',
      },
    ],
  },
];

export const apiDocsData = [
  {
    upcoming: false,
    id: 'signup',
    title: 'Signup',
    category: 'Authentication',
    overview:
      'API enables users to register for a service by sending a request with their information and receiving a response with status and authentication credentials',
    price: 500.0,
    endpoint: {
      method: 'post',
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/user/sign-up`,
       description: 'Register a new user account and generate authentication credentials'
    },
   
    responseJSON: `{
    "status": true,
    "results": {
        "status": 200,
        "message": "Registration Successfull",
        "data": {
            "id": 134,
            "email": "Vineetka@gmail.com",
            "first_name": "Vineet",
            "last_name": "Sharma",
            "phone": "9146732156",
            "pincode": "2411122"
        },
    }
}`,
  },
  {
    upcoming: false,
    title: 'Admin SignUp',
    id: 'adminsignup',
    category: 'Authentication',
    overview:
      'API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.',
    price: 500.0,
    endpoint: {
      method: 'post',
      endpoint: `https://itaxeasy.com/dashboard/admin`,
      description: 'Authenticate admin user and generate access token'
    },
    responseJSON: `{
    "status": true,
    "results": {
        "status": 200,
        "message": "Registration Successfull",
        "data": {
            "id": 134,
            "email": "Vineetka@gmail.com",
            "first_name": "Vineet",
            "last_name": "Sharma",
            "phone": "9146732156",
            "pincode": "2411122",
            "isAdmin": true
        },
    }
}`,
  },
  {
    upcoming: false,
    price: 500.0,
    title: 'Form-16',
    id: 'form-16',
    category: 'Extraction_E-KYC',
    overview:
      'The API uses OCR technology to convert the image data into machine-readable text and retrieve the required information, such as the employees name, PAN number, and salary details.',
    endpoint: {
      method: 'post',
      endpoint: `${BASE_URL}/api/parse_form16`,
      description: 'Extract data from Form 16 PDF documents',
    },

    responseJSON: `{
    employee_name": "Rohit Sharma",
    "employee_pan": "ABCDE1234F",
     "employer_name": "XYZ Technologies Pvt Ltd",
      "employer_tan": "DELX12345A",
     "financial_year": "2023-24",
      "assessment_year": "2024-25",
      
      "salary_details": {
    "gross_salary": 780000,
    "standard_deduction": 50000,
    "taxable_income": 730000
  },
  "tax_details": {
    "tds_deducted": 56000,
    "health_education_cess": 2240,
    "total_tax_payable": 58240
  },
   "document_info": {
    "form_type": "FORM-16",
    "quarter": "Q4",
    "certificate_number": "F16DUMMY789"
  },
  "status": "success",
  "message": "Form-16 data extracted successfully"
}`,
  },
  {
    price: 500.0,
    upcoming: false,
    title: 'Aadhaar',
    id: 'aadhaar',
    overview:
      'API allows user to send a file i.e. the image for aadhaar card and sends the response as a JSON object.',
    endpoint: {
      method: 'post',
      endpoint: 'https://ocr.itaxeasy.com/api/aadhar',
      description: 'Extract Aadhaar details from uploaded image using OCR.',
    },

    responseJSON: `{
      "status": "success",
  "message": "Aadhaar processed successfully",
  "extracted_fields": {
    "aadhaar_number": "0000 1111 2222",
    "name": "Demo User",
    "date_of_birth": "01/01/1990",
    "gender": "Male",
    "address": "Sample Street, Demo City, Test State, 000000"
  }
  }`,
  },
  {
    price: 500.0,
    upcoming: false,
    title: 'Pan',
    id: 'pan',
    category: 'Extraction_E-KYC',
    overview:
      'API allows user to send picture for PAN Card and sends the information of the pan card in json format.',
    endpoint: {
      method: 'post',
      endpoint: 'https://ocr.itaxeasy.com/api/pan',
      description: 'Extract PAN details from uploaded image using OCR.',
    },
    responseJSON: `{
      "status": "success",
  "message": "PAN processed successfully",
     "data": [
    {
      "label": "pan number",
      "confidence": 0.98,
      "text": "ABCDE0000X"
    },
     {
      "label": "name",
      "confidence": 0.97,
      "text": "Rohan Mehta"
    },
    {
      "label": "father's name",
      "confidence": 0.96,
      "text": "Suresh Mehta"
    },
    {
      "label": "dob",
      "confidence": 0.95,
      "text": "15/08/1995"
    }
  ]
  }`,
  },

  {
    upcoming: false,
    price: 500.0,
    title: 'Login',
    id: 'login',
    category: 'Authentication',
    overview:
      'API allows users to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token',
    endpoint: {
      method: 'post',
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      description: 'Authenticate user and generate access token'
    },
    responseJSON: `{
    "status": true,
    "results": {
        "status": 200,
        "message": "login successfull",
        "data": {
            "id": 54,
            "email": "vxxxxxxxxxxu@gmail.com",
            "first_name": "Vineet",
            "last_name": "Sharma",
            "userType": "normal",
            "phone": "8xxxxxxxx5",
            "pincode": "241122",
            "isverified": true
        },
}`,
  },
  {
    price: 500.0,
    upcoming: false,
    title: 'Admin Login',
    id: 'adminlogin',
    category: 'Authentication',
    overview:
      'API allows administrators to create a new account by sending a request with their information and receiving a response with status and authentication credentials.',
    endpoint: {
      method: 'post',
      endpoint: `https://itaxeasy.com/dashboard/admin`,
      description: 'Authenticate admin user and generate access token'
    },
   
    responseJSON: `{
    "status": true,
    "results": {
        "status": 200,
        "message": "login successfull",
        "data": {
            "id": 54,
            "email": "vxxxxxxxxxxu@gmail.com",
            "first_name": "Vineet",
            "last_name": "Sharma",
            "userType": "normal",
            "phone": "8xxxxxxxx5",
            "pincode": "241122",
            "isverified": true,
            "isAdmin": true
        },
}`,
  },
  {
    price: 500.0,
    upcoming: false,
    title: 'Logout',
    id: 'logout',
    category: 'Authentication',
    overview:
      'API allows users to log out of a system by sending a request to invalidate their current session and terminate authentication.',
    endpoint: {
      method: 'post',
      endpoint: `${BACK_URL}/`,
    },
    headers: [
      {
        name: 'x-apideck-consumer-id',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    queryParams: [
      {
        name: 'x-apideck-consumer-id',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'x-apideck-consumer-id',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    responseJSON: `curl --request POST
--url https://api.sandbox.co.in/
--header 'Accept: application/json'
--header 'Content-Type: application/json'
--header 'x-api-version: 1.0' \ --data`,
  },
  {
    price: 500.0,
    upcoming: false,
    title: 'Pan',
    id: 'pan',
    category: 'Pan',
    overview:
      'API is used to retrieve information about an individual or entitys PAN card, including the cardholders name, date of birth, and PAN number, using the PAN number as the key identifier',
    endpoint: {
      method: 'post',
      endpoint: `${BACK_URL}/pan/get-pan-details`,
    },
   
    queryParams: [
      {
        name: 'pan',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: '@entity',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pan',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'full_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'aadhaar_seeding_status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'category',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_updated',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    responseJSON: `{
    "status": "success",
    "company": {
        "@entity": "pan",
        "pan": "A********F",
        "first_name": "Rachit",
        "last_name": "Kumar",
        "full_name": "Shri Rachit Kumar",
        "aadhaar_seeding_status": "Y",
        "status": "VALID",
        "category": "Individual",
        "last_updated": "06/10/2020",
        
    }
}`,
  },
  {
    price: 500.0,
    upcoming: false,
    title: 'Aadhar',
    id: 'aadhaar',
    category: 'Extraction_E-KYC',
    overview:
      'The unique identification number assigned to Indian citizens, for various purposes such as e-KYC (electronic Know Your Customer) verification, demographic data retrieval, and digital signature',
    endpoint: {
      method: 'post',
      endpoint: `${BACK_URL}/pan/verify_aadhar`,
    },
    queryParams: [
      {
        name: 'aadhar',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: '@entity',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pan',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'full_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'aadhaar_seeding_status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'category',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_updated',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'D.O.B',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'driver_license',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'voter_id',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    responseJSON: `{
    "status": "success",
    "company": {
        "@entity": "pan",
        "pan": "A********F",
        "first_name": "Rishab",
        "last_name": "Rawat",
        "full_name": "Shri Rishab Rawat",
        "aadhaar_seeding_status": "Y",
        "status": "VALID",
        "category": "Individual",
        "last_updated": "06/10/2020",
        "D.O.B": "02/10/1985",
        "driver_license": "DL-12345678901234",
        "voter_id": "ABC1234567" 
    }
}`,
  },
  {
    upcoming: false,
    title: 'Invoice',
    id: 'invoice',
    category: 'Extraction_E-KYC',
    overview:
      'API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.',
    price: 500.0,
    endpoint: {
      method: 'post',
      endpoint: 'https://ocr.itaxeasy.com/api/invoice',
      description: 'Extract data from invoice documents using OCR technology',
    },

    responseJSON: `{
  "code": 200,
   "data": {
    "data": {
      "err_cd": "",
      "err_msg": "",
      "proc_cnt": "8",
      "status_cd": "P",
      "transTypCd": "SAV"
    },
    "status_cd": "1"
  },
  "timestamp": 1763446641000,
  "transaction_id": "619ed667-3bc3-4fc2-954c-340174e52a53"
        },
    }
}`,
  },
  {
    upcoming: false,
    price: 500.0,
    title: 'E-KYC',
    id: 'ekyc',
    overview:
      'E-KYC APIs provide electronic verification of individuals from goverment database',
    endpoint: {
      method: 'post',
      endpoint: `${BACK_URL}/pan/verify_aadhar`,
    },
  
    queryParams: [
      {
        name: 'aadhar',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: '@entity',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pan',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'full_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'aadhaar_seeding_status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'category',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_updated',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    responseJSON: `{
    "status": "success",
    "company": {
        "@entity": "pan",
        "pan": "A********F",
        "first_name": "Rishab",
        "last_name": "Singh",
        "full_name": "Shri Rishab Singh",
        "aadhaar_seeding_status": "Y",
        "status": "VALID",
        "category": "Individual",
        "last_updated": "06/10/2020"
    }
}`,
  },
  {
    upcoming: false,
    price: 500.0,
    title: 'IFSC Details',
    id: 'ifscdetails',
    category: 'Bank',
    overview:
      'The IFSC (Indian Financial System Code) Details API is used to retrieve information about a particular bank branch in India, including the banks name, address, contact details, and IFSC code, using the IFSC code as the key identifier.',
    endpoint: {
      method: 'post',
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/bank/details?ifsc={IFSC_CODE}`,
      description: 'Fetch bank branch details using IFSC code',
    },
    responseJSON: `{
        "data": {
        "MICR": null,
        "BRANCH": "Noida Branch",
        "ADDRESS": "B-121, Sector-5,Noida-201301",
        "STATE": "UTTAR PRADESH",
        "CONTACT": "+911133996699",
        "UPI": true,
        "RTGS": true,
        "CITY": "NOIDA",
        "CENTRE": "Gautam Buddh Nagar",
        "DISTRICT": "Gautam Buddh Nagar",
        "NEFT": true,
        "IMPS": true,
        "SWIFT": null,
        "ISO3166": "IN-UP",
        "BANK": "Paytm Payments Bank",
        "BANKCODE": "PYTM",
        "IFSC": "PYTM0123456"
    }
        }`,
  },
  {
    upcoming: false,
    price: 500.0,
    title: 'Verify Accounts',
    id: 'verifyaccounts',
    category: 'Bank',
    overview:
      'API provides a simple way to verify the authenticity of a users account information, typically by sending a confirmation code to their email or phone number.',
    endpoint: {
      method: 'post',
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/bank/verify-account`,
      description: 'Verify user account information through confirmation code',
    },

    responseJSON: `{
    "status": "success",
      "verification_id": "AVR_DEMO_102938",
      "message": "Account verification completed",
       "data": {
        "account_holder_name": "Test Customer",
         "masked_account_number": "XXXXXX7845",
          "ifsc_code": "TEST0005678",
          "bank_name": "Demo National Bank",
          "branch": "Sample Branch",
          "verification_status": "verified"
            }
          }`,
  },
  {
    upcoming: false,
    price: 500.0,
    title: 'PIN Code Info',
    id: 'pincodeinfo',
    category: 'Post_Office',
    overview:
      'API provides access to information about postal codes, including location, state, district, and geographical coordinates.',
    endpoint: {
      method: 'get',
      endpoint:
        `${process.env.NEXT_PUBLIC_API_URL}/pincode/info-by-pincode?pincode={PINCODE}`,
      description: 'Fetch location details using PIN code',
    },
    responseJSON: `{
    "success": true,
    "info": [
        {
            "officeName": "Defence Colony S.O (Meerut)",
            "pincode": 250001,
            "taluk": "Meerut",
            "districtName": "Meerut",
            "stateName": "UTTAR PRADESH"
        },
    ]
}`,
  },
  {
    upcoming: false,
    price: 500.0,
    title: 'PIN Code by City',
    id: 'pincodebycity',
    category: 'Post_Office',
    overview:
      'Pin code API provides a solution for retrieving postal codes (known as PIN codes) based on a given city name.',
    endpoint: {
      method: 'get',
      endpoint:
        `${process.env.NEXT_PUBLIC_API_URL}/pincode/pincode-by-city?city={CITY_NAME}`,
      description: 'Fetch PIN codes based on city name',
    },

    responseJSON: `{
   "status": "success",
  "data": [
    {
      "city": "Demo City",
      "pincode": "123456",
      "district": "Sample District",
      "state": "Test State"
    },
    {
      "city": "Demo City",
      "pincode": "123457",
      "district": "Sample District",
      "state": "Test State"
    }
  ]
  }`,
  },
  {
  upcoming: false,
  price: 500.0,
  title: 'PDF Merge',
  id: 'pdfmerge',
  category: 'Image_PDF',
  overview:
    'PDF Merge API allows combining multiple PDF files into a single merged PDF document.',
  endpoint: {
    method: 'post',
    endpoint: 'http://localhost:3001/easyservice/merge-pdf',
    description: 'Merge multiple PDF files into one PDF document',
  },

  responseJSON: `{
  "status": "success",
  "message": "PDF files merged successfully",
  "data": {
    "merged_file_url": "https://demo-storage.itaxeasy.com/files/merged-demo.pdf",
    "total_files": 3
  }
}`,
},
  {
  upcoming: false,
  price: 500.0,
  title: 'IMG to PDF',
  id: 'imgtopdf',
  category: 'Image_PDF',
  overview:
    'Image to PDF API converts one or multiple images into a single PDF document. It supports common image formats such as JPG, PNG and JPEG.',

  endpoint: {
    method: 'post',
    endpoint: 'http://localhost:3001/easyservice/img-to-pdf',
    description: 'Convert uploaded images into a single PDF document',
  },

  responseJSON: `{
  "status": "success",
  "message": "Images converted to PDF successfully",
  "data": {
    "pdf_file_url": "https://demo-storage.itaxeasy.com/files/image-to-pdf-demo.pdf",
    "total_images": 3
  }
}`,
},

  {
  upcoming: false,
  price: 500.0,
  title: 'Compress',
  category: 'Image_PDF',
  id: 'compress',

  overview:
    'Compress API reduces the file size of images or PDF documents while maintaining acceptable quality. It supports formats such as JPEG, PNG, GIF and SVG with bulk compression capability.',

  endpoint: {
    method: 'post',
    endpoint: 'http://localhost:3001/easyservice/compress',
    description: 'Compress image or PDF files to reduce file size'
  },
  responseJSON: `{
  "status": "success",
  "message": "File compressed successfully",
  "data": {
    "compressed_file_url": "https://demo-storage.itaxeasy.com/files/compressed-demo-file.pdf",
    "original_size": "4.8 MB",
    "compressed_size": "1.9 MB",
    "compression_ratio": "60%"
  }
}`
},
  {
    upcoming: true,
    price: 500.0,
    title: 'Login with Google',
    id: 'loginwithgoogle',
    category: 'Authentication',
    overview:
      'API allows users to log in to a system using their Google credentials, enabling a secure and streamlined authentication process.',
    endpoint: {
      method: 'post',
      endpoint: `${BACK_URL}/login/google`,
    },
    queryParams: [],
    response: [],
    responseJSON: ``,
  },
  {
    upcoming: false,
    title: 'HSN Code API',
    id: 'hsncodeapi',
    category: 'GST',
    overview:
      'API allows user to fetch all HSN Codes via a GET request and sends as a JSON object in response to the request',
    price: 500.0,
    endpoint: {
      method: 'get',
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/hsn/getallhsncode`,
      description: 'Retrieve all HSN codes with their descriptions used for GST classification of goods'
    },

    responseJSON: `{
      "status": true,
      "message": "hsn code",
      "data": [
          {
              "id": 2,
              "hsn_code": 1,
              "description": "Live Animals; Animal Products",
              "createdAt": "2022-11-18T18:55:39.000Z",
              "updatedAt": "2022-11-18T18:57:46.000Z"
          },
          {
              "id": 3,
              "hsn_code": 101,
              "description": "LIVE HORSES, ASSES, MULES AND HINNIES - Horses:",
              "createdAt": "2022-11-18T18:55:39.000Z",
              "updatedAt": "2022-11-18T18:57:46.000Z"
          },
          {
              "id": 4,
              "hsn_code": 1011010,
              "description": "LIVE HORSES, ASSES, MULES AND HINNIES PURE-BRED BREEDING ANIMALS HORSES",
              "createdAt": "2022-11-18T18:55:39.000Z",
              "updatedAt": "2022-11-18T18:57:46.000Z"
          },
          {
              "id": 5,
              "hsn_code": 1011020,
              "description": "LIVE HORSES, ASSES, MULESANDHINNIES PURE-BRED BREEDING ANIMALS ASSES",
              "createdAt": "2022-11-18T18:55:39.000Z",
              "updatedAt": "2022-11-18T18:57:46.000Z"
          },

          ....rest of the response`,
  },
  {
    upcoming: false,
    title: 'SAC Code API',
    id: 'saccodeapi',
    category: 'GST',
    overview:
      'API allows user to fetch all SAC Codes via a GET request and sends as a JSON object in response to the request',
    price: 500.0,
    endpoint: {
      method: 'get',
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/hsn/getallsaccodes`,
      description: 'Retrieve all SAC codes with their descriptions used for GST classification of services'
    },
    responseJSON: `{
      "status": true,
      "message": "Sac code",
      "data": [
          {
              "id": 2,
              "code": 99,
              "description": "All Services",
              "createdAt": "2022-11-18T19:06:09.000Z",
              "updatedAt": "2022-11-18T19:06:09.000Z"
          },
          {
              "id": 3,
              "code": 9954,
              "description": "Construction services",
              "createdAt": "2022-11-18T19:06:09.000Z",
              "updatedAt": "2022-11-18T19:06:09.000Z"
          },
          {
            "id": 4,
            "code": 995411,
            "description": "Construction services of single dwelling or multi dwelling or multi-storied residential buildings",
            "createdAt": "2022-11-18T19:06:09.000Z",
            "updatedAt": "2022-11-18T19:06:09.000Z"
        },
          ....rest of the response`,
  },
];
