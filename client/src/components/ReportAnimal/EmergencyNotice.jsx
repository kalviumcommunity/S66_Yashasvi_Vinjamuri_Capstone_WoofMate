import { AlertCircle, Phone } from "lucide-react";

const EmergencyNotice = () => (
  <div className="bg-red-100/70 border-l-8 border-red-600 p-5 mb-10 rounded-md shadow-sm">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">
        <AlertCircle className="text-red-600" size={24} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-red-800 mb-1">
          Emergency Situation?
        </h3>
        <p className="text-sm text-red-700 leading-relaxed">
          If a dog requires emergency care or support, please{" "}
          <span className="font-medium underline underline-offset-2 text-red-800">
            call us immediately
          </span>{" "}
          at the number below <strong>before filling out the form</strong>.
        </p>
        <div className="mt-3 flex items-center text-red-900 font-semibold text-sm">
          <Phone className="mr-2" size={18} />
          <a
            href="tel:3333333339"
            className="hover:underline hover:text-red-700 transition"
          >
            333 333 3339
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default EmergencyNotice;
