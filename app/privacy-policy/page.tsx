import Header from "@/Components/Header";
import Footer from "@/Components/UI/Footer";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <Header />
      <div className="mx-8 md:mx-36 mt-28 md:mt-36 mb-16 md:mb-20">
        <div className="text-xl md:text-4xl font-serif font-semibold text-blue-800 text-left">
          Privacy Policy
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          Nzuri Healthcare Recruitment Limited are committed to protecting and
          respecting your privacy. This policy with our{" "}
          <strong>
            <Link href="/terms-and-conditions">terms of use</Link>
          </strong>{" "}
          and any other documents referred to on it sets out the basis on which
          any personal data we collect from you, or that you provide to us, will
          be processed by us. <br />
          Please read the following carefully to understand our views and
          practices regarding your personal data and how we will treat it. Our
          policy complies with the Data Protection Act 2018 (Act) accordingly
          incorporating the EU General Data Protection Regulation (GDPR). The
          law requires us to tell you about your rights and our obligations to
          you in regards to the processing and control of your personal data.
        </p>
        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title">
          Information we may collect from you
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          We may collect and process the following data about you:
        </p>
        <ul className="text-justify list-disc list-inside ml-4 md:ml-6 text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          <li>
            Contain any material which is defamatory of any person Information
            that you provide by filling in forms on our site {" "}
            <a href="mailto:info@nzuricares.co.uk" className="font-bold text-blue-800">
            info@nzuricares.co.uk.
          </a> This includes information
            provided at the time of subscribing to our publications, enquiring
            about our services, making a general enquiry, applying for jobs or
            to become a volunteer. We may also ask you for information when you
            report a problem with our site.{" "}
          </li>
          <li>
            If you contact us, we may keep a record of that correspondence
          </li>
        </ul>
        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title">
          IP Addresses
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          We may collect information about your computer, including where
          available your IP address, operating system and browser type for
          system administration
        </p>
        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title">
          Where we store your personal data
        </div>
        <ul className="text-justify list-disc list-inside ml-4 md:ml-6 text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          <li>
            To ensure that content from our site is presented in the most
            effective manner for you and for your computer.
          </li>
          <li>To notify you about changes to our service.</li>
        </ul>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          If you do not want us to use your data in this way, please tick the
          relevant box situated on the form on which we collect your data (the
          registration form){" "}
        </p>
        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title">
          Lawful basis for processing
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          We use information held about you in the following ways:
        </p>
        <ul className="text-justify list-disc list-inside ml-4 md:ml-6 text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          <li>
            whether the same objective could be achieved through other means
          </li>
          <li>whether processing (or not processing) might cause you harm</li>
          <li>
            whether you would expect us to process your data, and whether you
            would, in the round, consider it reasonable to do so
          </li>
        </ul>
        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title">
          Disclosure of your information
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          We may disclose your personal information to any member of our group,
          which means our subsidiaries, our ultimate holding company and its
          subsidiaries, as defined in section 1159 of the UK Companies Act 2006.{" "}
          <br /> We may disclose your personal information to third parties:{" "}
        </p>

        <ul className="text-justify list-disc list-inside ml-4 md:ml-6 text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          <li>
            In the event that we sell or buy any business or assets, in which
            case we may disclose your personal data to the prospective seller or
            buyer of such business or assets.
          </li>
          <li>
            If we are under a duty to disclose or share your personal data in
            order to comply with any legal obligation, or in order to enforce or
            apply our terms of use and other agreements; or to protect the
            rights, property, or safety of Nzuri Healthcare Recruitment Limited.
          </li>
        </ul>
        <p className="mt-4 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          This does not affect our liability for death or personal injury
          arising from our negligence, nor our liability for fraudulent
          misrepresentation or misrepresentation as to a fundamental matter, nor
          any other liability which cannot be excluded or limited under
          applicable law.
        </p>
        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title">
          How long we keep your data
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          We will only retain your personal data for as long as:
        </p>
        <ul className="text-justify list-disc list-inside ml-4 md:ml-6 text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          <li>it is needed for the purposes set out in this document</li>
          <li>the law requires us to</li>
        </ul>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          In general, this means that we will only hold your personal data for a
          minimum of 1 year and up to 7 years depending on the nature of the
          data. This is detailed in our retention policy.
        </p>

        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title">
          Your Rights
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          Our site may, from time to time, contain links to and from the
          websites of our partner networks and affiliates. If you follow a link
          to any of these websites, please note that these websites have their
          own privacy policies and that we do not accept any responsibility or
          liability for these policies. Please check these policies before you
          submit any personal data to these websites. <br /> You have the right
          to request:
        </p>
        <ul className="text-justify list-disc list-inside ml-4 md:ml-6 text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          <li>
            information about how your personal data on this website is
            processed
          </li>

          <li>a copy of that personal data</li>
          <li>Promote sexually explicit material</li>
          <li>Promote violence</li>
          <li>
            that anything inaccurate in your personal data is corrected
            immediately
          </li>
        </ul>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          You can also:
        </p>
        <ul className="text-justify list-disc list-inside ml-4 md:ml-6 text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          <li>raise an objection about how your personal data is processed</li>

          <li>
            request that your personal data is erased if there is no longer a
            justification for it
          </li>
          <li>
            ask that the processing of your personal data is restricted in
            certain circumstances
          </li>
        </ul>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          If you have any of these requests, get in contact with our Data
          Protection Officer using the information below. <br /> You are in
          control of how we contact you, for example by post or email. And you
          can control this by contacting us.
          <br /> If you want to stop receiving emails, click the ‘unsubscribe’
          link at the bottom of any of our emails. We would rather you didn’t
          miss out, but we respect that this is your decision! <br /> To make
          changes to the type of communications you get from us and how often
          you get it, please contact us on {" "}
          <a href="mailto:info@nzuricares.co.uk" className="font-bold text-blue-800">
            info@nzuricares.co.uk
          </a>{" "}
          or{" "}
          <a href="tel:02080502662" className="font-bold text-blue-800">
            02080502662
          </a>
          .
        </p>

        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title">
          Children’s Privacy Protection
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          Our services are not designed for, or intentionally targeted at,
          children 13 years of age or younger. We do not intentionally collect
          or maintain data about anyone under the age of 13.
        </p>
        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title ">
          Changes to our privacy policy
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          Any changes we may make to our privacy policy in the future will be
          posted on this page. You are expected to check this page from time to
          time to take notice of any changes we make, as they are legally
          binding on you.
        </p>

        <div className="mt-2 md:mt-4 text-[#283544] text-lg font-semibold font-title ">
          Contact
        </div>
        <p className="mt-2 text-justify text-[#283544] text-md font-body font-normal leading-8 md:leading-10">
          Questions, comments and requests regarding this privacy policy are
          welcomed and should be addressed to {" "}
          <a href="mailto:info@nzuricares.co.uk" className="font-bold text-blue-800">
            info@nzuricares.co.uk
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Page;
