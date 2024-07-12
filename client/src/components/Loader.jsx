function Loader() {
  return (
    <div className="fixed z-50 top-0 right-0 left-0 bottom-0 bg-black bg-opacity-10 backdrop-blur-lg flex-center">
      <div className="loader fixed">
        <div className="w-10 h-10 border-4 border-blue-950 rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
}

export default Loader;
