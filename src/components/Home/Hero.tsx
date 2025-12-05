import { useNavigate } from "react-router-dom";
import PixelBlast from "../PixelBlast";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-120px)] mx-10 border-6 border-black rounded-2xl flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0">
        <PixelBlast
          variant="circle"
          pixelSize={2}
          color="#000000"
          patternScale={10}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-6xl font-bold mb-6">
          Sync Google Sheets with PostgreSQL Effortlessly
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          DBSynchro lets you connect your Google Sheets to your database and keep everything updated—automatically.
        </p>

        <button
          onClick={() => navigate("/syncit")}
          className="px-6 py-3 font-bold bg-white border-2 border-black text-black rounded-lg hover:bg-black hover:text-white cursor-pointer transition-all"
        >
          Get Started
        </button>
      </div>

    </section>
  );
}
