import React, { useState, useEffect } from 'react';

// Importing product images from the specified assets path
import travelTeeImg from '../components/assets/images/travel tee.png';
import coffeeMugImg from '../components/assets/images/coffee mug.png';
import luggageTagImg from '../components/assets/images/Luggage Tag.png';
import waterBottleImg from '../components/assets/images/water bottle.png';
import waterCapImg from '../components/assets/images/cap.png';

const PRODUCTS = [
  ["Travel Tee", travelTeeImg, 799, "Soft cotton, original travel prints, front & back.", "bg-[#E3F6F7]"],
  ["Coffee Mug", coffeeMugImg, 399, "Your morning ritual, with a little wanderlust.", "bg-[#FFF3CC]"],
  ["Luggage Tag", luggageTagImg, 349, "Spot your bag in seconds.", "bg-[#FDE3E4]"],
  ["Water Bottle", waterBottleImg, 599, "Stay hydrated on every route.", "bg-[#E3F6F7]"],
  ["Travel Cap", waterCapImg, 449, "Sun-ready, trip-ready.", "bg-[#FFF3CC]"]
];

const FAQS = [
  ["Is LuckMyTrip a lottery?", "No. Every week a panel reads eligible stories and selects one using published judging criteria: creativity, originality and storytelling. Winners are chosen on merit, not by a random draw."],
  ["How do I take part?", "Buy any LuckMyTrip product, post a creative story about your travels, and tag @LuckMyTrip. Purchase and posting requirements apply."],
  ["What can I win?", "One standout story each week wins a trip to Dubai or Thailand. Inclusions and dates are listed in the full terms."],
  ["Which payment methods do you accept?", "UPI, debit and credit cards, net banking and selected cryptocurrencies. You can also pay from your LuckMyTrip wallet."],
  ["What is the wallet?", "A balance you top up and spend on LuckMyTrip products. It cannot be withdrawn or transferred."],
  ["Will my photo be shown if I win?", "Only with your written consent. Winners choose whether to share their photo, name and story."],
  ["Where can I read the full terms?", "The complete terms, eligibility rules and judging criteria are linked at checkout and in the footer."]
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [state, setState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lmt')) || { u: null, bal: 0, tx: [] };
    } catch {
      return { u: null, bal: 0, tx: [] };
    }
  });

  const [toastMsg, setToastMsg] = useState(null);
  const [authModal, setAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');

  const [payModal, setPayModal] = useState(false);
  const [curPay, setCurPay] = useState(null);
  const [walletAmt, setWalletAmt] = useState(1000);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('lmt', JSON.stringify(state));
    } catch {}
  }, [state]);

  // Handle URL hash navigation & smooth scrolling
  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.slice(1) || 'home';
      
      if (h === 'wallet' && !state.u) {
        setAuthMode('login');
        setAuthModal(true);
        window.location.hash = '#home';
        setActiveTab('home');
        return;
      }

      if (['home', 'how', 'shop'].includes(h)) {
        setActiveTab('home');
        if (h === 'how' || h === 'shop') {
          setTimeout(() => {
            const el = document.getElementById(h);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        setActiveTab(h);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, [state.u]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const handleLogin = (isLogin) => {
    if (!authEmail.trim() || !authPass) {
      showToast('Enter your details to continue');
      return;
    }
    const name = isLogin ? authEmail.split('@')[0] : (authName || authEmail);
    setState(prev => ({ ...prev, u: { name, email: authEmail } }));
    setAuthModal(false);
    showToast(`Welcome, ${name}!`);
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, u: null }));
    window.location.hash = '#home';
    showToast('Logged out');
  };

  const buyProduct = (index) => {
    if (!state.u) {
      showToast('Please log in to buy');
      setAuthMode('login');
      setAuthModal(true);
      return;
    }
    setCurPay({ kind: 'buy', amt: PRODUCTS[index][2], label: PRODUCTS[index][0], m: 'upi', f1: '' });
    setPayModal(true);
  };

  const handleTopup = () => {
    const amt = Number(walletAmt);
    if (!(amt >= 1)) {
      showToast('Enter a valid amount');
      return;
    }
    setCurPay({ kind: 'topup', amt, label: 'Add money to wallet', m: 'upi', f1: '' });
    setPayModal(true);
  };

  const executePayment = () => {
    const o = curPay;
    if (o.m === 'upi' && !o.f1?.includes('@')) {
      showToast('Enter a valid UPI ID');
      return;
    }
    if (o.m === 'card' && (o.f1 || '').replace(/\D/g, '').length < 12) {
      showToast('Enter a valid card number');
      return;
    }
    if (o.m === 'wallet' && state.bal < o.amt) {
      showToast('Not enough wallet balance. Add money first.');
      return;
    }

    setState(prev => {
      let newBal = prev.bal;
      let newTx = [...prev.tx];
      if (o.kind === 'topup') {
        newBal += o.amt;
        newTx.push([`Added via ${o.m.toUpperCase()}`, `+₹${o.amt}`]);
      } else {
        if (o.m === 'wallet') newBal -= o.amt;
        newTx.push([o.label, `−₹${o.amt}`]);
      }
      return { ...prev, bal: newBal, tx: newTx };
    });

    setPayModal(false);
    showToast(o.kind === 'buy' ? 'Order confirmed! Now post your story and tag @LuckMyTrip' : `₹${o.amt} added to your wallet`);
  };

  const submitContact = () => {
    if (!contactName || !contactEmail || !contactMsg) {
      showToast('Please fill in all fields');
      return;
    }
    setContactName('');
    setContactEmail('');
    setContactMsg('');
    showToast('Thanks! We will reply within 2 working days.');
  };

  return (
    <div className="bg-[#F3F7F7] text-[#0E3E52] font-['Work_Sans',sans-serif] min-h-screen box-border antialiased flex flex-col justify-between">
      {/* Font Loader */}
      <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-[#F3F7F7] border-b border-[#0E3E52]/20">
        <div className="max-w-[1100px] mx-auto px-5 py-3.5 flex flex-wrap items-center justify-between gap-y-3">
          {/* Logo */}
          <a className="font-['Baloo_2',sans-serif] font-extrabold text-[23px] text-inherit no-underline" href="#home">
            Luck<b className="text-[#1F8E92]">My</b>Trip<i className="text-[#ED363E] not-italic">.</i>
          </a>

          {/* Nav links + Auth button: wrapped layout on mobile, right-aligned on desktop */}
          <div className="flex items-center gap-[22px] max-lg:w-full max-lg:order-3 max-lg:justify-between flex-wrap lg:ml-auto">
            <nav className="flex gap-[22px] max-md:gap-x-[12px] flex-wrap items-center">
              <a href="#home" className={`no-underline font-semibold text-[15px] max-md:text-[14px] py-0.5 border-b-2 ${activeTab === 'home' && (!window.location.hash || window.location.hash === '#home') ? 'border-[#1F8E92]' : 'border-transparent hover:border-[#1F8E92]'}`}>Home</a>
              <a href="#how" className={`no-underline font-semibold text-[15px] max-md:text-[14px] py-0.5 border-b-2 ${window.location.hash === '#how' ? 'border-[#1F8E92]' : 'border-transparent hover:border-[#1F8E92]'}`}>How it works</a>
              <a href="#shop" className={`no-underline font-semibold text-[15px] max-md:text-[14px] py-0.5 border-b-2 ${window.location.hash === '#shop' ? 'border-[#1F8E92]' : 'border-transparent hover:border-[#1F8E92]'}`}>Shop</a>
              <a href="#winners" className={`no-underline font-semibold text-[15px] max-md:text-[14px] py-0.5 border-b-2 ${activeTab === 'winners' ? 'border-[#1F8E92]' : 'border-transparent hover:border-[#1F8E92]'}`}>Winners</a>
              <a href="#faq" className={`no-underline font-semibold text-[15px] max-md:text-[14px] py-0.5 border-b-2 ${window.location.hash === '#faq' ? 'border-[#1F8E92]' : 'border-transparent hover:border-[#1F8E92]'}`}>FAQ</a>
              <a href="#contact" className={`no-underline font-semibold text-[15px] max-md:text-[14px] py-0.5 border-b-2 ${window.location.hash === '#contact' ? 'border-[#1F8E92]' : 'border-transparent hover:border-[#1F8E92]'}`}>Contact</a>
            </nav>

            <div className="flex gap-2 items-center">
              {state.u ? (
                <>
                  <a className="bg-white border border-[#0E3E52]/20 rounded-full px-3.5 py-1.5 font-semibold text-[14px] no-underline text-inherit" href="#wallet">Wallet ₹{state.bal}</a>
                  <button className="border-0 rounded-full py-2 px-4 bg-[#104A64] text-white font-bold text-[14px] cursor-pointer" onClick={handleLogout}>Log out</button>
                </>
              ) : (
                <button className="border-0 rounded-full py-2 px-4 bg-[#104A64] text-white font-bold text-[14px] cursor-pointer" onClick={() => { setAuthMode('login'); setAuthModal(true); }}>Log in</button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* HOME SECTION (#v-home) */}
        <section className={`py-11 pb-18 ${activeTab === 'home' ? '' : 'hidden'}`} id="v-home">
          <div className="max-w-[1100px] mx-auto px-5">
            {/* HERO */}
            <div className="grid grid-cols-[1.1fr_0.9fr] max-md:grid-cols-1 gap-10 items-center">
              <div>
                <span className="inline-block bg-[#FFCD32] text-[#3a2d00] font-bold text-[13px] rounded-full px-3 py-1">Judged weekly. Not a lottery.</span>
                <h1 className="font-['Baloo_2',sans-serif] text-[50px] max-md:text-[36px] font-extrabold tracking-[-0.5px] leading-[1.1] mt-4">
                  Shop travel gear. Share your story. <span className="text-[#1F8E92]">Get selected for a trip.</span>
                </h1>
                <p className="text-[#587885] max-w-[60ch] text-[18px] my-[18px]">
                  Buy any LuckMyTrip product, post your creative story, and our panel picks one standout story every week for a trip to Dubai or Thailand.
                </p>
                <div className="flex gap-[14px] flex-wrap items-center">
                  <a className="border-0 rounded-full py-[13px] px-[26px] bg-[#ED363E] text-white font-bold text-[15px] cursor-pointer no-underline inline-block" href="#shop">Shop the collection</a>
                  <a className="rounded-full py-[13px] px-[26px] bg-transparent text-[#0E3E52] border-2 border-[#0E3E52] font-bold text-[15px] cursor-pointer no-underline inline-block" href="#how">See how it works</a>
                </div>
              </div>

              <div className="bg-white border border-[#0E3E52]/20 rounded-[22px] p-[26px] shadow-2xl rotate-[2deg] max-md:rotate-0">
                <div className="flex justify-between items-center gap-2.5">
                  <small className="text-[#587885] font-semibold">WEEKLY TRIP</small>
                  <small className="text-[#587885] font-semibold">JUDGED ON STORY</small>
                </div>
                <div className="flex justify-between items-center gap-2.5 mt-[14px]">
                  <div><small className="text-[#587885] font-semibold">FROM</small><div className="font-['Baloo_2',sans-serif] font-extrabold text-[36px]">Your city</div></div>
                  <div className="text-[34px]">✈️</div>
                  <div className="text-right"><small className="text-[#587885] font-semibold">TO</small><div className="font-['Baloo_2',sans-serif] font-extrabold text-[36px]">Dubai / Thailand</div></div>
                </div>
                <hr className="border-0 border-t-2 border-dashed border-[#0E3E52]/20 my-[18px]" />
                <div className="flex justify-between items-center gap-2.5">
                  <div><small className="text-[#587885] font-semibold">CREATIVITY</small><br /><b>Originality</b></div>
                  <div><small className="text-[#587885] font-semibold">STORYTELLING</small><br /><b>Published criteria</b></div>
                </div>
              </div>
            </div>

            {/* HOW TO TAKE PART SECTION (#how) */}
            <div className="mt-16 scroll-mt-24" id="how">
              <h2 className="font-['Baloo_2',sans-serif] text-[34px] font-bold">How to take part</h2>
              <p className="text-[#587885] max-w-[60ch] mt-[10px]">Three simple steps. The same rules apply to everyone.</p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 mt-[26px]">
                <div className="rounded-[20px] p-[26px] border border-[#0E3E52]/20 bg-[#52C2C5]/20">
                  <div className="w-[46px] h-[46px] rounded-full grid place-items-center text-white font-['Baloo_2',sans-serif] font-extrabold text-[24px] mb-[14px] bg-[#ED363E]">1</div>
                  <h3 className="font-['Baloo_2',sans-serif] text-[26px] font-bold">Buy</h3>
                  <p className="text-[#587885] mt-[6px]">Choose any LuckMyTrip merchandise from the shop.</p>
                </div>
                <div className="rounded-[20px] p-[26px] border border-[#0E3E52]/20 bg-[#FFCD32]/20">
                  <div className="w-[46px] h-[46px] rounded-full grid place-items-center text-white font-['Baloo_2',sans-serif] font-extrabold text-[24px] mb-[14px] bg-[#d9a400]">2</div>
                  <h3 className="font-['Baloo_2',sans-serif] text-[26px] font-bold">Share</h3>
                  <p className="text-[#587885] mt-[6px]">Post a creative story and tag @LuckMyTrip.</p>
                </div>
                <div className="rounded-[20px] p-[26px] border border-[#0E3E52]/20 bg-[#652D8F]/20">
                  <div className="w-[46px] h-[46px] rounded-full grid place-items-center text-white font-['Baloo_2',sans-serif] font-extrabold text-[24px] mb-[14px] bg-[#652D8F]">3</div>
                  <h3 className="font-['Baloo_2',sans-serif] text-[26px] font-bold">Get selected</h3>
                  <p className="text-[#587885] mt-[6px]">Our panel reviews eligible stories using published judging criteria.</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mt-[18px]">
                <span className="bg-white border border-[#0E3E52]/20 rounded-full px-3.5 py-1.5 font-semibold text-[14px]">Creativity</span>
                <span className="bg-white border border-[#0E3E52]/20 rounded-full px-3.5 py-1.5 font-semibold text-[14px]">Originality</span>
                <span className="bg-white border border-[#0E3E52]/20 rounded-full px-3.5 py-1.5 font-semibold text-[14px]">Storytelling</span>
              </div>
            </div>

            {/* SHOP TRAVEL GEAR SECTION (#shop) */}
            <div className="mt-16 scroll-mt-24" id="shop">
              <h2 className="font-['Baloo_2',sans-serif] text-[34px] font-bold">Shop travel gear</h2>
              <p className="text-[#587885] max-w-[60ch] mt-[10px]">Premium everyday travel merchandise, with an extra reason to share your journey.</p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 mt-[26px]">
                {PRODUCTS.map((p, i) => (
                  <div key={i} className="bg-white border border-[#0E3E52]/20 rounded-[20px] p-[18px] flex flex-col gap-[6px]">
                    <div className={`h-[120px] rounded-[14px] overflow-hidden flex items-center justify-center p-2 ${p[4]}`}>
                      <img src={p[1]} alt={p[0]} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="font-['Baloo_2',sans-serif] text-[20px] font-bold mt-[6px]">{p[0]}</h3>
                    <p className="text-[#587885] text-[14px] flex-1">{p[3]}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-['Baloo_2',sans-serif] font-bold text-[20px]">₹{p[2]}</span>
                      <button className="border-0 rounded-full py-2 px-4 bg-[#104A64] text-white font-bold text-[14px] cursor-pointer" onClick={() => buyProduct(i)}>Buy</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WINNERS SECTION (#v-winners) */}
        <section className={`py-11 pb-18 ${activeTab === 'winners' ? '' : 'hidden'}`} id="v-winners">
          <div className="max-w-[1100px] mx-auto px-5 text-center py-16">
            <h2 className="font-['Baloo_2',sans-serif] text-[34px] font-bold">Winners Page Coming Soon</h2>
            <p className="text-[#587885] max-w-[50ch] mx-auto mt-[10px]">
              We are moving our weekly winners and their travel stories to a dedicated page! Stay tuned.
            </p>
            <a className="border-0 rounded-full py-[13px] px-[26px] bg-[#ED363E] text-white font-bold text-[15px] cursor-pointer no-underline inline-block mt-6" href="#home">
              Back to Home
            </a>
          </div>
        </section>

        {/* FAQ SECTION (#v-faq) */}
        <section className={`py-11 pb-18 ${activeTab === 'faq' ? '' : 'hidden'}`} id="v-faq">
          <div className="max-w-[1100px] mx-auto px-5">
            <h2 className="font-['Baloo_2',sans-serif] text-[34px] font-bold">Frequently asked questions</h2>
            <p className="text-[#587885] max-w-[60ch] mt-[10px]">Clear answers, in plain language. Draft text: have your lawyer review before launch.</p>
            <div className="mt-6 flex flex-col gap-3">
              {FAQS.map((f, i) => (
                <details key={i} className="bg-white border border-[#0E3E52]/20 rounded-[16px] p-5">
                  <summary className="font-semibold cursor-pointer">{f[0]}</summary>
                  <p className="text-[#587885] mt-[10px]">{f[1]}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION (#v-contact) */}
        <section className={`py-11 pb-18 ${activeTab === 'contact' ? '' : 'hidden'}`} id="v-contact">
          <div className="max-w-[1100px] mx-auto px-5">
            <h2 className="font-['Baloo_2',sans-serif] text-[34px] font-bold">Contact us</h2>
            <p className="text-[#587885] max-w-[60ch] mt-[10px]">Questions about an order, your wallet, or the weekly trip? We reply within 2 working days.</p>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[28px] mt-[26px]">
              <div className="bg-white border border-[#0E3E52]/20 rounded-[20px] p-[18px]">
                <label className="font-semibold text-[14px]">Name</label>
                <input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" value={contactName} onChange={e => setContactName(e.target.value)} />
                <label className="font-semibold text-[14px]">Email</label>
                <input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
                <label className="font-semibold text-[14px]">Message</label>
                <textarea className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" rows="4" value={contactMsg} onChange={e => setContactMsg(e.target.value)}></textarea>
                <button className="border-0 rounded-full py-[13px] px-[26px] bg-[#ED363E] text-white font-bold text-[15px] cursor-pointer mt-2" onClick={submitContact}>Send message</button>
              </div>
              <div className="bg-white border border-[#0E3E52]/20 rounded-[20px] p-[18px]">
                <h3 className="font-['Baloo_2',sans-serif] text-[20px] font-bold">Reach us</h3>
                <p className="text-[#587885]">Email: hello@luckmytrip.com<br />WhatsApp: +91 00000 00000<br />Hours: Mon–Sat, 10am–6pm IST</p>
                <h3 className="font-['Baloo_2',sans-serif] text-[20px] font-bold mt-[14px]">Follow</h3>
                <p className="text-[#587885]">Instagram: @LuckMyTrip</p>
              </div>
            </div>
          </div>
        </section>

        {/* WALLET SECTION (#v-wallet) */}
        <section className={`py-11 pb-18 ${activeTab === 'wallet' ? '' : 'hidden'}`} id="v-wallet">
          <div className="max-w-[1100px] mx-auto px-5">
            <h2 className="font-['Baloo_2',sans-serif] text-[34px] font-bold">My wallet</h2>
            <p className="text-[#587885] max-w-[60ch] mt-[10px]">Add money by UPI, card, net banking or crypto, and use it to buy products.</p>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[28px] mt-[26px]">
              <div className="bg-white border border-[#0E3E52]/20 rounded-[20px] p-[18px]">
                <small className="text-[#587885] font-semibold">Balance</small>
                <div className="font-['Baloo_2',sans-serif] font-extrabold text-[54px] text-[#1F8E92]">₹{state.bal}</div>
                <label className="font-semibold text-[14px]">Amount to add (₹)</label>
                <input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" type="number" min="100" value={walletAmt} onChange={e => setWalletAmt(e.target.value)} />
                <div className="flex gap-[14px] flex-wrap items-center">
                  <button className="border-0 rounded-full py-[13px] px-[26px] bg-[#ED363E] text-white font-bold text-[15px] cursor-pointer" onClick={handleTopup}>Add money</button>
                </div>
                <p className="bg-white border-l-4 border-[#52C2C5] rounded-r-[14px] p-4 text-[#587885] text-[14px] mt-4">Wallet money can be used only for LuckMyTrip purchases and is not withdrawable.</p>
              </div>
              <div className="bg-white border border-[#0E3E52]/20 rounded-[20px] p-[18px]">
                <h3 className="font-['Baloo_2',sans-serif] text-[20px] font-bold">Recent activity</h3>
                <div className="mt-2">
                  {state.tx.length ? state.tx.slice(-6).reverse().map((t, i) => (
                    <div key={i} className="flex justify-between py-3 border-t border-[#0E3E52]/20 text-[15px]">
                      <span>{t[0]}</span>
                      <b>{t[1]}</b>
                    </div>
                  )) : <p className="text-[#587885]">No activity yet.</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER NOTICE / DISCLAIMER */}
      <footer className="bg-[#EAF2F2] border-t border-[#0E3E52]/10 py-6 px-5 mt-12 text-center text-[#587885] text-[13px]">
        <div className="max-w-[1100px] mx-auto">
          Judged promotion. Purchase, posting requirements, eligibility and full terms apply. Wallet and payments in this demo are simulated. © 2026 LuckMyTrip
        </div>
      </footer>

      {/* AUTH MODAL */}
      {authModal && (
        <div className="fixed inset-0 bg-[#092A38]/60 grid place-items-center z-50">
          <div className="bg-white border-0 rounded-[22px] p-6 w-[min(460px,92vw)] text-[#0E3E52] shadow-xl">
            <h2 className="font-['Baloo_2',sans-serif] text-[28px] font-bold">{authMode === 'login' ? 'Welcome back' : 'Create account'}</h2>
            <div className="flex gap-1.5 my-[14px]">
              <button className={`font-semibold text-[14px] py-2 px-3.5 rounded-full border border-[#0E3E52]/20 cursor-pointer ${authMode === 'login' ? 'bg-[#104A64] text-white border-[#104A64]' : 'bg-[#F3F7F7] text-[#0E3E52]'}`} onClick={() => setAuthMode('login')}>Log in</button>
              <button className={`font-semibold text-[14px] py-2 px-3.5 rounded-full border border-[#0E3E52]/20 cursor-pointer ${authMode === 'signup' ? 'bg-[#104A64] text-white border-[#104A64]' : 'bg-[#F3F7F7] text-[#0E3E52]'}`} onClick={() => setAuthMode('signup')}>Sign up</button>
            </div>
            {authMode === 'signup' && (
              <>
                <label className="font-semibold text-[14px]">Full name</label>
                <input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" value={authName} onChange={e => setAuthName(e.target.value)} />
              </>
            )}
            <label className="font-semibold text-[14px]">Email or mobile</label>
            <input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
            <label className="font-semibold text-[14px]">Password</label>
            <input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" type="password" value={authPass} onChange={e => setAuthPass(e.target.value)} />
            <div className="flex gap-[14px] flex-wrap items-center mt-2">
              <button className="border-0 rounded-full py-[13px] px-[26px] bg-[#ED363E] text-white font-bold text-[15px] cursor-pointer" onClick={() => handleLogin(authMode === 'login')}>{authMode === 'login' ? 'Log in' : 'Create account'}</button>
              <button className="rounded-full py-[13px] px-[26px] bg-transparent text-[#0E3E52] border-2 border-[#0E3E52] font-bold text-[15px] cursor-pointer" onClick={() => setAuthModal(false)}>Cancel</button>
            </div>
            <p className="bg-white border-l-4 border-[#52C2C5] rounded-r-[14px] p-4 text-[#587885] text-[14px] mt-4">Demo only: no real account is created.</p>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {payModal && curPay && (
        <div className="fixed inset-0 bg-[#092A38]/60 grid place-items-center z-50">
          <div className="bg-white border-0 rounded-[22px] p-6 w-[min(460px,92vw)] text-[#0E3E52] shadow-xl">
            <h2 className="font-['Baloo_2',sans-serif] text-[26px] font-bold">Pay ₹{curPay.amt}</h2>
            <p className="text-[#587885]">{curPay.label}</p>
            <div className="flex gap-1.5 flex-wrap my-[14px]">
              {[['upi', 'UPI'], ['card', 'Card'], ['bank', 'Net banking'], ['crypto', 'Crypto'], ...(curPay.kind === 'buy' ? [['wallet', 'Wallet']] : [])].map(m => (
                <button key={m[0]} className={`font-semibold text-[14px] py-2 px-3.5 rounded-full border border-[#0E3E52]/20 cursor-pointer ${curPay.m === m[0] ? 'bg-[#104A64] text-white border-[#104A64]' : 'bg-[#F3F7F7] text-[#0E3E52]'}`} onClick={() => setCurPay({ ...curPay, m: m[0] })}>
                  {m[1]}
                </button>
              ))}
            </div>

            {curPay.m === 'upi' && (
              <div>
                <label className="font-semibold text-[14px]">UPI ID</label>
                <input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" placeholder="name@bank" value={curPay.f1 || ''} onChange={e => setCurPay({ ...curPay, f1: e.target.value })} />
                <div className="flex gap-[14px] flex-wrap items-center mt-2">
                  <span className="bg-white border border-[#0E3E52]/20 rounded-full px-3.5 py-1.5 font-semibold text-[14px]">GPay</span>
                  <span className="bg-white border border-[#0E3E52]/20 rounded-full px-3.5 py-1.5 font-semibold text-[14px]">PhonePe</span>
                  <span className="bg-white border border-[#0E3E52]/20 rounded-full px-3.5 py-1.5 font-semibold text-[14px]">Paytm</span>
                </div>
              </div>
            )}

            {curPay.m === 'card' && (
              <div>
                <label className="font-semibold text-[14px]">Card number</label>
                <input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" inputMode="numeric" placeholder="1234 5678 9012 3456" value={curPay.f1 || ''} onChange={e => setCurPay({ ...curPay, f1: e.target.value })} />
                <label className="font-semibold text-[14px]">Name on card</label>
                <input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" />
                <div className="flex gap-[14px]">
                  <div className="flex-1"><label className="font-semibold text-[14px]">Expiry</label><input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" placeholder="MM/YY" /></div>
                  <div className="flex-1"><label className="font-semibold text-[14px]">CVV</label><input className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]" type="password" placeholder="•••" /></div>
                </div>
              </div>
            )}

            {curPay.m === 'bank' && (
              <div>
                <label className="font-semibold text-[14px]">Choose your bank</label>
                <select className="w-full p-3 rounded-[12px] border border-[#0E3E52]/20 bg-[#F3F7F7] text-[#0E3E52] my-[6px]">
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>SBI</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}

            {curPay.m === 'crypto' && (
              <div>
                <p className="text-[#587885] my-2">Pay securely with USDC or USDT on Polygon/Ethereum network.</p>
              </div>
            )}

            {curPay.m === 'wallet' && (
              <div>
                <p className="text-[#587885] my-2">Current wallet balance: <b>₹{state.bal}</b></p>
              </div>
            )}

            <div className="flex gap-[14px] flex-wrap items-center mt-5">
              <button className="border-0 rounded-full py-[13px] px-[26px] bg-[#ED363E] text-white font-bold text-[15px] cursor-pointer" onClick={executePayment}>Pay ₹{curPay.amt}</button>
              <button className="rounded-full py-[13px] px-[26px] bg-transparent text-[#0E3E52] border-2 border-[#0E3E52] font-bold text-[15px] cursor-pointer" onClick={() => setPayModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#0E3E52] text-white py-3 px-5 rounded-full shadow-lg font-semibold text-[14px] z-50 animate-bounce">
          {toastMsg}
        </div>
      )}
    </div>
  );
}