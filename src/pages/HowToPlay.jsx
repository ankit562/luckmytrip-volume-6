import React from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Helmet } from 'react-helmet'

const HowToPlay = () => {
    return (
        <div>


<Helmet>
  
  <title>Buy Contest Tickets & Win Trips</title>
  <meta
    name="description"
    content="How it works to play contests on LuckMyTrip. Register or login, buy contest tickets, and wait for the results to win exciting trips."
  />
  <meta
    name="keywords"
    content="how to play contest, buy contest tickets, win trips"
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
                  <section className="how-it-works w-full py-4 sm:py-5 md:py-8 lg:py-10 xl:py-8 mt-4 sm:mt-6 md:mt-10 lg:mt-12 xl:mt-20 mb-16">
        <h2 className="text-[2.0rem] sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-extrabold mb-4 sm:mb-5 md:mb-8 lg:mb-10 xl:mb-8 px-4 font-berlin" style={{color: '#8BC34A'}}>
          HOW To Play?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-3 lg:gap-8 xl:gap-16 2xl:gap-32 px-3 sm:px-4 md:px-4 lg:px-6 xl:px-4">

          <div className="flex items-center w-full max-w-[320px] md:w-auto justify-center">
            <img src="/images/1.png" className="relative  font-black mr-[-33px] sm:mr-[-45px] 
            md:mr-[-34px] lg:mr-[-40px] xl:mr-[-48px] z-10  xl:w-[5rem]  
            w-[3.4rem] sm:w-[4rem] md:w-[3.4rem] lg:w-[4rem]"             
            style={{
                color: '#7B1FA2',
                WebkitTextStroke: '5px #fff',
                textStroke: '1px #fff',
                borderRadius: '10px',
                background: 'transparent',
              }}/>

            <span className="bg-[#7B1FA2] text-white text-sm sm:text-base md:text-sm 
            lg:text-base xl:text-xl font-bold rounded-r-[25px] sm:rounded-r-[40px] md:rounded-r-[30px] 
            lg:rounded-r-[35px] xl:rounded-r-[45px] py-5 sm:py-6 md:py-5 lg:py-6 xl:py-8 pl-10 
            sm:pl-12 md:pl-10 lg:pl-11 xl:pl-16 pr-6 sm:pr-12 md:pr-8 lg:pr-10 xl:pr-16 min-w-[184px] 
            sm:min-w-[225px] md:min-w-[155px] lg:min-w-[170px] xl:min-w-[220px] flex items-center 
            leading-tight font-montserrat"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              REGISTERED<br />OR LOGIN
            </span>
          </div>

          <div className="flex items-center w-full max-w-[320px] md:w-auto justify-center">
            <img src="/images/2.png" className="relative  font-black mr-[-33px] sm:mr-[-45px] 
            md:mr-[-34px] lg:mr-[-40px] xl:mr-[-48px] z-10  xl:w-[8rem]  w-[4.9rem] sm:w-[6.1rem] md:w-[6rem] lg:w-[7rem]"
              style={{
                color: '#00a59b',
                WebkitTextStroke: '5px #fff',
                textStroke: '5px #fff',
                borderRadius: '30px',
                background: 'transparent',
              }}/>

            <span className="bg-[#00a59b] text-white text-sm sm:text-base md:text-sm 
            lg:text-base xl:text-xl font-bold rounded-r-[25px] sm:rounded-r-[40px] md:rounded-r-[30px] 
            lg:rounded-r-[35px] xl:rounded-r-[45px] py-5 sm:py-6 md:py-5 lg:py-7 xl:py-8 pl-9 sm:pl-12 
            md:pl-10 lg:pl-11 xl:pl-14 pr-6 sm:pr-12 md:pr-8 lg:pr-10 xl:pr-16 min-w-[165px] sm:min-w-[200px] 
            md:min-w-[155px] lg:min-w-[140px] xl:min-w-[220px] flex items-end leading-tight font-montserrat"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              BUY<br />COUPONS
            </span>
          </div>

          <div className="flex items-center w-full max-w-[320px] md:w-auto justify-center">
            <img src="/images/3.png" className="relative  font-black mr-[-33px] sm:mr-[-45px] 
            md:mr-[-34px] lg:mr-[-40px] xl:mr-[-48px] z-10  xl:w-[8rem]  w-[5.3rem] sm:w-[6.3rem] md:w-[6rem] lg:w-[6.4rem]"
              style={{
                color: '#104a64',
                WebkitTextStroke: '5px #fff',
                textStroke: '5px #fff',
                borderRadius: '30px',
                background: 'transparent',
              }}/>

            <span className="bg-[#104a64] text-white text-sm sm:text-base 
            md:text-sm lg:text-base xl:text-xl font-bold rounded-r-[25px] sm:rounded-r-[40px] 
            md:rounded-r-[30px] lg:rounded-r-[35px] xl:rounded-r-[45px] 
            py-5 sm:py-6 md:py-5 lg:py-5 xl:py-5
            pl-9 sm:pl-12 md:pl-10 lg:pl-11 xl:pl-12
            pr-6 sm:pr-12 md:pr-8 lg:pr-10 xl:pr-16 
            min-w-[165px] sm:min-w-[200px] md:min-w-[155px] lg:min-w-[170px] xl:min-w-[210px] 
            flex items-center leading-tight font-montserrat"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              WAIT FOR<br />THE RESULTS
            </span>
          </div>
        </div>
      </section>

            
            <Footer />
        </div>
    )
}

export default HowToPlay
