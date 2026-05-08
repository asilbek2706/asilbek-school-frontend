const SearchInput = () => {
  return (
    <div className="container mx-auto px-4 bg-transparent">
      <div className="relative max-w-2xl mx-auto mt-10">
        <div className="flex items-center backdrop-blur-md border border-gray-700 rounded-4xl overflow-hidden shadow-2xl transition-all duration-300 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/50">
          
          <div className="pl-5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Kurslarni qidirish..."
            className="w-full bg-transparent border-none px-4 py-4 text-white placeholder-gray-400 focus:ring-0 outline-none text-lg"
          />

          {/* Tugma */}
          <div className="pr-2">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-red-500/30 whitespace-nowrap">
              Qidirish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export { SearchInput };