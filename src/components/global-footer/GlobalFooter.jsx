import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink = ({ to, label }) => (
  <Link
    to={to}
    className="block text-slate-700 hover:text-brand hover:scale-[1.1] hover:font-normal transition-all transition-colors duration-300"
  >
    {label}
  </Link>
);

const GlobalFooter = () => {
  return (
    <footer className="bg-slate-50 text-slate-700 mt-6">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-wrap justify-between">
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Top destinations</h4>
            <FooterLink to="/" label="Zanzibar" />
            <FooterLink to="/" label="Seychelles" />
            <FooterLink to="/" label="Capetown" />
            <FooterLink to="/" label="Abuja" />
            <FooterLink to="/" label="Accra" />
            <FooterLink to="/" label="Lagos" />
            <FooterLink to="/" label="Cairo" />
            <FooterLink to="/" label="Marrakech" />
            <FooterLink to="/" label="Nairobi" />
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Top Countries</h4>
            <FooterLink to="/" label="South Africa" />
            <FooterLink to="/" label="Egypt" />
            <FooterLink to="/" label="Nigeria" />
            <FooterLink to="/" label="Morocco" />
            <FooterLink to="/" label="Rwanda" />
            <FooterLink to="/" label="Tanzania" />
            <FooterLink to="/" label="Zambia" />
            <FooterLink to="/" label="Botswana" />
            <FooterLink to="/" label="Malawi" />
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Partnership</h4>
            <FooterLink to="/" label="Travel agencies" />
            <FooterLink to="/" label="Affiliate Program" />
            <FooterLink to="/" label="List your Hotel" />
            <FooterLink to="/" label="List your shortlet" />
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Support</h4>
            <FooterLink to="/about-us" label="About Us" />
            <FooterLink to="/contact-us" label="Contact" />
            <FooterLink to="/privacy-policy" label="Privacy Policy" />
            <FooterLink to="/about-us" label="FAQs" />
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Newsletter</h4>
            <p>Stay updated with our latest trends</p>
            <form>
              <input
                type="email"
                placeholder="Enter email"
                className="p-2 rounded"
              />
              <button className="ml-2 p-2 bg-brand text-white rounded">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-10">
          <p>
            Copyright &copy; {new Date().getFullYear()} Hotelrev Online All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
