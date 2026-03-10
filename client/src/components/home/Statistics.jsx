import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PawPrint, Heart, Home, Skull } from "lucide-react";

const statData = [
  {
    title: "Dogs on Street",
    icon: <PawPrint className="w-8 h-8 text-[#735D78]" />,
    count: 1000000,
  },
  {
    title: "Dogs in Shelters",
    icon: <Home className="w-8 h-8 text-[#735D78]" />,
    count: 250000,
  },
  {
    title: "Dogs Adopted",
    icon: <Heart className="w-8 h-8 text-[#735D78]" />,
    count: 750000,
  },
  {
    title: "Dog Death Rate",
    icon: <Skull className="w-8 h-8 text-[#735D78]" />,
    count: 150000,
  },
];

const AnimatedCounter = ({ target, startCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return;

    let start = 0;
    const duration = 3000; 
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
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
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
    <div ref={ref} className="py-16 bg-gray-50">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10">
        Stats of Dogs in India
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {statData.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg p-6 rounded-2xl text-center space-y-4"
          >
            <div className="flex justify-center">{stat.icon}</div>
            <h2 className="text-lg font-semibold text-gray-700">
              {stat.title}
            </h2>
            <AnimatedCounter target={stat.count} startCount={inView} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
