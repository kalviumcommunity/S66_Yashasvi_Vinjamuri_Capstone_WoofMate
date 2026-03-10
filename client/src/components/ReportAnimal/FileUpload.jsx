import { Camera, Upload } from "lucide-react";

const FileUpload = ({ selectedFiles, handleFileChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      Photos (if available)
    </label>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
      <div className="space-y-1 text-center">
        <div className="flex justify-center">
          <Camera className="mx-auto text-gray-400" size={24} />
        </div>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
          >
            <span>Upload files</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
    {selectedFiles.length > 0 && (
      <div className="mt-2 text-sm text-gray-600">
        {selectedFiles.length} file(s) selected
      </div>
    )}
  </div>
);

export default FileUpload;
