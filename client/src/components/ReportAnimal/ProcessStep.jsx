const ProcessStep = ({ number, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
    <div className="bg- w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <span className="text-indigo-600 font-bold">{number}</span>
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

export default ProcessStep;
