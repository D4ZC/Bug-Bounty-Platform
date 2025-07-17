import React, { useRef, useState } from "react";

const INSIGNIAS = [
  { name: "Helper", image: "/helper.png" },
  { name: "Hacker", image: "/hacker.png" },
  { name: "Free", image: "/free_removing.png" },
  { name: "Five files", image: "/five_files.png" },
];

export default function Banners() {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState("idle"); // idle, zoomIn, zoomOut, curtains, slide, banner
  const [animating, setAnimating] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
  };

  const startAnimation = (insignia: string) => {
    if (animating) return;
    setSelected(insignia);
    setModalOpen(true);
    setAnimating(true);
    setStep("zoomIn");
    timeoutRef.current.push(
      setTimeout(() => {
        setStep("zoomOut");
        timeoutRef.current.push(
          setTimeout(() => {
            setStep("curtains");
            timeoutRef.current.push(
              setTimeout(() => {
                setStep("slide");
                timeoutRef.current.push(
                  setTimeout(() => {
                    setStep("banner");
                    setAnimating(false);
                  }, 450)
                );
              }, 600)
            );
          }, 300)
        );
      }, 400)
    );
  };

  const closeModal = () => {
    setModalOpen(false);
    setStep("idle");
    setAnimating(false);
    setSelected(null);
    clearAllTimeouts();
  };

  let cardClass =
    "flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200 relative transition-all duration-300 overflow-hidden";

  const curtainBase =
    "absolute top-0 w-1/2 h-full z-30 pointer-events-none transition-transform duration-700";
  const curtainLeft =
    curtainBase +
    " left-0 rounded-tl-2xl rounded-bl-2xl bg-gradient-to-r from-[#5b21b6] via-[#7c3aed] to-[#a78bfa] blur-sm" +
    (step === "curtains" || step === "slide" || step === "banner"
      ? " curtain-show-left"
      : " curtain-hide-left");
  const curtainRight =
    curtainBase +
    " right-0 rounded-tr-2xl rounded-br-2xl bg-gradient-to-l from-[#5b21b6] via-[#7c3aed] to-[#a78bfa] blur-sm" +
    (step === "curtains" || step === "slide" || step === "banner"
      ? " curtain-show-right"
      : " curtain-hide-right");

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {INSIGNIAS.map((insignia) => (
          <div key={insignia.name} className="relative w-[220px] h-[220px] flex items-center justify-center">
            <div
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200 cursor-pointer relative transition-all duration-300 overflow-hidden hover:shadow-xl"
              style={{ width: 220, height: 220 }}
              onClick={() => startAnimation(insignia.name)}
            >
              <img
                src={insignia.image}
                alt={`Insignia ${insignia.name}`}
                className="w-28 h-28 object-contain"
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </div>
            <div className="text-center mt-3 font-semibold text-[#7c3aed]">{insignia.name}</div>
          </div>
        ))}
      </div>

      {/* Modal con animación */}
      {modalOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative flex flex-col items-center justify-center min-w-[320px] min-h-[320px]">
            {/* Animación de la tarjeta */}
            {step !== "banner" && (
              <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                <div
                  className={cardClass}
                  style={{
                    width: 220,
                    height: 220,
                    zIndex: 2,
                  }}
                >
                  <img
                    src={INSIGNIAS.find((i) => i.name === selected)?.image}
                    alt={`Insignia ${selected}`}
                    className={
                      "w-28 h-28 object-contain transition-transform duration-300" +
                      (step === "zoomIn"
                        ? " scale-110"
                        : step === "zoomOut"
                        ? " scale-100"
                        : step === "slide"
                        ? " animate-slide-out"
                        : "")
                    }
                    draggable={false}
                    style={{ userSelect: "none" }}
                  />
                </div>
                {/* Telones */}
                <div className={curtainLeft}></div>
                <div className={curtainRight}></div>
              </div>
            )}
            {/* Banner final */}
            {step === "banner" && (
              <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in-modal relative min-w-[320px]">
                <img
                  src={INSIGNIAS.find((i) => i.name === selected)?.image}
                  alt={`Insignia ${selected}`}
                  className="w-32 h-32 object-contain mb-6 animate-insignia-pop"
                />
                <div className="text-xl font-bold text-[#7c3aed] mb-2">
                  ¡Has obtenido la insignia {selected}!
                </div>
                <button
                  className="mt-4 px-6 py-2 bg-[#7c3aed] text-white rounded hover:bg-[#5b21b6] transition-colors font-semibold"
                  onClick={closeModal}
                >
                  Confirmar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animaciones CSS */}
      <style>{`
        .scale-110 { transform: scale(1.18); }
        .scale-100 { transform: scale(1); }
        @keyframes slideOut {
          to { transform: translateX(320px) scale(0.85) rotate(8deg); opacity: 0.7; }
        }
        .animate-slide-out { animation: slideOut 0.45s cubic-bezier(.7,0,.7,1) forwards; }
        .curtain-hide-left { transform: translateX(-100%); }
        .curtain-show-left { transform: translateX(0); transition: transform 0.6s cubic-bezier(.4,0,.2,1);}
        .curtain-hide-right { transform: translateX(100%); }
        .curtain-show-right { transform: translateX(0); transition: transform 0.6s cubic-bezier(.4,0,.2,1);}
        @keyframes fade-in-modal { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-modal { animation: fade-in-modal 0.4s; }
        @keyframes insigniaPop {
          0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.15) rotate(6deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg);}
        }
        .animate-insignia-pop { animation: insigniaPop 0.7s cubic-bezier(.4,0,.2,1);}
      `}</style>
    </div>
  );
} 