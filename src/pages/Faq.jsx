import React  ,{useState}from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Helmet } from 'react-helmet'


const faqs = [
  {
    question: "What is The Luck My Trip?",
    answer: "The Luck My Trip is an online contest platform where participants can buy tickets and enter lucky draws to win international travel packages such as trips to Dubai, Baku, Thailand, and more.",
  },
   {
    question: "How does the contest work?",
    answer: "1. Buy a ticket for a specific contest (₹299, ₹499, ₹599) 2. Once all entries are sold or the contest deadline passes, a lucky draw is conducted. 3. One winner is randomly selected to receive the prize package.",
  },
  {
    question: "Who is eligible to participate?",
    answer: "1. You must be 18 years or older. 2. Residents of India are eligible unless otherwise stated. 3. Employees, affiliates, or immediate family members of The Luck My Trip are not eligible.",
  },
  {
    question: "What prizes can I win?",
    answer: "1. Return Flight Ticket (India → Dubai/Baku/Thailand → India) 2. 3-Star Hotel Stay (2 Nights) 3. Breakfast included. 4. Airport Pick-up & Drop 5. Basic City Tour",
  },
  {
    question: "How do I buy a ticket?",
    answer: "1. Go to the Explore page. 2. Select the contest and ticket type (₹299, ₹499, ₹599). 3. Complete payment using approved payment methods. 4. Receive a confirmation email with your ticket details once the purchase is successful..",
  },
  {
    question: "Can I buy more than one ticket per contest?",
    answer: "Each contest has a limit of one ticket per participant, unless explicitly stated otherwise on the contest page.",
  },
  {
    question: "How is the winner selected?",
    answer: "1. Winners are chosen through a random draw once all tickets are sold or the contest deadline is reached. 2. Only participants with fully completed ticket purchases are eligible. 3. Winner announcements are made via email and/or phone after the draw.",
  },
  {
    question: "What if I win?",
    answer: "1. You will be notified via the email or phone number provided during registration. 2. You must provide valid identification (passport, ID) for travel. 3. Prizes must be claimed according to the instructions provided by The LuckMyTrip.",
  },
  {
    question: "Can I transfer or sell my prize?",
    answer: "No. All prizes are non-transferable and must be claimed by the winner as per the rules.",
  },
  {
    question: "Are refunds allowed for tickets?",
    answer: "1. Tickets are non-refundable once purchased. 2. Refunds will only be issued if a contest is canceled by The Luck My Trip.",
  },
  {
    question: "Can I participate from outside India?",
    answer: "Unless explicitly mentioned, contests are restricted to residents of India due to travel and legal regulations.",
  },
  {
    question: "Are there any taxes or fees on the prize?",
    answer: "1. Winners may be responsible for any applicable taxes or visa fees. 2. The Luck My Trip is not liable for travel delays, visa rejections, or additional charges imposed by airlines, hotels, or local authorities.",
  },
  {
    question: "Is my personal information safe?",
    answer: "Yes. All personal data is collected and used only for contest administration and prize distribution. By participating, you agree that your name and/or image may be used for promotional purposes.",
  },
  {
    question: "How can I contact support?",
    answer: "If you have any questions regarding contests, tickets, or prizes: 1. Email: support@theluckmytrip.com 2. Phone: +919891344354",
  },
  {
    question: "Can The Luck My Trip cancel a contest?",
    answer: "Yes. The Luck My Trip reserves the right to modify, suspend, or terminate any contest at its sole discretion. Participants will be informed, and refunds will be issued for canceled contests.",
  },
];

const Faq = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      

<Helmet>
  
  <title>Frequently Asked Questions | The LuckMyTrip</title>
  <meta
    name="description"
    content="faq about contests on LuckMyTrip. Find answers to common questions regarding participation, prizes, and rules."
  />
  <meta
    name="keywords"
    content="faq, contest questions, LuckMyTrip faq"
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
      <Header/>
      <section className="py-12 bg-[#E9F2FF]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-900 font-berlin">
          Frequently Asked Questions - The LuckMyTrip
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-4 cursor-pointer bg-white shadow-sm"
              onClick={() => toggleFAQ(idx)}
              aria-expanded={activeIndex === idx}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') toggleFAQ(idx); }}
            >
              <h3 className=" text-sm md:text-xl font-semibold text-blue-800 flex justify-between items-center">
                {faq.question}
                <span className={`transform transition-transform duration-300 ${activeIndex === idx ? "rotate-180" : "rotate-0"}`}>
                  ▼
                </span>
              </h3>
              {activeIndex === idx && (
                <p className="text-xs md:text-base mt-2 text-gray-700 font-montserrat">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
      <Footer/>
    </div>
  )
}

export default Faq
