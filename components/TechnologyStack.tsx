const technologies = [
  { name: "HTML5", icon: "bi-filetype-html", color: "text-orange-500" },
  { name: "CSS3", icon: "bi-css", color: "text-blue-500" },
  { name: "JavaScript", icon: "bi-filetype-js", color: "text-yellow-400" },
  { name: "React", icon: "bi-filetype-jsx", color: "text-cyan-400" },
  { name: "Next.js", icon: "bi-bootstrap-reboot", color: "text-white" },
  { name: "Tailwind", icon: "bi-palette2", color: "text-teal-400" },
  { name: "Bootstrap", icon: "bi-bootstrap-fill", color: "text-purple-500" },
  { name: "TypeScript", icon: "bi-code-slash", color: "text-blue-600" },
  { name: "Git", icon: "bi-git", color: "text-red-500" },
];

const TechnologyStack = () => {
  const doubleTechs = [...technologies, ...technologies];

  return (
    <div className="relative w-full flex items-center justify-between bg-gradient  py-8 from-gray-900/60 via-gray-800/40 borderborder border-white/5 to-red-950/20 border  overflow-hidden rounded-[2.5rem] mt-8">

      <div className="relative flex overflow-x-hidden border-transparent py-4">
        <div className="animate-marquee flex items-center">
          {doubleTechs.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mx-8 group opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <i className={`bi ${tech.icon} text-2xl ${tech.color}`}></i>
              <span className="text-gray-400 text-xl font-medium tracking-tight group-hover:text-white">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default TechnologyStack;