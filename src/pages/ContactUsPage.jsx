import React, { useState } from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { createUserInfo } from "../features/userinfo/userInfoContactSlice"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { Helmet } from 'react-helmet'

const ContactUsPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.userInfo)



  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (!(name && email && phone)) {
        return toast.error('Please fill all the fields')
      }
      if (phone.length !== 10) {
        return toast.error('Phone number must be 10 digits')
      }

      dispatch(createUserInfo({ name, email, phone }))
      toast.success('Your information has been submitted successfully!')
      setName('')
      setEmail('')
      setPhone('')

    } catch (error) {
      toast.error('Something went wrong.', error)

    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-10 min-h-screen">


      <Helmet>

        <title>Buy Contest Tickets & Win Trips</title>
        <meta
          name="description"
          content="contact LuckMyTrip for any inquiries, support, or feedback regarding contests and trips."
        />
        <meta
          name="keywords"
          content="contact LuckMyTrip, support, inquiries, feedback"
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

      <section className="py-10 px-4 flex justify-center items-center bg-blue-50 min-h-full">
        <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full md:p-8 p-5">
          <h2 className="text-2xl font-bold text-teal-600 mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="flex flex-col space-y-5">
                <div>
                  <label className="text-gray-700 font-semibold mb-2 block" htmlFor="names">Name</label>
                  <input
                    required
                    id="names"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400`}
                  />

                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2 block" htmlFor="emails">Email Address</label>
                  <input
                    required
                    id="emails"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 `}
                  />

                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2 block" htmlFor="phone">Phone</label>
                  <input
                    required
                    id="phone"
                    type="tel"
                    placeholder="Your Phone Number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 `}
                  />

                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded shadow transition font-bold mt-4 md:mt-0"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              <div className="flex flex-col h-full">
  <h1 className="text-gray-700 font-semibold block md:text-3xl text-2xl mb-2" htmlFor="address">Address</h1>
  <div className="flex flex-col md:text-lg text-base font-semibold gap-1">
    <p>
      The luck my trip by <br />
      Nirimal trading fz LLC
    </p>
    <p>
      license number: <span className="text-teal-600">7007566</span>
    </p>
    <p>Dubai</p>
    <p>
      Phone : <span className="text-teal-600">+971556477975</span>
    </p>
    <p>Email will add later</p>
  </div>
</div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ContactUsPage