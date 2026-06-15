"use client";

import React from "react";

const DeleteAccount = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Delete Account
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-8">
            This page explains how users of the TaxShax application can request
            deletion of their account and associated personal data.
          </p>
        </div>

        {/* Intro */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">
            Account & Data Deletion Policy
          </h2>

          <p className="text-gray-300 leading-8 mb-4">
            TaxShax respects user privacy and provides users with the ability
            to request deletion of their account and associated personal data.
          </p>

          <p className="text-gray-300 leading-8">
            Users may request permanent deletion of their account at any time
            by following the steps described below.
          </p>
        </div>

        {/* How Deletion Works */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">
            How Account Deletion Works
          </h2>

          <div className="space-y-6 text-gray-300 leading-8">

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                1. Logout-Based Deletion
              </h3>

              <p>
                When a user logs out from the TaxShax app, the associated
                account and linked user data may be automatically removed
                from our active systems.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                2. Manual Deletion Request
              </h3>

              <p>
                Users may also request account deletion manually by sending
                an email to:
              </p>

              <p className="text-blue-400 font-semibold mt-2">
                info@itaxeasy.com
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                3. Required Information
              </h3>

              <ul className="list-disc ml-6 space-y-2">
                <li>Registered email address</li>
                <li>Registered phone number</li>
                <li>Username or full name</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                4. Verification Process
              </h3>

              <p>
                For security purposes, we may verify the identity of the user
                before processing deletion requests.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                5. Processing Time
              </h3>

              <p>
                Account deletion requests are generally processed within
                7 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Deleted Data */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">
            Data That Will Be Deleted
          </h2>

          <ul className="list-disc ml-6 text-gray-300 leading-8 space-y-3">
            <li>Username</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Account profile information</li>
            <li>Uploaded app-related user data</li>
          </ul>
        </div>

        {/* Retained Data */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">
            Data That May Be Retained
          </h2>

          <p className="text-gray-300 leading-8 mb-4">
            Certain information may be retained for a limited period where
            required for:
          </p>

          <ul className="list-disc ml-6 text-gray-300 leading-8 space-y-2">
            <li>Legal compliance</li>
            <li>Fraud prevention</li>
            <li>Security monitoring</li>
            <li>Dispute resolution</li>
          </ul>

          <p className="text-gray-300 leading-8 mt-4">
            Retained information is securely protected and is not used for
            marketing purposes.
          </p>
        </div>

        {/* Security */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">
            Data Security
          </h2>

          <p className="text-gray-300 leading-8">
            TaxShax uses secure encrypted communication channels and reasonable
            security measures to protect user information during transmission
            and storage.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Need Help?
          </h2>

          <p className="text-lg text-gray-100 mb-6 leading-8">
            If you have questions regarding account deletion, privacy,
            or data handling practices, please contact us.
          </p>

          <a
            href="mailto:info@itaxeasy.com"
            className="inline-block bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
          >
            info@itaxeasy.com
          </a>
        </div>

      </div>
    </div>
  );
};

export default DeleteAccount;