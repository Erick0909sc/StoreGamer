import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
      <style>
        {`
        .draw-in-animation {
          stroke-dasharray: 1000;
          animation: drawInAnimation 2.5s 1s ease-in both;
        }
        
        @keyframes drawInAnimation {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}
      </style>
      <div className="relative w-full h-screen overflow-hidden">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src="/games.mp4" type="video/mp4" />
        </video>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 550 200"
          className="absolute top-0 left-0 w-full h-full z-10"
        >
          <g>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              alignmentBaseline="middle"
              className={`text-white stroke-current stroke-2 ${
                animate ? "draw-in-animation" : ""
              }`}
              style={{ fontSize: "48px", fontWeight: "bold", fill: "none" }}
            >
              Game of Thrones
            </text>
          </g>
        </svg>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <Link href="/home">
            <a
              href="#_"
              class="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
              <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
              </span>
              <span class="relative text-white">Button Text</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
