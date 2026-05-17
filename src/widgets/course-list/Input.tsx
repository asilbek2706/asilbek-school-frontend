import * as React from "react";
import { courses } from "@/shared/mocks/course/course.mock";
import CourseCard from "./CourseCard";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);

  const filteredCourses = React.useMemo(() => {
    if (!searchTerm.trim()) return [];
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 bg-transparent relative">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowResults(true)}
            className="w-full bg-transparent border-none px-4 py-4 text-white placeholder-gray-400 focus:ring-0 outline-none text-lg"
          />

          <div className="pr-2">
            <button
              onClick={handleSearch}
              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-red-500/30 whitespace-nowrap"
            >
              Qidirish
            </button>
          </div>
        </div>

        {showResults && searchTerm.trim() && (
          <div
            className="
              absolute top-full left-0 right-0
              mt-4
              max-h-[600px]
              overflow-y-auto
              rounded-[2rem]
              border border-white/10
              bg-white/[0.05]
              backdrop-blur-3xl
              shadow-[0_20px_80px_rgba(0,0,0,0.45)]
              p-6
              z-50
            "
          >
            {filteredCourses.length > 0 ? (
              <div className="space-y-6">
                <div className="text-gray-300 text-sm font-medium">
                  {filteredCourses.length} ta kurs topildi
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {filteredCourses.map((course) => (
                    <div key={course.id} onClick={() => setShowResults(false)}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">
                  Kurs topilmadi
                </div>
                <div className="text-gray-500 text-sm">
                  \"{searchTerm}\" asosida hech qanday kurs topilmadi
                </div>
              </div>
            )}
          </div>
        )}

        {showResults && searchTerm.trim() === "" && (
          <div className="absolute inset-0 top-full mt-4 rounded-[2rem] backdrop-blur-sm" onClick={() => setShowResults(false)} />
        )}
      </div>
    </div>
  );
};

export { SearchInput };