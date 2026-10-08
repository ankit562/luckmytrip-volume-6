import React  ,{useState}from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Helmet } from 'react-helmet'

const TaCs = [
  {
    question: "Account",
    answer: "An online Account maintained by a Customer on the Central Computer System which contains a Customer’s personal information and all other relevant details necessary to enable them to purchase a Product or add credits to their Wallet Balance, enter a draw, if they so wish, and withdraw any winnings.",
  },
  {
    question: "Central Computer System",
    answer: "The Central Computer System contains the software that manages Prizes. It enables the Customer to enter into the Draw and manage their Account and winnings.",
  },
  {
    question: "Customer, You or Your",
    answer: "A member of the public who intends to, or purchases, a Product and/or Service offered by luckmy trip and who agrees to be bound by these Terms and Conditions.",
  },
  {
    question: "Draw / Drawing",
    answer: "The process which results in the random selection of the Winning ticket for a Draw using either a Random Number Generator (RNG)",
  },
  {
    question: "Registered acc and company",
    answer: "Luck my trip is owned amd run by the highlife exclusive (gst))",
  },
  {
    question: "You may only enter the Draw if You:",
    answer: "a) are at least 18 years of age at the time of purchase; b) are not prohibited or restricted from entering under the laws of Your jurisdiction of residence or jurisdiction in which You are located when entering; c) at all times abide by these Rules and the Terms & Conditions and Privacy Policy; d) are not:a Manager, employee or an Immediate Family Member of luckmytrip, a Manager or employee of an affiliated company who are directly involved with the draw and related processes; the Government Representative, the Insurance Representative or the Draw Manager; a third party, contractor or consultant of the Manager engaged to review the insurance, audit and security procedures related to the Draw; a resident of a sanctioned or embargoed country. -We reserve the right to determine whether entries made within 10 minutes of the official draw time will be entered in the current draw or the next. -There is no general right for a Customer to enter a Draw. We may refuse Entries and/or limit the number of Entries you can make without giving reason.",
  },
  {
    question: "Draw",
    answer: "1. We will determine the time, frequency, date, and method of the Draw, in accordance with the rules of that specific Game. 2. Each Draw will be made using an internationally certified Random Number Generator. 3. All Draws will be conducted in accordance with the luck mytrip Procedures and in the presence of the Draw Manager. 4. In the event of any Draw being declared invalid, in accordance with the Draw Procedures, another Draw will be conducted to determine the Winning ticket. 5. In the event that a Draw does not take place or is interrupted due to equipment failure or for any other reason, the Draw will be completed in accordance with the Draw Procedures.",
  },
{
    question: "Winners’ Information",
    answer: "By participating in the Draw via the luckmytrip Website or Mobile App, You accept that We may disclose relevant personal details about You. This may include, but is not limited to, face-to-face or virtual interviews, photographs, and videos for marketing purposes (both offline and online), for up to one year following Your win. Additionally, if required by law or under the terms of Our Grand Prize insurance, We may share Your details and information about any Prize claimed, by You or on Your behalf, with a third party.-each participant must share videos , photos of the trip in their social media , stories and posts about their experience - visa and insurance,health and medical risks are not covered by luckmytrip - winner will be provided with return flight ticket from original destination with 3-4 star accomodation for one night and In some cases can be for two nights. - breakfast is included and for lunch and dinner with transfers total amount of 500usd will be provided as cash or in form of coupons to be used for personal use only.",
  },
  {
    question: "General",
    answer: "1. The reasonable exercise by Us of any discretion provided for by these Rules, including with respect of the determination of a winning Entry or payment of a Prize will be final and binding unless otherwise provided by law. 2. In the event that a dispute arises, We may withhold payment of a Prize and/or make an equivalent payment into court until it has been resolved. 3. If any provision (or part of a provision) in any of these Rules is decided by a court of competent jurisdiction to be void and/or unenforceable, that decision will only affect the particular provision (or part of the provision) and will not, in itself, make the other provisions void or unenforceable. 4. You may not assign or otherwise transfer (in whole or in part) Your rights and/or obligations under these Rules, including, for the avoidance of doubt, the right to a Prize. Any assignment or transfer by You will be null and void. We may assign or transfer Our rights and/or obligations under these Rules in whole or in part to any third party at Our sole discretion. 5. Except if We assign or transfer Our rights and/or obligations under these Rules, a person who is not a party to these Rules has no rights or otherwise to enforce any provision of these Rules. 6. We may amend these Rules from time to time. Such amendments, modifications or changes will be applicable and contractually binding with effect from the date of their publication on the Platform or on notification to You that changes have taken place, whichever is sooner and will apply to Entries made after the date on which the changes become effective, and/or Entries made before that date if reasonable in the circumstances. If We change these Rules You will be notified the next time You access Your Account.",
  },
  {
    question: "Eligibility",
    answer: "1. Participants must be 18 years or older. 2. Employees, affiliates, or immediate family members of The Luck My Trip are not eligible to participate. 3. Contests are open to residents of India only unless explicitly stated otherwise.",
  },
   {
    question: "Contest Entry",
    answer: "1. Tickets are non-transferable and must be purchased via the official website.",
  },
  {
    question: "Ticket Purchase & Pricing",
    answer: "1. Ticket prices may vary: ₹299, ₹499, ₹599, or as specified for each contest. 2. All ticket purchases are final. No refunds are permitted unless the contest is canceled by the organizer. 3. Payment must be made via the approved online payment methods only.",
  },
  {
    question: "Winner Selection",
    answer: "1. Winners are selected via a random draw once all tickets for a contest are sold or the contest deadline is reached. 2. Only participants with fully completed ticket purchases are eligible. 3. Winners will be notified via email and/or phone within [X] days of the draw.",
  },
  {
    question: "Prize Details",
    answer: "1. Prizes are non-transferable, cannot be exchanged for cash, and must be claimed as specified. 2. Winners must provide necessary documentation (passport, ID) for international travel. 3. The Luck My Trip is not responsible for visa delays, flight delays, or any travel-related issues beyond its control.",
  },
  {
    question: "Contest Conduct",
    answer: "1. The Luck My Trip reserves the right to disqualify participants for: a. Fraudulent activities b. Attempting to manipulate the contest c. Violating terms & conditions 2.Participants must provide accurate personal information.",
  },
  {
    question: "Cancelation policy, Return & Refund Policy",
    answer: "1. No refunds will be provided for tickets purchased unless a contest is canceled. 2. If a contest is canceled, ticket fees will be returned/refunded in full within 30 business days.",
  },
  {
    question: "Privacy & Data",
    answer: "1. Personal data collected is used only for contest administration and prize distribution. 2. By participating, you consent to the use of your name and/or image for promotional purposes.",
  },
  {
    question: "Liability",
    answer: "1. The Luck My Trip is not liable for any injury, loss, or damage incurred during participation or travel. 2. Travel arrangements are subject to airline and hotel policies.",
  },
  {
    question: "Modification & Termination",
    answer: "1. The Luck My Trip reserves the right to modify, suspend, or terminate any contest at its sole discretion. 2. Any changes will be posted on the website and communicated to participants where possible.",
  },
  {
    question: "Governing Law",
    answer: "1. These terms are governed by the laws of India. 2. Any disputes arising from the contest will be subject to the exclusive jurisdiction of courts in India.",
  },
  {
    question: "Contact",
    answer: "For questions regarding contests, prizes, or tickets, contact us at: 1. Email: support@theluckmytrip.com 2. Phone: +919891344354",
  },
];

const TaC = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleTaC = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      

<Helmet>
  
  <title>Terms and Conditions | The LuckMyTrip</title>
  <meta
    name="description"
    content="terms and conditions of contest on LuckMyTrip. Read the rules and regulations before participating."
  />
  <meta
    name="keywords"
    content="terms and conditions of contest, LuckMyTrip terms"
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
  <script type="application/ld+json">
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
          Terms and Conditions - The LuckMyTrip
        </h2>
        <div className="space-y-4">
          {TaCs.map((TaC, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-4 cursor-pointer bg-white shadow-sm"
              onClick={() => toggleTaC(idx)}
              aria-expanded={activeIndex === idx}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') toggleTaC(idx); }}
            >
              <h3 className=" text-sm md:text-xl font-semibold text-blue-800 flex justify-between items-center">
                {TaC.question}
                <span className={`transform transition-transform duration-300 ${activeIndex === idx ? "rotate-180" : "rotate-0"}`}>
                  ▼
                </span>
              </h3>
              {activeIndex === idx && (
                <p className="text-xs md:text-base mt-2 text-gray-700 font-montserrat">{TaC.answer}</p>
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

export default TaC
