import React, { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";

const FloatingPaws = () => {
  const [pawIcons, setPawIcons] = useState([]);

  useEffect(() => {
    const generatePawIcons = () => {
      const icons = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        size: `${Math.random() * 30 + 15}px`,
      }));
      setPawIcons(icons);
    };

    generatePawIcons();
    const interval = setInterval(generatePawIcons, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {pawIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute animate-float"
          style={{
            left: icon.left,
            bottom: "-50px",
            animationDuration: icon.animationDuration,
          }}
        >
          <PawPrint
            color="white"
            size={parseFloat(icon.size)}
            strokeWidth={1.5}
          />
        </div>
      ))}
    </>
  );
};

export default FloatingPaws;
