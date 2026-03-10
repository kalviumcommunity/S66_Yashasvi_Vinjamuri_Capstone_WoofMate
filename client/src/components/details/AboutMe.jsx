// import React from "react";
// import ContactMe from "./ContactMe";
// import { Code, Cpu, Database, GitBranch, Layout } from "lucide-react";
// import me from '../assets/me.jpg'

// const AboutMe = () => {
//   return (
//     <div className="px-4 sm:px-6 py-16 max-w-6xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//         {/* Left Section */}
//         <div className="space-y-6">
//           <div className="space-y-4">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
//               About <span className="text-indigo-600">Me</span>
//             </h1>
//             <h3 className="text-lg md:text-xl text-gray-700 leading-relaxed">
//               Currently a first-year student at{" "}
//               <span className="font-semibold text-indigo-600">
//                 Lovely Professional University, Punjab
//               </span>
//               , pursuing{" "}
//               <span className="font-semibold text-indigo-600">BTech CSE</span>{" "}
//               with a specialization in{" "}
//               <span className="font-semibold text-indigo-600">SPE</span>.
//             </h3>
//             <p className="text-gray-600 leading-relaxed">
//               I'm passionate about full-stack web development, UI/UX design, and
//               leveraging AI in real-world applications. I love building
//               user-focused apps that make a difference.
//             </p>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//               <Cpu className="text-indigo-500" size={24} />
//               Skills & Expertise
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex items-start gap-3">
//                 <Code className="text-indigo-500 mt-1" size={18} />
//                 <div>
//                   <h4 className="font-medium text-gray-800">Frontend</h4>
//                   <p className="text-gray-600 text-sm">
//                     JavaScript, React, Tailwind CSS
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <Database className="text-indigo-500 mt-1" size={18} />
//                 <div>
//                   <h4 className="font-medium text-gray-800">Backend</h4>
//                   <p className="text-gray-600 text-sm">
//                     Node.js, Express, MongoDB
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <Layout className="text-indigo-500 mt-1" size={18} />
//                 <div>
//                   <h4 className="font-medium text-gray-800">UI/UX</h4>
//                   <p className="text-gray-600 text-sm">
//                     Figma, Responsive Design
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <GitBranch className="text-indigo-500 mt-1" size={18} />
//                 <div>
//                   <h4 className="font-medium text-gray-800">Deployment</h4>
//                   <p className="text-gray-600 text-sm">
//                     Git, GitHub, Netlify, Render
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="relative group">
//           <div className="overflow-hidden rounded-xl shadow-xl border-4 border-white relative">
//             <img
//               src={me}
//               alt="Yashasvi Vinjamuri"
//               className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
//               <h1 className="text-2xl font-bold text-white">
//                 Yashasvi Vinjamuri
//               </h1>
//               <p className="text-indigo-200">
//                 Full Stack Developer & UI/UX Enthusiast
//               </p>
//             </div>
//           </div>

//           {/* Floating Badges */}
//           <div className="absolute -top-4 -right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg">
//             <span className="font-medium">BTech CSE</span>
//           </div>
//           <div className="absolute -bottom-4 -left-4 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-lg border border-indigo-100">
//             <span className="font-medium">Specialization: SPE</span>
//           </div>
//         </div>
//       </div>

//       {/* Contact Section */}
//       <div className="mt-20">
//         <ContactMe />
//       </div>
//     </div>
//   );
// };

// export default AboutMe;
