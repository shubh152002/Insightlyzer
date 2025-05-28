// components/UploadCard.jsx
const UploadCard = ({ upload, index }) => {
  const totalRows = upload.data?.length || 0;
  const maxRows = 100; // static or configurable
  const progress = Math.min((totalRows / maxRows) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300">
      <div className="text-sm text-gray-500 mb-1">
        #{index + 1} &bull; {new Date(upload.uploadedAt).toLocaleDateString()}
      </div>

      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-800 truncate">
          {upload.fileName}
        </h4>
        <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          CSV
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Rows: {totalRows} / {maxRows}
        </div>
      </div>

      {/* Optional Avatars
      <div className="flex items-center mt-4 space-x-1">
        <img
          className="w-6 h-6 rounded-full object-cover border"
          src="https://i.pravatar.cc/100?img=1"
          alt="avatar"
        />
        <img
          className="w-6 h-6 rounded-full object-cover border"
          src="https://i.pravatar.cc/100?img=2"
          alt="avatar"
        />
        <span className="text-xs text-gray-500 ml-2">+2</span>
      </div> */}
    </div>
  );
};

export default UploadCard;
