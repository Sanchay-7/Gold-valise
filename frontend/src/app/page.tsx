import { SVGProps } from 'react';
import Link from 'next/link';

// Main App Component
export default function App() {
  return (
    <div className="bg-[#0f1c2c] text-[#e0e0e0] font-sans">
      <Header />
      <main>
        <HeroSection />
        {/* <TrustSection /> */}
        <FeaturesSection />
        <LivePriceSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  return (
    <header className="bg-[#0f1c2c]/80 backdrop-blur-sm sticky top-0 z-50 border-b border-[#1a2b44]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <GoldCoinIcon className="h-8 w-8 text-[#d4af37]" />
          <span className="text-2xl font-bold text-white">Valise</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {["Features", "Pricing", "About Us", "Blog"].map((item) => (
            <a key={item} href="#" className="hover:text-[#d4af37] transition-colors">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="hidden md:block text-sm hover:text-[#d4af37] transition-colors">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-[#d4af37] text-[#0f1c2c] font-bold py-2 px-5 rounded-full shadow-md shadow-amber-500/20 
                       transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/50" // <-- UPDATED FOR GLOW EFFECT
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative container mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 lg:w-3/5 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg">
          The Modern Way to Own <span className="text-[#d4af37]">Digital Gold</span>
        </h1>
        <p className="text-[#a0a0a0] text-lg mb-10 max-w-lg mx-auto md:mx-0">
          Secure, insured, 24K digital gold at your fingertips. Start your investment journey today from just ₹10.
        </p>
        <div className="flex justify-center md:justify-start space-x-5">
          <Link 
            href="/signup" 
            className="bg-[#d4af37] text-[#0f1c2c] font-semibold py-4 px-10 rounded-full shadow-lg shadow-amber-500/30 
                       transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/50" // <-- UPDATED FOR GLOW EFFECT
          >
            Create Free Account
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 lg:w-2/5 mt-12 md:mt-0 flex justify-center">
        <div className="relative w-80 h-80">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 to-[#d4af37]/5 rounded-full blur-3xl animate-pulse"></div>
          <GoldBarIcon className="absolute w-full h-full text-[#d4af37] opacity-90 animate-float drop-shadow-xl" />
        </div>
      </div>
    </section>
  );
}

// NEW: Trust Section
// function TrustSection() {
//     return (
//         <section className="bg-[#0a1624] py-12">
//             <div className="container mx-auto px-6 text-center">
//                 <h3 className="text-sm font-bold tracking-widest text-[#a0a0a0] uppercase mb-6">
//                     Trusted by Industry Leaders & Partners
//                 </h3>
//                 <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
//                     <p className="font-bold text-2xl text-gray-500">Forbes</p>
//                     <p className="font-bold text-2xl text-gray-500">Bloomberg</p>
//                     <p className="font-bold text-2xl text-gray-500">TechCrunch</p>
//                     <p className="font-bold text-2xl text-gray-500">SecureVault™</p>
//                     <p className="font-bold text-2xl text-gray-500">InsureRight</p>
//                 </div>
//             </div>
//         </section>
//     );
// }

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      title: "Auto-Invest in Gold",
      description: "Set up daily, weekly, or monthly investments and watch your savings grow automatically.",
      icon: <ClockWithArrowIcon className="h-8 w-8" />,
    },
    {
      title: "Bank-Grade Security",
      description: "Your gold is stored in insured, world-class vaults, protected with 256-bit encryption.",
      icon: <ShieldCheckIcon className="h-8 w-8" />,
    },
    {
      title: "Live Market Tracking",
      description: "Access real-time gold prices to make informed decisions anytime, anywhere.",
      icon: <ChartBarIcon className="h-8 w-8" />,
    },
    {
      title: "Instant Liquidity",
      description: "Sell your digital gold 24/7 and receive funds directly in your bank account.",
      icon: <BoltIcon className="h-8 w-8" />,
    },
  ];

  return (
    <section className="container mx-auto px-6 py-20 md:py-28">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-3 text-white">The Smartest Way to Build Your Portfolio</h2>
        <p className="text-[#a0a0a0] max-w-2xl mx-auto">
          Experience the benefits of gold investment without the drawbacks of physical ownership.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-[#1a2b44] flex items-start space-x-6 hover:-translate-y-2 transition-transform shadow-lg"
          >
            <div className="flex-shrink-0 p-4 rounded-full bg-[#d4af37] text-[#0f1c2c] shadow-md">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-[#a0a0a0]">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// NEW: Live Price Section
function LivePriceSection() {
    return (
        <section className="container mx-auto px-6 py-10 md:py-20">
            <div className="bg-white/5 border border-[#1a2b44] rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8">
                <div className="w-full lg:w-1/3 text-center lg:text-left">
                    <h2 className="text-3xl font-extrabold text-white mb-2">Live Market Price</h2>
                    <p className="text-[#a0a0a0] mb-6">Prices are updated in real-time. What you see is what you get.</p>
                    <div className="flex justify-center lg:justify-start gap-6">
                        <div>
                            <p className="text-sm text-[#a0a0a0]">BUY PRICE (1g)</p>
                            <p className="text-2xl font-bold text-[#d4af37]">₹ 7,345.50</p>
                        </div>
                        <div>
                            <p className="text-sm text-[#a0a0a0]">SELL PRICE (1g)</p>
                            <p className="text-2xl font-bold text-white">₹ 7,112.80</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3">
                    {/* Placeholder for a chart */}
                    <div className="h-64 bg-[#0a1624]/50 rounded-2xl flex items-center justify-center">
                       <ChartPlaceholderIcon className="w-full h-full text-[#1a2b44]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// How It Works Section
function HowItWorksSection() {
  return (
    <section className="bg-[#0a1624] py-20 md:py-28">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-3 text-white">Get Started in 3 Easy Steps</h2>
        <p className="text-[#a0a0a0] max-w-2xl mx-auto mb-16">Start your gold investment journey in minutes.</p>
        <div className="grid md:grid-cols-3 gap-12 relative">
           {/* Dashed line connector for desktop */}
           <div className="hidden md:block absolute top-10 left-0 w-full h-px">
                <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" stroke="#1a2b44" strokeWidth="2" strokeDasharray="8 8"/></svg>
           </div>

          {["Create Account", "Add Funds", "Buy Digital Gold"].map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className="bg-[#d4af37] text-[#0f1c2c] h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold border-8 border-[#0a1624]">{idx + 1}</div>
              <h3 className="text-2xl font-bold mt-6 mb-2 text-white">{step}</h3>
              <p className="text-[#a0a0a0]">
                {idx === 0
                  ? "Sign up with your details and complete a quick one-time KYC."
                  : idx === 1
                  ? "Securely add money using UPI, Cards, or Net Banking."
                  : "Purchase 24K gold at live rates and see it in your vault instantly."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// NEW: Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    { name: 'Amol R.', role: 'Full-Stack Developer', quote: 'Valise made investing in gold so simple. I set up a monthly SIP and now my savings are growing automatically. Highly recommended!', avatar: 'AR' },
    { name: 'Priya S.', role: 'Marketing Manager', quote: 'The security features gave me peace of mind. Knowing my investment is stored in insured vaults is a huge plus. The app is clean and easy to use.', avatar: 'PS' },
    { name: 'Raj V.', role: 'Small Business Owner', quote: 'Being able to buy and sell 24/7 is a game-changer. The liquidity is fantastic, and transactions are instant. This is the future of gold investment.', avatar: 'RV' },
  ];
  return (
    <section className="container mx-auto px-6 py-20 md:py-28">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-3 text-white">Loved by Investors Everywhere</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map(t => (
          <div key={t.name} className="bg-white/5 border border-[#1a2b44] rounded-3xl p-8 flex flex-col">
            <div className="flex mb-4">{[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5 text-[#d4af37]" />)}</div>
            <p className="text-[#a0a0a0] flex-grow">{t.quote}</p>
            <div className="flex items-center mt-6">
                <div className="h-12 w-12 rounded-full bg-[#1a2b44] flex items-center justify-center font-bold text-[#d4af37] mr-4">{t.avatar}</div>
                <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-sm text-[#a0a0a0]">{t.role}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// NEW: FAQ Section
function FAQSection() {
    const faqs = [
        { q: 'What is digital gold?', a: 'Digital gold is a mode of investing in physical gold. It is an instrument that allows you to invest in pure gold in digital form. For every gram of digital gold you buy, there is actual 24K physical gold stored in a secure, insured vault under your name.'},
        { q: 'Is my investment secure?', a: 'Absolutely. All digital gold is stored in world-class, insured vaults managed by regulated custodians. We also use bank-grade encryption and security protocols to protect all your transactions and data.'},
        { q: 'Are there any hidden charges?', a: 'We believe in full transparency. The price you see includes a small spread to cover storage, insurance, and custodian fees. There are no other hidden charges for buying, selling, or holding your gold.'},
        { q: 'Can I convert my digital gold to physical coins?', a: 'Yes, you can. Once your holding reaches a certain weight (e.g., 1 gram), you can request for it to be delivered to your doorstep in the form of certified coins or bars, subject to making and delivery charges.'},
    ];
    return (
        <section className="bg-[#0a1624] py-20 md:py-28">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold mb-3 text-white">Frequently Asked Questions</h2>
                    <p className="text-[#a0a0a0]">Have questions? We have answers.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map(faq => (
                        <details key={faq.q} className="bg-[#0f1c2c] border border-[#1a2b44] rounded-xl p-6 group cursor-pointer">
                            <summary className="flex justify-between items-center font-semibold text-white list-none">
                                {faq.q}
                                <PlusMinusIcon className="h-6 w-6 transition-transform group-open:rotate-45" />
                            </summary>
                            <p className="text-[#a0a0a0] mt-4">{faq.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

// CTA Section
function CTASection() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-28">
      <div className="bg-gradient-to-r from-[#d4af37]/80 to-[#d4af37] rounded-3xl p-10 md:p-16 text-center shadow-2xl shadow-amber-500/20">
        <h2 className="text-4xl font-extrabold mb-4 text-[#0f1c2c]">Ready to Secure Your Financial Future?</h2>
        <p className="text-black/70 max-w-2xl mx-auto mb-8">
          Join thousands of smart investors who are diversifying their portfolio with the timeless value of gold.
        </p>
        <Link 
          href="/signup" 
          className="bg-[#0f1c2c] text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg
                     transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/25" // <-- UPDATED FOR A SUBTLE GLOW
        >
          Create Your Free Account
        </Link>
      </div>
    </section>
  );
}


// Footer Component
function Footer() {
  return (
    <footer className="bg-[#0a1624] border-t border-[#1a2b44]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <GoldCoinIcon className="h-7 w-7 text-[#d4af37]" />
              <span className="text-xl font-bold text-white">Valise</span>
            </div>
            <p className="text-[#a0a0a0] text-sm">The modern way to own gold.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg text-white">Company</h4>
            <ul className="space-y-2 text-[#a0a0a0] text-sm">
              <li><a href="#" className="hover:text-[#d4af37]">About</a></li>
              <li><a href="#" className="hover:text-[#d4af37]">Careers</a></li>
              <li><a href="#" className="hover:text-[#d4af37]">Blog</a></li>
              <li><a href="#" className="hover:text-[#d4af37]">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg text-white">Support</h4>
            <ul className="space-y-2 text-[#a0a0a0] text-sm">
              <li><a href="#" className="hover:text-[#d4af37]">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#d4af37]">FAQs</a></li>
              <li><a href="#" className="hover:text-[#d4af37]">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg text-white">Legal</h4>
            <ul className="space-y-2 text-[#a0a0a0] text-sm">
              <li><a href="#" className="hover:text-[#d4af37]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#d4af37]">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[#1a2b44] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#a0a0a0]">
          <p>&copy; {new Date().getFullYear()} Valise Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" aria-label="Twitter"><TwitterIcon className="h-5 w-5 hover:text-[#d4af37]" /></a>
            <a href="#" aria-label="LinkedIn"><LinkedinIcon className="h-5 w-5 hover:text-[#d4af37]" /></a>
            <a href="#" aria-label="Facebook"><FacebookIcon className="h-5 w-5 hover:text-[#d4af37]" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- SVG Icons (Improved Versions) ---
function GoldCoinIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.093c-1.72.23-2.813.516-3.454.816a.75.75 0 00-.43 1.112c.188.303.626.734 1.258 1.153 1.483.992 2.022 1.928 1.684 2.852-.337.922-1.422 1.32-2.823 1.322v.093a.75.75 0 001.5 0v-.093c1.72-.23 2.813.516 3.454-.816a.75.75 0 00.43-1.112c-.188-.303-.626-.734-1.258-1.153-1.483-.992-2.022-1.928-1.684-2.852.337-.922 1.422-1.32 2.823-1.322V6z" clipRule="evenodd" />
        </svg>
    );
}
function GoldBarIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M4.5 7.12L12 11.5l7.5-4.38L12 2.75 4.5 7.12zM21 8.5v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8l9 5.25 9-5.25zM4.5 16.88L12 12.5l7.5 4.38L12 21.25 4.5 16.88z"/>
        </svg>
    );
}
function ClockWithArrowIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c-2.14 0-4.07.9-5.5 2.37M21 7.5v5.5h-5.5" />
        </svg>
    );
}
function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
        </svg>
    );
}
function ChartBarIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
    );
}
function BoltIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
    );
}
function ChartPlaceholderIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M0 80 C 40 10, 60 50, 100 40 S 140 60, 180 80 S 220 70, 260 50 S 300 20, 300 20" stroke="currentColor" strokeWidth="2"/>
        </svg>
    );
}
function StarIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.116 3.986 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.116-3.986c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
        </svg>
    );
}
function PlusMinusIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
}
// Social Icons are kept the same as they are standard
function TwitterIcon(props: SVGProps<SVGSVGElement>) { return (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M24 4.56c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.955-2.178-1.55-3.594-1.55-2.722 0-4.932 2.21-4.932 4.932 0 .387.043.763.127 1.124-4.096-.205-7.735-2.167-10.17-5.144-.425.729-.667 1.577-.667 2.476 0 1.708.87 3.215 2.188 4.099-.808-.026-1.567-.248-2.228-.617v.062c0 2.386 1.697 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.317 0-.626-.031-.927-.088.627 1.956 2.444 3.379 4.6 3.419-1.68 1.318-3.808 2.105-6.115 2.105-.397 0-.788-.023-1.175-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.053 0 14.001-7.503 14.001-14.001 0-.213-.004-.426-.014-.637.961-.694 1.796-1.562 2.457-2.549z"/></svg>); }
function LinkedinIcon(props: SVGProps<SVGSVGElement>) { return (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7 0h3.75v2.18h.05c.52-.98 1.79-2.01 3.68-2.01 3.93 0 4.65 2.59 4.65 5.96V24h-4v-8.27c0-1.97-.04-4.51-2.75-4.51-2.75 0-3.17 2.14-3.17 4.36V24h-4V8z"/></svg>); }
function FacebookIcon(props: SVGProps<SVGSVGElement>) { return (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>); }