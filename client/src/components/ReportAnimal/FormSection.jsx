import { Phone, Mail, MapPin } from "lucide-react";
import InputField from "./InputField";
import FileUpload from "./FileUpload";

const FormSection = ({
  formData,
  handleInputChange,
  selectedFiles,
  handleFileChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Your name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Phone number"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        type="tel"
        icon={Phone}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Dog's condition"
        name="dogCondition"
        value={formData.dogCondition}
        onChange={handleInputChange}
        required
        as="select"
      >
        <option value="">Select condition</option>
        <option value="injured">Injured</option>
        <option value="sick">Sick</option>
        <option value="abused">Abused</option>
        <option value="neglected">Neglected</option>
        <option value="stray">Stray</option>
        <option value="other">Other</option>
      </InputField>
      <InputField
        label="Condition type"
        name="conditionType"
        value={formData.conditionType}
        onChange={handleInputChange}
        as="select"
      >
        <option value="">Select type</option>
        <option value="urgent">Urgent</option>
        <option value="non-urgent">Non-urgent</option>
        <option value="emergency">Emergency</option>
      </InputField>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Email Address"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        type="email"
        icon={Mail}
      />
      <InputField
        label="Dog's Location"
        name="dogLocation"
        value={formData.dogLocation}
        onChange={handleInputChange}
        required
        icon={MapPin}
        placeholder="Nearest landmark or area"
      />
    </div>

    <InputField
      label="Address or general area"
      name="address"
      value={formData.address}
      onChange={handleInputChange}
      placeholder="Street, city, postal code"
    />

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Description <span className="text-red-500">*</span>
      </label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        placeholder="Please describe the dog and the situation briefly"
      ></textarea>
    </div>

    <FileUpload
      selectedFiles={selectedFiles}
      handleFileChange={handleFileChange}
    />

    <div className="pt-4">
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg"
      >
        Submit Report
      </button>
    </div>
  </form>
);

export default FormSection;
