import React from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Helmet } from 'react-helmet'

const Aboutus = () => {
    return (
        <div>
           

<Helmet>
  
  <title>Buy Contest Tickets & Win Trips</title>
  <meta
    name="description"
    content="about LuckMyTrip, your gateway to winning amazing trips and contests."
  />
  <meta
    name="keywords"
    content="about LuckMyTrip, win trips, contest information, LuckMyTrip"
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
            <section className="flex flex-col mx-auto mt-10 sm:mt-16 md:mt-6  mb-28">
                <div className="container mx-auto py-6 sm:py-10 md:py-10 lg:py-12 xl:py-12 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-6xl font-bold text-green-400 text-center mb-2 md:mb-2  font-berlin">ABOUT US</h2>
                    <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-3xl 2xl:text-4xl text-justify sm:text-left md:text-justify mt-6 sm:mt-8 md:mt-8  xl:mt-16 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 text-blue-900 leading-relaxed sm:leading-loose md:leading-relaxed lg:leading-loose xl:leading-loose font-montserrat">
                        LuckMyTrip is an Indian travel platform that helps you discover, plan, and book unforgettable trips with ease. From weekend getaways to international holidays, we connect you with trusted partners, curated experiences, and secure payment options — all in one place.<br /></p>
                        <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-3xl 2xl:text-4xl text-justify sm:text-left md:text-justify mt-6 sm:mt-8 md:mt-8  xl:mt-16 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 text-gray-700 leading-relaxed sm:leading-loose md:leading-relaxed lg:leading-loose xl:leading-loose font-montserrat">
                          We focus on transparent pricing, smooth booking, and reliable customer support, so your only job is to enjoy the journey.<br />
                        Here’s your chance to win an unforgettable trip to Dubai or Thailand, where luxury meets breathtaking experiences.<br />
                        Explore the futuristic skyline and golden deserts of Dubai, or immerse yourself in Thailand’s tropical paradise, vibrant culture, and stunning beaches.<br />
                        Don’t miss out — participate now and make your dream vacation a reality! Stay tuned for more details on how to enter and secure your spot in this incredible giveaway.
                    </p>
                    
                    <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-3xl 2xl:text-4xl text-justify sm:text-left md:text-justify mt-6 sm:mt-8 md:mt-8  xl:mt-16 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 text-gray-700 leading-relaxed sm:leading-loose md:leading-relaxed lg:leading-loose xl:leading-loose font-montserrat">
                        <strong>Payments & security</strong><br />
                        All online payments on this site are processed through our authorised payment gateway partners PayU who comply with RBI’s Payment Aggregator / Payment Gateway regulations and industry security standards. For security reasons, LuckMyTrip does not store full card credentials on our servers; sensitive payment data is handled by the payment gateway.
                    </p>
                    <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-3xl 2xl:text-4xl text-justify sm:text-left md:text-justify mt-6 sm:mt-8 md:mt-8  xl:mt-16 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 text-gray-700 leading-relaxed sm:leading-loose md:leading-relaxed lg:leading-loose xl:leading-loose font-montserrat">
                        <strong>KYC, AML & transactional monitoring</strong><br />
                        Where required by law or our payment partners, we and/or our payment partners will perform KYC and AML checks in line with RBI / PMLA guidelines and may request additional documentation to complete bookings or settlements.
                    </p>
                    <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-3xl 2xl:text-4xl text-justify sm:text-left md:text-justify mt-6 sm:mt-8 md:mt-8  xl:mt-16 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 text-gray-700 leading-relaxed sm:leading-loose md:leading-relaxed lg:leading-loose xl:leading-loose font-montserrat">
                        <strong>Privacy & personal data</strong><br />
                        We collect and process personal data only for legitimate business purposes (booking, payments, customer service) and in accordance with the Digital Personal Data Protection Act (DPDP Act) and applicable rules. Our Privacy Policy describes what we collect, retention periods, transfer rules, security measures and your rights.
                    </p>
                    <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-3xl 2xl:text-4xl text-justify sm:text-left md:text-justify mt-6 sm:mt-8 md:mt-8  xl:mt-16 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 text-gray-700 leading-relaxed sm:leading-loose md:leading-relaxed lg:leading-loose xl:leading-loose font-montserrat">
                        <strong>Refunds & disputes</strong><br />
                        Refunds, chargebacks and dispute-handling are processed per our Refund Policy and in accordance with RBI/payment-card network rules. Some refunds/settlements may be subject to timeframes defined by banks/payment gateways.
                    </p>
                    <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-3xl 2xl:text-4xl text-justify sm:text-left md:text-justify mt-6 sm:mt-8 md:mt-8  xl:mt-16 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 text-gray-700 leading-relaxed sm:leading-loose md:leading-relaxed lg:leading-loose xl:leading-loose font-montserrat">
                        <strong>Contact & grievance redressal</strong><br />
                        For queries, complaints or payment disputes contact: admin@theluckmytrip.com, Phone: +919891344354. If you are not satisfied with our response, you may escalate to support@theluckmytrip.com.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Aboutus
