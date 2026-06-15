'use client';
import React from 'react';

const DisclaimerPolicy = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ================= HEADER ================= */}
      <section className="relative py-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Disclaimer Policy
          </h1>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-4 pb-24 space-y-12">
        {/* INTRO */}
        <GlassCard>
          <p className="text-sm md:text-base leading-relaxed text-white/80">
            The Itaxeasy Is An Online Consulting Website And A One Stop Solution
            For All Your Routine Compliances. Please Read This Document
            Carefully Before Accessing Or Using The Site. By Accessing Or Using
            The Site, You Agree To Be Bound By The Terms And Conditions Set
            Forth Below. If You Do Not Wish To Be Bound By These Terms And
            Conditions, You May Not Access Or Use The Site. Itax Easy may Modify
            This Agreement At Any Time, And Such Modifications Shall Be
            Effective Immediately Upon Posting Of The Modified Agreement On The
            Site. You Agree To Review The Agreement Periodically To Be Aware Of
            Such Modifications And Your Continued Access Or Use Of The Site
            Shall Be Deemed Your Conclusive Acceptance Of The Modified
            Agreement.
          </p>
        </GlassCard>

        {/* SECTION 1 */}
        <PolicySection title="1. Copyright, Licenses and Idea Submissions">
          <p className="policy-text">
            The Entire Contents Of The Site Are Protected By International
            Copyright And Trademark Laws. The Owner Of The Copyrights And
            Trademarks Are Itax Easy, Its Affiliates Or Other Third Party
            Licensors. You May Not Modify, Copy, Reproduce, Republish, Upload,
            Post, Transmit, Or Distribute, In Any Manner, The Material On The
            Site, Including Text, Graphics, Code And/or Software. You May Print
            And Download Portions Of Material From The Different Areas Of The
            Site Solely For Your Own Non-commercial Use Provided That You Agree
            Not To Change Or Delete Any Copyright Or Proprietary Notices From
            The Materials. You Agree To Grant To Itax Easya Non-exclusive,
            Royalty-free, Worldwide, Perpetual License, With The Right To
            Sub-license, To Reproduce, Distribute, Transmit, Create Derivative
            Works Of, Publicly Display And Publicly Perform Any Materials And
            Other Information (including, Without Limitation, Ideas Contained
            Therein For New Or Improved Products And Services) You Submit To Any
            Public Areas Of The Site (such As Bulletin Boards, Forums And
            Newsgroups) Or By E-mail To Itax Easy by All Means And In Any Media
            Now Known Or Hereafter Developed. You Also Grant To Itax Easy the
            Right To Use Your Name In Connection With The Submitted Materials
            And Other Information As Well As In Connection With All Advertising,
            Marketing And Promotional Material Related Thereto. You Agree That
            You Shall Have No Recourse Against Itax Easy for Any Alleged Or
            Actual Infringement Or Misappropriation Of Any Proprietary Right In
            Your Communications To Itax Easy.
          </p>
        </PolicySection>

        {/* TRADEMARKS */}
        <PolicySection title="Trademarks">
          <p className="policy-text">
            Publications, Products, Content Or Services Referenced Herein Or On
            The Site Are The Exclusive Trademarks Or Service marks Of Itax Easy.
            Other Product And Company Names Mentioned In The Site May Be The
            Trademarks Of Their Respective Owners.
          </p>
        </PolicySection>

        {/* SECTION 2 */}
        <PolicySection title="2. Use of the Site">
          <p className="policy-text">
            Except For The Information, Products Or Services Clearly Identified
            As Being Supplied By Itax Easy, Itax Easy does Not Operate, Control
            Or Endorse Any Information, Products Or Services On The Internet In
            Any Way. Except For Itax Easy- Identified Information, Products Or
            Services, All Information, Products And Services Offered Through The
            Site Or On The Internet Generally Are Offered By Third Parties, That
            Are Not Affiliated With Itax Easy. You Also Understand That Itax
            Easy cannot And Does Not Guarantee Or Warrant That Files Available
            For Downloading Through The Site Will Be Free Of Infection Or
            Viruses, Worms, Trojan Horses Or Other Code That Manifest
            Contaminating Or Destructive Properties. You Are Responsible For
            Implementing Sufficient Procedures And Checkpoints To Satisfy Your
            Particular Requirements For Accuracy Of Data Input And Output, And
            For Maintaining A Means External To The Site For The Reconstruction
            Of Any Lost Data.
          </p>

          <p className="policy-text">
            You assume full responsibility for your use of the site. All
            services are provided “as is” without warranties of any kind,
            including merchantability or fitness for a particular purpose.
          </p>
        </PolicySection>

        {/* LIABILITY */}
        <PolicySection title="Limitation of Liability">
          <p className="policy-text">
            <strong>In No Event Will Itax Easy be Liable For</strong> (i) Any
            Incidental, Consequential, Or Indirect Damages (including, But Not
            Limited To, Damages For Loss Of Profits, Business Interruption, Loss
            Of Programs Or Information, And The Like) Arising Out Of The Use Of
            Or Inability To Use The Service, Or Any Information, Or Transactions
            Provided On The Service, Or Downloaded From The Service, Or Any
            Delay Of Such Information Or Service. Even If Itax Easy Or Its
            Authorized Representatives Have Been Advised Of The Possibility Of
            Such Damages, Or
          </p>
          <p className="policy-text">
            (ii) Any Claim Attributable To Errors, Omissions, Or Other
            Inaccuracies In The Service And/or Materials Or Information
            Downloaded Through The Service. Because Some States Do Not Allow The
            Exclusion Or Limitation Of Liability For Consequential Or Incidental
            Damages, The Above Limitation May Not Apply To You. In Such States,
            Itax Easy Liability Is Limited To The Greatest Extent Permitted By
            Law.
          </p>
        </PolicySection>

        {/* INDEMNIFICATION */}
        <PolicySection title="3. Indemnification">
          <p className="policy-text">
            You Agree To Indemnify, Defend And Hold Harmless Itax Easy, Its
            Officers, Directors, Employees, Agents, Licensors, Suppliers And Any
            Third Party Information Providers To The Service From And Against
            All Losses, Expenses, Damages And Costs, Including Reasonable
            Attorneys, Fees, Resulting From Any Violation Of This Agreement
            (including Negligent Or Wrongful Conduct) By You Or Any Other Person
            Accessing The Service.
          </p>
        </PolicySection>

        {/* THIRD PARTY RIGHTS */}
        <PolicySection title="4. Third Party Rights">
          <p className="policy-text">
            The Provisions Of Paragraphs 2 (use Of The Service), And 3
            (indemnification) Are For The Benefit Of Itax Easy And Its Officers,
            Directors, Employees, Agents, Licensors, Suppliers, And Any Third
            Party Information Providers To The Service. Each Of These
            Individuals Or Entities Shall Have The Right To Assert And Enforce
            Those Provisions Directly Against You On Its Own Behalf.
          </p>
        </PolicySection>

        {/* TERMINATION */}
        <PolicySection title="5. Terms Termination">
          <p className="policy-text">
            This Agreement May Be Terminated By Either Party With A Notice Of 30
            Days Along With The Reason. The Provisions Of Paragraphs 1
            (copyright, Licenses And Idea Submissions), 2 (use Of The Service),
            3 (indemnification), 4 (third Party Rights) And 6 (miscellaneous)
            Shall Survive Any Termination Of This Agreement.
          </p>
        </PolicySection>

        {/* MISC */}
        <PolicySection title="6. Miscellaneous">
          <p className="policy-text">
            This Agreement Shall All Be Governed And Construed In Accordance
            With The Laws Of India Applicable To Agreements Made And To Be
            Performed In India. You Agree That any Dispute Or Difference
            Whatsoever Arising Between The Parties Out Of Or Relating To The
            Construction, Meaning, Scope Operation Or Effect Of This Contract Or
            The Validity Or The Breach Thereof Shall Be Settled By Arbitration
            In Accordance With Clause 13 Of The Agreement Entered Between The
            Company And The End User On The Date He Used The Website And The
            Award Made In Pursuance Thereof Shall Be Binding On The Parties.
            Any Cause Of Action Or Claim You May Have With Respect To The
            Service Must Be Commenced Within One (1) Year After The Claim Or
            Cause Of Action Arises Or Such Claim Or Cause Of Action Is Barred.
            Itax Easy Failure To Insist Upon Or Enforce Strict Performance Of
            Any Provision Of This Agreement Shall Not Be Construed As A Waiver
            Of Any Provision Or Right. Neither The Course Of Conduct Between The
            Parties Nor Trade Practice Shall Act To Modify Any Provision Of This
            Agreement. Itax Easymay Assign Its Rights And Duties Under This
            Agreement To Any Party At Any Time Without Notice To You. Any Rights
            Not Expressly Granted Herein Are Reserved.
          </p>
        </PolicySection>
      </section>
    </main>
  );
};

export default DisclaimerPolicy;

/* ================= REUSABLE UI ================= */

const GlassCard = ({ children }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
    {children}
  </div>
);

const PolicySection = ({ title, children }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-4 backdrop-blur">
    <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
    {children}
  </div>
);

/* ================= TEXT STYLE ================= */

const policyTextClass = 'text-sm md:text-base leading-relaxed text-white/80';

const style = `
  .policy-text {
    ${policyTextClass}
  }
`;
