// import React from "react";
// import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

// const ContactUs = () => {
//   return (
//     <section className="py-16 px-4 sm:px-6 bg-gray-50 rounded-2xl">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//             Get In <span className="text-indigo-600">Touch</span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Have a project in mind or want to collaborate? Feel free to reach
//             out! I'm always open to discussing new opportunities.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Information */}
//           <div className="space-y-8">
//             <div className="flex items-start gap-5">
//               <div className="bg-indigo-100 p-3 rounded-full">
//                 <Mail className="text-indigo-600" size={20} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Email</h3>
//                 <a
//                   href="mailto:yashasvi@example.com"
//                   className="text-gray-600 hover:text-indigo-600 transition"
//                 >
//                   yashasvi@example.com
//                 </a>
//               </div>
//             </div>

//             <div className="flex items-start gap-5">
//               <div className="bg-indigo-100 p-3 rounded-full">
//                 <Phone className="text-indigo-600" size={20} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
//                 <a
//                   href="tel:+919876543210"
//                   className="text-gray-600 hover:text-indigo-600 transition"
//                 >
//                   +91 98765 43210
//                 </a>
//               </div>
//             </div>

//             <div className="flex items-start gap-5">
//               <div className="bg-indigo-100 p-3 rounded-full">
//                 <MapPin className="text-indigo-600" size={20} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Location
//                 </h3>
//                 <p className="text-gray-600">
//                   Lovely Professional University, Punjab, India
//                 </p>
//               </div>
//             </div>

//             {/* Social Links */}
//             <div className="pt-4">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Connect With Me
//               </h3>
//               <div className="flex gap-4">
//                 <a
//                   href="https://linkedin.com/in/yourprofile"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-white p-3 rounded-full shadow-md hover:bg-indigo-50 transition"
//                 >
//                   <Linkedin className="text-indigo-600" size={20} />
//                 </a>
//                 <a
//                   href="https://github.com/yourprofile"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-white p-3 rounded-full shadow-md hover:bg-indigo-50 transition"
//                 >
//                   <Github className="text-indigo-600" size={20} />
//                 </a>
//                 <a
//                   href="https://twitter.com/yourprofile"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-white p-3 rounded-full shadow-md hover:bg-indigo-50 transition"
//                 >
//                   <Twitter className="text-indigo-600" size={20} />
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Your Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                     placeholder="john@example.com"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="subject"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   placeholder="Project Collaboration"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="message"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   rows={4}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   placeholder="Your message here..."
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02]"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;
