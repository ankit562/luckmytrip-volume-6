import React  ,{useState}from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Helmet } from 'react-helmet'

const Privs = [
  {
    question: "Information We Collect",
    answer: "We may collect the following personal information when you interact with our website or participate in contests: 1. Name, email address, phone number 2. Payment information for ticket purchases 3. Demographic information (age, gender, location) 4. IP address and browser details for website analytics. Note: do not store card credentials, and card processing is handled by the PayU. We may verify identity as per RBI / PMLA rules and transactional monitoring may occur to prevent fraud.",
  },
  {
    question: "How We Use Your Information",
    answer: "Your information is used for: 1. Managing and administering contests, 2. Contacting winners and distributing prizes, 3. Improving website functionality and user experience, 4. Marketing, promotional offers, and newsletters (with your consent) 5. Ensuring security and preventing fraud",
  },
  {
    question: "Data Sharing",
    answer: "We do not sell or rent your personal information. We may share your data with: a. Payment processors for ticket transactions b. Service providers for contest administration c. Legal authorities if required by law",
  },
  {
    question: "Cookies and Tracking",
    answer: "We use cookies and tracking technologies to: a. Enhance website functionality b. Analyze traffic and improve services c. Show relevant promotions and content. You can disable cookies through your browser settings, but some features may not function properly.",
  },
  {
    question: "Data Security",
    answer: "We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and restricted access. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.",
  },
  {
    question: "Your Rights",
    answer: "You have the right to: 1. Opt-out of marketing communications 2. Withdraw consent for data processing at any time",
  },
  {
    question: "Return & Refund Policy",
    answer: "1. No refunds will be provided for tickets purchased unless a contest is canceled. 2. If a contest is canceled, ticket fees will be returned/refunded in full within 30 business days.",
  },
  {
    question: "Changes to This Privacy Policy",
    answer: "We may update this Privacy Policy from time to time. Updates will be posted on this page with the effective date.",
  },
  {
    question: "Contact",
    answer: "For questions regarding your privacy or data, please contact: 1. Email: support@theluckmytrip.com 2. Phone: +919891344354",
  },
];

const Privacy = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const togglePrivacy = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>


      <Helmet>

        <title>Privacy Policy | The Luck My Trip</title>
        <meta
          name="description"
          content="privacy policy information about how user data is handled on LuckMyTrip."
        />
        <meta
          name="keywords"
          content="privacy policy, user data, LuckMyTrip"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="" />
        <meta
          property="og:description"
          content=""
        />
        <meta property="og:url" content="" />

        {/* Canonical URL */}
        <link rel="canonical" href="" />

        {/* Structured Data - Schema.org Product / Offer and Contest */}
        <script type="">
          {`
      {
        "@context": "",
        "@type": "",
        "name": "",
        "url": "",
        "description": "",
        "offers": {
          "@type": "",
          "priceCurrency": "",
          "price": "",
          "availability": "",
          "url": ""
        },
        "mainEntityOfPage": {
          "@type": "",
          "name": "",
          "url": "",
          "description": ""
        }
      }
    `}
        </script>
      </Helmet>
      <Header />

      <section className="py-12 bg-[#E9F2FF]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-900 font-berlin">
          Privacy Policy - The LuckMyTrip
        </h2>
        <div className="space-y-4">
          {Privs.map((Privacy, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-4 cursor-pointer bg-white shadow-sm"
              onClick={() => togglePrivacy(idx)}
              aria-expanded={activeIndex === idx}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') togglePrivacy(idx); }}
            >
              <h3 className=" text-sm md:text-xl font-semibold text-blue-800 flex justify-between items-center">
                {Privacy.question}
                <span className={`transform transition-transform duration-300 ${activeIndex === idx ? "rotate-180" : "rotate-0"}`}>
                  ▼
                </span>
              </h3>
              {activeIndex === idx && (
                <p className="text-xs md:text-base mt-2 text-gray-700 font-montserrat">{Privacy.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
      <Footer />

    </div>
  )
}

export default Privacy
