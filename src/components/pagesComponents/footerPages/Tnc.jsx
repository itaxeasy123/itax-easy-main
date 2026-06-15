
'use client';
const Tnc = () => {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ================= HEADER ================= */}
      <section className="py-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Terms & Conditions
          </h1>
          <p className="text-white/70 mt-2 text-sm md:text-base">
            – FOR ITAX EASY –
          </p>
          <p className="text-white/60 mt-4 text-sm">
            Get access to customer-only benefits
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-4 pb-24 space-y-16">
        {/* INTRO */}
        <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base">
            Our Association With You Is Our Most Important Asset. We Want You To
            Feel Comfortable And Confident When Using Our Platform (defined
            Hereinafter) And The Services (defined Hereinafter). The Objectives
            Of These Terms And Conditions Of Use (“terms”) Are To Inform You Of
            The Terms Which Apply To Your Access To The Platform And Services,
            What We Expect From You, And What You Can Expect From Us As You Use
            And Interact With Our Platform And The Services Provided By Us, Our
            Strategic Partners And Third Party Service Providers.
          </p>
        </ContentCard>

        <ContentCard>
          <p className="tctext">
            The Platform Is Provided By Itax Easy Private Limited (shall Be
            Herein After Referred To As Itax Easy), A Company Incorporated On 24
            Dec 2019 Under The Companies Act 2013, Having Its Registered Office
            At G 41, Gandhi Nagar, Padav, Gwalior Madhya Pradesh 474002 And Its
            Corporate Office At Flat No 811 Sat 1 Sector 143 Noida 201306 Uttar
            Pradesh. User And Company Are Each A “party” And Collectively The
            “parties”.
          </p>

          <p className="tctext mt-4">
            These Terms Are An Electronic Record In Terms Of The Information
            Technology Act, 2000 And Rules Thereunder. By Registering Or Using
            The Platform You Agree To Be Bound By These Terms.
          </p>
        </ContentCard>

        {/* SECTION 1 */}
        <Section title="1. Responsible Use And Conduct">
            <ContentCard highlight>
            <p className="leading-relaxed text-sm md:text-base">
              In Order To Access Our Resources, You May Be Required To Provide
              Certain Information About Yourself (such As Identification, Email,
              Phone Number, Contact Details, Etc.) As Part Of The Registration
              Process, Or As Part Of Your Ability To Use The Resources. You
              Agree That Any Information You Provide Will Always Be Accurate,
              Correct, And Up To Date.. You Are Responsible For Maintaining The
              Confidentiality Of Any Login Information Associated With Any
              Account You Use To Access Our Resources. Accordingly, You Are
              Responsible For All Activities That Occur Under Your Accounts.
              Accessing ( (or Attempting To Access) Any Of Our Resources By Any
              Means Other Than Through The Means We Provide, Is Strictly
              Prohibited. You Specifically Agree Not To Access (or Attempt To
              Access) Any Of Our Resources Through Any Automated, Unethical Or
              Unconventional Means. Engaging In Any Activity That Disrupts Or
              Interferes With Our Resources, Including The Servers And/or
              Networks To Which Our Resources Are Located Or Connected, Is
              Strictly Prohibited. Attempting To Copy, Duplicate, Reproduce,
              Sell, Trade, Or Resell Our Resources Is Strictly Prohibited. You
              Are Solely Responsible Any Consequences, Losses, Or Damages That
              We May Directly Or Indirectly Incur Or Suffer Due To Any
              Unauthorized Activities Conducted By You, As Explained Above, And
              May Incur Criminal Or Civil Liability.
            </p>
            </ContentCard>
        </Section>

        {/* SECTION 2 */}
        <Section title="2. Privacy">
          <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base">
            Your Privacy Is Very Important To Us, Which Is Why We’ve Created A Separate Privacy Policy In Order To Explain In Detail How We Collect, Manage, Process, Secure, And Store Your Private Information. Our Privacy Policy Is Included Under The Scope Of This User Agreement. To Read Our Privacy Policy In Its Entirety, Click Here.
          </p>
          </ContentCard>
        </Section>

        {/* SECTION 3 */}
        <Section title="3. Limitation Of Warranties">
          <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base">
           By Using Our Website, You Understand And Agree That All Resources We Provide Are as Is And as Available. This Means That We Do Not Represent Or Warrant To You That:
          </p>
          </ContentCard>
        </Section>

        {/* SECTION 4 */}
        <Section title="4. Limitation Of Liability">
          <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base">
           In Conjunction With The Limitation Of Warranties As Explained Above, You Expressly Understand And Agree That Any Claim Against Us Shall Be Limited To The Amount You Paid, If Any, For Use Of Products And/or Services. Www.itaxeasy.com Will Not Be Liable For Any Direct, Indirect, Incidental, Consequential Or Exemplary Loss Or Damages Which May Be Incurred By You As A Result Of Using Our Resources, Or As A Result Of Any Changes, Data Loss Or Corruption, Cancellation, Loss Of Access, Or Downtime To The Full Extent That Applicable Limitation Of Liability Laws Apply.
          </p>
          </ContentCard>
        </Section>

        {/* SECTION 5 */}
        <Section title="5. Copyrights / Trademarks">
          <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base">
           All Content And Materials Available On Www.itaxeasy.com, Including But Not Limited To Text, Graphics, Website Name, Code, Images And Logos Are The Intellectual Property Of Itaxeasy Private Limited, And Are Protected By Applicable Copyright And Trademark Law. Any Inappropriate Use, Including But Not Limited To The Reproduction, Distribution, Display Or Transmission Of Any Content On This Site Is Strictly Prohibited, Unless Specifically Authorized By The Company.
          </p>
          </ContentCard>
        </Section>

        {/* SECTION 6 */}
        <Section title="6. Termination Of Use">
          <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base">
           You Agree That We May, At Our Sole Discretion, Suspend Or Terminate Your Access To All Or Part Of Our Website And Resources With Or Without Notice And For Any Reason, Including, Without Limitation, Breach Of This User Agreement. Any Suspected Illegal, Fraudulent Or Abusive Activity May Be Grounds For Terminating Your Relationship And May Be Referred To Appropriate Law Enforcement Authorities. Upon Suspension Or Termination, Your Right To Use The Resources We Provide Will Immediately Cease, And We Reserve The Right To Remove Or Delete Any Information That You May Have On File With Us, Including Any Account Or Login Information.
          </p>
          </ContentCard>
        </Section>

        {/* SECTION 7 */}
        <Section title="7. Governing Law">
          <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base ">
            This Website Is Controlled By Itaxeasy Private Limited From Our Offices Located In The State Of Delhi, India. It Can Be Accessed By Most Countries Around The World. all Disputes Arising Out Of Or In Connection With The Present Contract Shall Be Submitted To The Madhya Pradesh Arbitration Tribunal And Shall Be Finally Settled In Accordance With Arbitration Act And Rules By Appointing One Or More Arbitrators In Accordance With The Said Rules.
          </p>
          </ContentCard>
        </Section>

        {/* SECTION 8 */}
        <Section title="8. Cancellation And Refund">
          <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base">
            Cancellation Of Order Is Not Possible Once The Payment Has Been Made. No Refunds Will Be Given Except In The Event Of Cancellation Or Non-performance Of Service By ITAXEASY Private Limited.
          </p>
          </ContentCard>
        </Section>

        {/* SECTION 9 */}
        <Section title="9. Guarantee">
        <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base">
           Unless Otherwise Expressed, Www.itaxeasy.com.com Expressly Disclaims All Warranties And Conditions Of Any Kind, Whether Express Or Implied, Including, But Not Limited To The Implied Warranties And Conditions Of Merchantability, Fitness For A Particular Purpose And Non-infringement.
          </p>
          </ContentCard>
        </Section>

        {/* SECTION 10 */}
        <Section title="10. Contact Information">
        <ContentCard highlight>
          <p className="leading-relaxed text-sm md:text-base">
            If You Have Any Questions Or Comments About These Our Terms Of Service As Outlined Above, You Can Mail Us At:<br />
            <span className="text-blue-400">info@itaxeasy.com</span>
          </p>
          </ContentCard>
        </Section>

        {/* REFUND POLICY */}
        <Section title="Change to Refund & Cancellation Policy">
        <ContentCard highlight>   
          <p className="leading-relaxed text-sm md:text-base">
           At ITAXEASY , We Take Pride In The Services Delivered By Us And Guarantee Your Satisfaction With Our Services And Support. We Constantly Improve And Strive To Deliver The Best Accounting, Financial Or Secretarial Services Through The Internet. However, In Case You Are Not Satisfied With Our Services, Please Contact Us Immediately And We Will Correct The Situation, Provide A Refund Or Offer Credit That Can Be Used For Future ITAXEASY Orders.
          </p>
        </ContentCard>
        </Section>

       
      </section>
    </main>
  );
};

export default Tnc;

/* ================= COMPONENTS ================= */

const ContentCard = ({ children, highlight }) => (
  <div
    className={`rounded-3xl border border-white/10 p-6 md:p-8 backdrop-blur
      ${highlight ? 'bg-white/10' : 'bg-white/5'}`}
  >
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
    {children}
  </div>
);
