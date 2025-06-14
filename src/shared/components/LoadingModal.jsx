const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="rounded-md flex flex-col items-center">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="h-4 w-4 rounded-full bg-gray-400 animate-dot-flip delay-0" />
          <div className="h-4 w-4 rounded-full bg-gray-400 animate-dot-flip delay-300" />
          <div className="h-4 w-4 rounded-full bg-gray-400 animate-dot-flip delay-900" />
          <div className="h-4 w-4 rounded-full bg-gray-400 animate-dot-flip delay-600" />
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
