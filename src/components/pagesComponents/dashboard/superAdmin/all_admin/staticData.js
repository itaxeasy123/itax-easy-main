import regex from '@/utils/regex';
import { formatDate } from '@/utils/utilityFunctions';
import { z } from 'zod';

// create admin files

export const createAdminForm = {
  pan: '',
  aadhaar: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  fatherName: '',
  email: '',
  phone: '',
  password: '',
};

export const createAdminSchema = z.object({
  pan: z.string().regex(regex.PAN_CARD, 'Pan card is not valid!'),
  aadhaar: z.string().regex(regex.AADHAAR, 'Aadhaar card is not valid!'),
  firstName: z.string().min(1, 'First name is not valid!'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is not valid!'),
  gender: z.string('Gender is not valid!').min(1, 'Gender is not valid!'),
  fatherName: z.string().min(1, 'Fathers name is not valid!'),
  email: z.string().email('Email is not valid!'),
  phone: z.string().regex(regex.PHONE_RGX, 'Phone number is not valid!'),
  password: z
    .string()
    .min(6, 'Password needs to be at least 6 digits!')
    .max(20, 'Password is too long!'),
});

export const updateAdminSchema = z.object({
  pan: z.string().regex(regex.PAN_CARD, 'Pan card is not valid!'),
  aadhaar: z.string().regex(regex.AADHAAR, 'Aadhaar card is not valid!'),
  firstName: z.string().min(1, 'First name is not valid!'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is not valid!'),
  gender: z.string('Gender is not valid!').min(1, 'Gender is not valid!'),
  fatherName: z.string().min(1, 'Fathers name is not valid!'),
  email: z.string().email('Email is not valid!'),
  phone: z.string().regex(regex.PHONE_RGX, 'Phone number is not valid!'),
  password: z.string().optional(),
});

export const createAdminInputs = {
  pan: {
    id: 'pan',
    label: 'Pan*',
    type: 'text',
    placeholder: 'Enter your pan',
  },
  aadhaar: {
    id: 'aadhaar',
    label: 'Aadhaar*',
    type: 'text',
    placeholder: 'Enter your aadhaar',
  },
  gender: {
    id: 'gender',
    label: 'Gender*',
    type: 'select',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Others', value: 'others' },
    ],
    placeholder: 'Select your gender',
  },
  firstName: {
    id: 'firstName',
    label: 'First Name*',
    type: 'text',
    placeholder: 'Enter your first name',
  },
  middleName: {
    id: 'middleName',
    label: 'Middle Name (If Applicable)',
    type: 'text',
    placeholder: 'Enter your middle name',
  },
  lastName: {
    id: 'lastName',
    label: 'Last Name*',
    type: 'text',
    placeholder: 'Enter your last name',
  },
  fatherName: {
    id: 'fatherName',
    label: 'Father Name*',
    type: 'text',
    placeholder: 'Enter your father name',
  },
  email: {
    id: 'email',
    label: 'Email*',
    type: 'email',
    placeholder: 'Enter your email',
  },
  phone: {
    id: 'phone',
    label: 'Phone*',
    type: 'text',
    placeholder: 'Enter your phone',
  },
  password: {
    id: 'password',
    label: 'Password*',
    type: 'text',
    placeholder: 'Enter your password',
  },
};

// get admin files

export const getAdminTableHeaders = [
  {
    dataField: 'id',
    text: 'ID',
    formatter: (data) => (
      <div className="flex items-center">
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          #{data ?? 'N/A'}
        </span>
      </div>
    ),
  },
  {
    dataField: 'firstName',
    text: 'First Name',
    formatter: (data, row) => (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
            <span className="text-blue-500 font-semibold text-sm">
              {data?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-800">
            {data || 'N/A'}
          </div>
          <div className="text-xs text-gray-500">
            Administrator
          </div>
        </div>
      </div>
    ),
  },
  {
    dataField: 'lastName',
    text: 'Last Name',
    formatter: (data) => (
      <div>
        <span className="text-sm font-medium text-gray-900">{data ?? 'N/A'}</span>
      </div>
    ),
  },
  {
    dataField: 'email',
    text: 'Email',
    formatter: (data) => (
      <div>
        <span className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
          {data ?? 'N/A'}
        </span>
      </div>
    ),
  },
  {
    dataField: 'phone',
    text: 'Phone',
    formatter: (data) => (
      <div>
        <span className="text-sm font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded">
          {data ?? 'N/A'}
        </span>
      </div>
    ),
  },
  {
    dataField: 'aadhaar',
    text: 'Aadhaar',
    formatter: (data) => (
      <div>
        <span className="text-sm font-mono text-gray-700">
          {data ? `****-****-${data.slice(-4)}` : 'N/A'}
        </span>
      </div>
    ),
  },
  {
    dataField: 'address',
    text: 'Address',
    formatter: (data) => (
      <div className="max-w-xs">
        <span className="text-sm text-gray-600 truncate block" title={data}>
          {data ?? 'N/A'}
        </span>
      </div>
    ),
  },
  {
    dataField: 'pan',
    text: 'PAN',
    formatter: (data) => (
      <div>
        <span className="text-sm font-mono bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-100">
          {data ?? 'N/A'}
        </span>
      </div>
    ),
  },
  {
    dataField: 'createdAt',
    text: 'Created',
    formatter: (data) => (
      <div>
        <div className="text-sm text-gray-900">{formatDate(data)}</div>
        <div className="text-xs text-gray-500">
          {new Date(data).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </div>
    ),
  },
  {
    dataField: 'userType',
    text: 'Role',
    formatter: (data) => (
      <div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
          Administrator
        </span>
      </div>
    ),
  },
  {
    dataField: 'pin',
    text: 'PIN',
    formatter: (data) => (
      <div>
        <span className="text-sm font-mono text-gray-600">
          {data ? '****' : 'N/A'}
        </span>
      </div>
    ),
  },
];
