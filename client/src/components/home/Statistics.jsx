import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PawPrint, Heart, Home, Skull } from "lucide-react";

const statData = [
  {
    title: "Dogs on Streets",
    icon: <PawPrint className="w-8 h-8 text-[#5F5BD7]" />,
    count: 1000000,
  },
  {
    title: "Dogs in Shelters",
    icon: <Home className="w-8 h-8 text-[#5F5BD7]" />,
    count: 250000,
  },
  {
    title: "Dogs Adopted",
    icon: <Heart className="w-8 h-8 text-[#5F5BD7]" />,
    count: 750000,
  },
  {
    title: "Need Our Help",
    icon: <Skull className="w-8 h-8 text-[#5F5BD7]" />,
    count: 150000,
  },
];

const AnimatedCounter = ({ target, startCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return;

    let start = 0;
    const duration = 2000; 
    const increment = target / (duration / 60);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(counter);
        setCount(target);
      } else {
        setCount(Math.floor(start));
      }
    }, 60);

    return () => clearInterval(counter);
  }, [target, startCount]);

  return (
    <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
      {count.toLocaleString()}
    </h1>
  );
};

const Statistics = () => {
  const { ref, inView } = useInView({
    threshold: 0.3, 
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative z-10 py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Dog Statistics <span className="text-[#5F5BD7]">in India</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 font-medium">
             Together we can change these numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statData.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 p-8 rounded-[2rem] text-center space-y-4 hover:border-[#5F5BD7]/20 transition-all duration-300"
            >
              <div className="flex justify-center mb-2">
                <div className="p-4 bg-[#5F5BD7]/5 rounded-2xl">
                    {stat.icon}
                </div>
              </div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">
                {stat.title}
              </h3>
              <AnimatedCounter target={stat.count} startCount={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
