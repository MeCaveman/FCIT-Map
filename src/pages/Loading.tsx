function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-teal-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-teal-700 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
      </div>
    </div>
  );
}

export default Loading;
