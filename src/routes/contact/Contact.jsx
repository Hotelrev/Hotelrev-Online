import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdPhone, MdEmail } from "react-icons/md";
import customerCare from '../../assets/logos/hotelrev-customer-car.png'

const Contact = () => {
    const [successMessage, setSuccessMessage] = useState(false)
    const [contactFormData, setContactFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactFormData({ ...contactFormData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage(true)
        setTimeout(() => {
            setSuccessMessage(false)
        }, 2000);
        setContactFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        })
        console.log("Form submitted:", contactFormData);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex lg:flex-row flex-col items-center justify-between gap-20">
                    <div className="">
                        <img src={customerCare} className="lg:w-[350px]" alt="Hotelrev Customer Care" />

                        <div className="text-center mt-8">
                            <h3 className="text-lg font-medium text-gray-900">We have a dedicated Team who are ready <br /> to solve any issue you could be facing. <br /> Reach out to us!</h3>
                            <div className="flex gap-7">
                                <a href="tel:+2349063525949" className="mt-2 text-sm text-gray-600">
                                    <MdPhone className="inline mr-2" /> +234 906 352 5949
                                </a>
                                <a href="mailto:hotelrev@zoho.com" className="mt-2 text-sm text-gray-600">
                                    <MdEmail className="inline mr-2" /> hotelrev@zoho.com
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg ">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-blue-900">Contact Us</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="name" className="sr-only">Full Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                                        placeholder="Full Name"
                                        value={contactFormData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={contactFormData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="sr-only">Subject</label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                                        placeholder="Subject"
                                        value={contactFormData.subject}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                                        placeholder="Message"
                                        value={contactFormData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {successMessage && <p className="text-green-600">Submitted. We will get back to you ASAP!</p>}
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                        <div className="text-center mt-8">
                            <h3 className="text-lg font-medium text-gray-900">Get in Touch</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                <MdPhone className="inline mr-2" /> +234 906 352 5949
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                                <MdEmail className="inline mr-2" /> hotelrev@zoho.com
                            </p>
                            <div className="mt-4 flex justify-center space-x-4">
                                <a href="https://www.facebook.com/profile.php?id=61561195584204" className="text-blue-900 hover:text-blue-700">
                                    <FaFacebook size="2em" />
                                </a>
                                <a href="https://www.instagram.com/hotelrev.ng/" className="text-blue-900 hover:text-blue-700">
                                    <FaInstagram size="2em" />
                                </a>
                                <a href="https://x.com/Hotelrev_" className="text-blue-900 hover:text-blue-700">
                                    <FaTwitter size="2em" />
                                </a>
                                <a href="https://wa.me/+2349063525949" className="text-blue-900 hover:text-blue-700">
                                    <FaWhatsapp size="2em" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
