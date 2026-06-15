"use client"; // This file uses client-side features, so it should be a client component
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Calendar, Users, Building, Search, ArrowRight, ArrowLeft, Shield, CheckCircle, Eye, CreditCard, Hash, UserCheck, MapPin, User, Home, Briefcase, TrendingUp, DollarSign } from 'lucide-react';

const ITRInfoPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const itrForms = [
    {
      id: 'itr-1',
      title: 'ITR-1 (SAHAJ)',
      subtitle: 'For Salaried Individuals & Pensioners',
      icon: <User className="w-6 h-6" />,
      description: 'ITR-1 (SAHAJ) is the simplest form designed for salaried individuals, pensioners, and those with income from one house property. It is user-friendly and can be filed by resident individuals with total income up to ₹50 lakhs.',
      details: [
        'Income from salary/pension only',
        'Income from one house property (excluding cases where loss is brought forward)',
        'Income from other sources (interest, family pension, dividend, etc.)',
        'Total income should not exceed ₹50 lakhs',
        'Resident individuals only',
        'Cannot be used if foreign assets/income exists'
      ],
      dueDate: '31st July of assessment year (extended dates may apply)',
      applicableTo: 'Resident individuals with salary, pension, and house property income',
      whoCannotUse: [
        'Non-resident individuals',
        'Income from business or profession',
        'Capital gains income',
        'Income from more than one house property',
        'Agricultural income more than ₹5,000',
        'Foreign assets or income'
      ]
    },
    {
      id: 'itr-2',
      title: 'ITR-2',
      subtitle: 'For Individuals & HUFs without Business Income',
      icon: <Home className="w-6 h-6" />,
      description: 'ITR-2 is applicable for individuals and Hindu Undivided Families (HUFs) having income from sources other than business or profession. It covers capital gains, multiple house properties, and foreign income/assets.',
      details: [
        'Income from salary, house property, capital gains, and other sources',
        'Multiple house properties allowed',
        'Capital gains from sale of assets',
        'Foreign income and assets',
        'Income from lottery, horse races, etc.',
        'Directors of companies'
      ],
      dueDate: '31st July of assessment year (extended dates may apply)',
      applicableTo: 'Individuals and HUFs with capital gains, foreign income, or multiple properties',
      whoCannotUse: [
        'Income from business or profession',
        'Partnership firm partners',
        'Income from presumptive business',
        'Companies and other entities'
      ]
    },
    {
      id: 'itr-3',
      title: 'ITR-3',
      subtitle: 'For Individuals & HUFs with Business/Professional Income',
      icon: <Briefcase className="w-6 h-6" />,
      description: 'ITR-3 is designed for individuals and HUFs having income from proprietary business or profession. It includes detailed profit and loss account and balance sheet information for business activities.',
      details: [
        'Income from proprietary business or profession',
        'All other sources of income (salary, house property, capital gains)',
        'Detailed profit & loss account required',
        'Balance sheet mandatory for business',
        'Presumptive taxation under sections 44AD, 44ADA, 44AE',
        'Partner in partnership firms'
      ],
      dueDate: '31st October of assessment year (for audit cases), 31st July (for others)',
      applicableTo: 'Individuals and HUFs with business or professional income',
      whoCannotUse: [
        'Companies',
        'Partnership firms',
        'Trusts',
        'Individuals without business income'
      ]
    },
    {
      id: 'itr-4',
      title: 'ITR-4 (SUGAM)',
      subtitle: 'For Presumptive Business Income',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'ITR-4 (SUGAM) is a simplified form for individuals, HUFs, and partnership firms opting for presumptive taxation scheme. It is designed to reduce compliance burden for small businesses and professionals.',
      details: [
        'Presumptive taxation under sections 44AD, 44ADA, 44AE',
        'Business turnover up to ₹2 crores (44AD)',
        'Professional receipts up to ₹50 lakhs (44ADA)',
        'Goods carriage business (44AE)',
        'No requirement to maintain detailed books',
        'Simplified compliance for small businesses'
      ],
      dueDate: '31st July of assessment year',
      applicableTo: 'Small businesses and professionals under presumptive taxation',
      whoCannotUse: [
        'Income from other than presumptive business',
        'Companies',
        'Non-resident individuals',
        'Businesses not covered under presumptive schemes'
      ]
    }
  ];

  const itrServices = [
    {
      title: 'ITR Filing Online',
      icon: <FileText className="w-5 h-5" />,
      description: 'File your income tax return online with step-by-step guidance and instant validation',
      features: 'Auto-fill from Form 16, validation checks, online submission, acknowledgment'
    },
    {
      title: 'ITR Status Check',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Track the processing status of your filed ITR and download processed return',
      features: 'Real-time status, processing updates, download facility, refund tracking'
    },
    {
      title: 'ITR Correction',
      icon: <Shield className="w-5 h-5" />,
      description: 'File revised return or rectification request for errors in original ITR',
      features: 'Revised return filing, rectification requests, error correction, updated processing'
    },
    {
      title: 'Pre-filled ITR',
      icon: <User className="w-5 h-5" />,
      description: 'Access pre-filled ITR with income details from TDS, salary, and other sources',
      features: 'Auto-populated data, TDS details, salary information, bank interest'
    },
    {
      title: 'ITR Calculation',
      icon: <DollarSign className="w-5 h-5" />,
      description: 'Calculate tax liability, refund amount, and optimize tax planning',
      features: 'Tax calculation, refund estimation, deduction optimization, planning tools'
    },
    {
      title: 'ITR Documentation',
      icon: <Building className="w-5 h-5" />,
      description: 'Access ITR forms, instructions, and supporting documentation',
      features: 'Form downloads, instruction guides, tax tables, example calculations'
    }
  ];

  const comparisonData = [
    { aspect: 'Salary Income', itr1: '✓', itr2: '✓', itr3: '✓', itr4: '✓' },
    { aspect: 'House Property', itr1: 'One only', itr2: 'Multiple', itr3: 'Multiple', itr4: 'Multiple' },
    { aspect: 'Business Income', itr1: '✗', itr2: '✗', itr3: '✓', itr4: 'Presumptive only' },
    { aspect: 'Capital Gains', itr1: '✗', itr2: '✓', itr3: '✓', itr4: '✗' },
    { aspect: 'Foreign Income', itr1: '✗', itr2: '✓', itr3: '✓', itr4: '✗' },
    { aspect: 'Income Limit', itr1: '₹50 lakhs', itr2: 'No limit', itr3: 'No limit', itr4: 'As per scheme' },
    { aspect: 'Audit Required', itr1: '✗', itr2: '✗', itr3: 'If applicable', itr4: '✗' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Income Tax Return (ITR) Forms Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guide to ITR forms (ITR-1, ITR-2, ITR-3, ITR-4) with eligibility criteria, 
              due dates, and step-by-step filing assistance for Indian taxpayers.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding ITR Forms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Income Tax Return (ITR) is a form used to file information about your income and tax liability 
            to the Income Tax Department. The Government of India has notified different ITR forms for 
            different categories of taxpayers based on their income sources and nature.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Choosing the correct ITR form is crucial as filing in wrong form may lead to defective return. 
            Each form is designed for specific types of taxpayers and income sources, making the filing 
            process more streamlined and efficient.
          </p>
        </div>

        {/* ITR Forms Details */}
        <div className="space-y-6 mb-12">
          {itrForms.map((form) => (
            <div key={form.id} className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                onClick={() => toggleSection(form.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {form.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{form.title}</h3>
                      <p className="text-blue-600 font-medium">{form.subtitle}</p>
                    </div>
                  </div>
                  {openSection === form.id ? 
                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </div>
              </div>
              
              {openSection === form.id && (
                <div className="px-6 pb-6 border-t border-blue-100 bg-blue-50/30">
                  <div className="pt-6">
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {form.description}
                    </p>
                    
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Who Can Use:</h4>
                        <ul className="space-y-2">
                          {form.details.map((detail, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Who Cannot Use:</h4>
                        <ul className="space-y-2">
                          {form.whoCannotUse.map((restriction, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{restriction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Due Date</h5>
                          <p className="text-blue-600 font-medium text-sm">{form.dueDate}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Applicable To</h5>
                          <p className="text-gray-700 text-sm">{form.applicableTo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ITR Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ITR Forms Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-600">ITR-1</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-600">ITR-2</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-600">ITR-3</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-600">ITR-4</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-blue-100 hover:bg-blue-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.aspect}</td>
                    <td className="py-3 px-4 text-center">{row.itr1}</td>
                    <td className="py-3 px-4 text-center">{row.itr2}</td>
                    <td className="py-3 px-4 text-center">{row.itr3}</td>
                    <td className="py-3 px-4 text-center">{row.itr4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ITR Services */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ITR Filing Services</h2>
          <p className="text-gray-600 mb-8">
            Comprehensive ITR filing services and tools to simplify your income tax compliance 
            with expert guidance and automated features.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itrServices.map((service, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <div className="text-sm">
                  <span className="font-medium text-gray-900">Features: </span>
                  <span className="text-blue-600">{service.features}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Filing Guidelines */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Important ITR Filing Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Filing Requirements</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Choose correct ITR form based on income sources</li>
                <li>• File within due date to avoid late filing fee</li>
                <li>• Verify ITR within 120 days of filing</li>
                <li>• Keep all supporting documents ready</li>
                <li>• Report all income sources accurately</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Best Practices</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Use pre-filled ITR for faster filing</li>
                <li>• Double-check all calculations and details</li>
                <li>• Claim all eligible deductions and exemptions</li>
                <li>• Keep digital copies of filed returns</li>
                <li>• Stay updated with tax law changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITRInfoPage;
