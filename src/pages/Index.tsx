import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/motion/Reveal';
import { SignatureInteraction } from '../components/effects/SignatureInteraction';
import { LuInstagram, LuMusic } from 'react-icons/lu';

const Index = () => {
  const [time, setTime] = useState('00:00:00');
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Clock Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Europe/Paris', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    
    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  // Hero Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth;
    const y = clientY / innerHeight;
    setMousePos({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-[#E0E0E0] font-tech overflow-x-hidden">
      {/* Global Styles & Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        
        :root {
          --bg-root: #0F0F10;
          --bg-surface: #1A1A1C;
          --text-primary: #E0E0E0;
          --text-secondary: #888890;
          --accent: #D2691E;
          --line: #333336;
          --font-display: 'Playfair Display', serif;
          --font-tech: 'IBM Plex Mono', monospace;
        }

        .font-display { font-family: var(--font-display); }
        .font-tech { font-family: var(--font-tech); }
        
        @keyframes pulse {
            0% { opacity: 1; box-shadow: 0 0 0 0 rgba(210, 105, 30, 0.4); }
            70% { opacity: 0.6; box-shadow: 0 0 0 10px rgba(210, 105, 30, 0); }
            100% { opacity: 1; box-shadow: 0 0 0 0 rgba(210, 105, 30, 0); }
        }
        
        .live-indicator {
            animation: pulse 2s infinite;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        
        {/* LEFT RAIL */}
        <aside className="bg-[#0F0F10] border-r border-[#333336] p-8 h-auto lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between z-50 relative">
          <div className="rail-top">
            <div className="font-display text-[2rem] tracking-[-0.02em] italic text-[#E0E0E0] mb-8">
              MÉCANIQUE
              <span className="text-[#D2691E] font-tech text-[0.8rem] not-italic block mt-2 tracking-[0.1em] uppercase">
                Paris / 11e
              </span>
            </div>
            
            <nav>
              <ul className="flex flex-col gap-4 list-none">
                {['01. Extraction', '02. Origin', '03. Laboratory'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[#E0E0E0] no-underline text-[0.9rem] hover:text-[#D2691E] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-4 text-[0.75rem] text-[#888890] border-t border-[#333336] pt-8 mt-8 lg:mt-0">
            <div className="flex justify-between">
              <span>STATUS</span>
              <span className="flex items-center gap-2">
                OPERATIONAL 
                <span className="w-2 h-2 bg-[#D2691E] rounded-full inline-block live-indicator"></span>
              </span>
            </div>
            <div className="flex justify-between">
              <span>LOC</span>
              <span>48.8566° N, 2.3522° E</span>
            </div>
            <div className="flex justify-between">
              <span>TIME</span>
              <span>{time}</span>
            </div>
          </div>
        </aside>

        {/* MAIN SCROLL */}
        <main className="bg-[#1A1A1C] relative">
          
          {/* HERO SECTION */}
          <section 
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="min-h-[90vh] flex flex-col justify-end relative p-6 md:p-16 lg:p-24 border-b border-[#333336] overflow-hidden group"
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
              alt="Espresso dark macro"
              className="absolute top-0 right-0 w-full h-[70%] object-cover opacity-40 mix-blend-overlay transition-all duration-1000 ease-out"
              style={{
                filter: 'grayscale(100%) contrast(120%)',
                transform: `translate(-${mousePos.x * 20}px, -${mousePos.y * 20}px) scale(1.1)`
              }}
            />
            
            <Reveal>
              <div className="font-tech text-[0.85rem] text-[#888890] border-l border-[#D2691E] pl-4 mb-16 max-w-[400px]">
                BATCH NO. 4092 // ROAST: DARK // ZINC ROOF SERIES
              </div>
              <h1 className="font-display text-[3.5rem] md:text-[6rem] leading-[0.95] font-normal mb-8 z-10 relative max-w-[800px]">
                The Science<br/>
                of <em className="text-[#D2691E] italic">Awakening</em>.
              </h1>
              <p className="max-w-[500px] leading-[1.6] mb-8 text-[#aaa] z-10 relative">
                We do not simply brew. We isolate specific compounds to produce a cup that tastes of wet pavement, oxidized copper, and dark chocolate.
              </p>
            </Reveal>
          </section>

          {/* MARQUEE */}
          <div className="border-y border-[#333336] bg-[#0F0F10] py-4">
            <SignatureInteraction 
              type="marquee" 
              speed={20}
              className="font-tech uppercase text-[0.8rem] tracking-[0.2em] text-[#D2691E]"
            >
              FILTER / ESPRESSO / COLD EXTRACTION / NITROGEN / SIPHON / V60 / AERO / FILTER / ESPRESSO / COLD EXTRACTION / NITROGEN / SIPHON / V60 / AERO /&nbsp;
            </SignatureInteraction>
          </div>

          {/* PHILOSOPHY SECTION */}
          <section id="philosophy" className="p-6 md:p-16 lg:p-24 border-b border-[#333336]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <Reveal>
                <h2 className="font-display text-[2rem] leading-[1.3]">
                  Architecture <br/>
                  of the Bean.
                </h2>
                <div className="w-[60px] h-[2px] bg-[#D2691E] my-8"></div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-[0.9rem] leading-[1.6] text-[#888890] text-justify mb-8">
                  Located in a former zinc foundry in the 11th arrondissement, MÉCANIQUE treats coffee production with the rigour of a pharmaceutical laboratory.
                  <br/><br/>
                  Our machines are calibrated daily to account for atmospheric pressure and humidity. We reject the cozy. We embrace the raw, the sharp, and the precise.
                </p>
                <a 
                  href="#" 
                  className="inline-block border border-[#E0E0E0] px-8 py-4 text-[#E0E0E0] no-underline uppercase text-[0.8rem] tracking-[0.1em] transition-all duration-300 hover:bg-[#D2691E] hover:border-[#D2691E] hover:text-white"
                >
                  View The Lab
                </a>
              </Reveal>
            </div>
          </section>

          {/* MENU SECTION */}
          <section id="menu" className="p-6 md:p-16 lg:p-24 border-b border-[#333336] pt-8">
            <Reveal>
              <div className="mb-16 flex justify-between items-end">
                <h3 className="font-tech font-normal text-[0.9rem] tracking-[0.1em] text-[#D2691E]">
                  CURRENT CALIBRATIONS
                </h3>
                <span className="font-tech text-[0.8rem] text-[#888890]">
                  [VOL. 04]
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 border-t border-[#333336]">
                {[
                  { code: 'E-01', name: 'Espresso Noire', price: '€3.50' },
                  { code: 'E-02', name: 'Cortado Zinc', price: '€4.50' },
                  { code: 'F-01', name: 'V60: Ethiopia (Washed)', price: '€6.00' },
                  { code: 'C-01', name: 'Cold Drip / 12 Hours', price: '€5.50' },
                  { code: 'T-01', name: 'Cascara Tea', price: '€4.00' },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-baseline py-6 border-b border-[#333336] cursor-pointer transition-all duration-300 hover:bg-[rgba(210,105,30,0.05)] hover:pl-4 group"
                  >
                    <span className="text-[0.8rem] text-[#D2691E] mr-4 opacity-70 font-tech">{item.code}</span>
                    <span className="font-display text-[1.5rem] flex-grow">{item.name}</span>
                    <span className="font-tech transition-colors duration-300 group-hover:text-[#D2691E]">{item.price}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* GALLERY SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div className="relative h-[600px] border-r border-[#333336] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=1974&auto=format&fit=crop" 
                alt="Moody coffee texture"
                className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] filter grayscale group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <div className="p-16 flex flex-col justify-center bg-[#1A1A1C]">
              <h4 className="font-display text-[1.5rem] mb-4">The Foundry</h4>
              <p className="text-[0.9rem] leading-[1.6] text-[#888890] text-justify">
                Stripped back to original concrete and steel beams. A space for focus, not conversation.
              </p>
              <div className="mt-8 font-tech text-[#D2691E] text-[0.8rem]">
                CAPACITY: 24 SEATS
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="p-16 text-[0.8rem] text-[#888890] flex justify-between items-center border-t border-[#333336]">
            <div>
               2026 MÉCANIQUE SARL
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 hover:text-[#D2691E] cursor-pointer transition-colors">
                <LuInstagram className="inline" /> INSTAGRAM
              </span>
              <span>/</span>
              <span className="flex items-center gap-1 hover:text-[#D2691E] cursor-pointer transition-colors">
                <LuMusic className="inline" /> RESIDENT ADVISOR
              </span>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
};

export default Index;
