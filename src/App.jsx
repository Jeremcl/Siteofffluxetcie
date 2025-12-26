import React, { useState, useEffect, useRef } from 'react';

import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';

import {

  Cpu,

  Layers,

  Zap,

  ArrowRight,

  MousePointer2,

  Sparkles,

  ArrowUpRight,

  Globe,

  Activity,

  Code,

  Flame,

  ChevronUp

} from 'lucide-react';



// --- Utilitaires ---



const MagneticWrapper = ({ children, strength = 0.2 }) => {

  const x = useMotionValue(0);

  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });

  const springY = useSpring(y, { stiffness: 150, damping: 15 });



  const handleMouseMove = (e) => {

    const rect = e.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);

    y.set((e.clientY - centerY) * strength);

  };



  const handleMouseLeave = () => {

    x.set(0);

    y.set(0);

  };



  return (

    <motion.div 

      onMouseMove={handleMouseMove} 

      onMouseLeave={handleMouseLeave}

      style={{ x: springX, y: springY }}

    >

      {children}

    </motion.div>

  );

};



// --- Composants ---



const AnimatedBackground = () => (

  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-bg-main">

    <motion.div

      animate={{

        scale: [1, 1.2, 1],

        rotate: [0, 10, 0],

        opacity: [0.15, 0.25, 0.15]

      }}

      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}

      className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] rounded-full bg-gradient-to-br from-pastel-primary/20 via-pastel-lavender/15 to-transparent blur-[120px]"

    />

    <motion.div

      animate={{

        scale: [1.2, 1, 1.2],

        rotate: [0, -10, 0],

        opacity: [0.1, 0.2, 0.1]

      }}

      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}

      className="absolute bottom-[-10%] right-[-10%] w-[100vw] h-[100vw] rounded-full bg-gradient-to-tl from-pastel-coral/15 via-pastel-accent/10 to-transparent blur-[140px]"

    />

  </div>

);



const RevealTitle = ({ children, subtitle, light = false }) => {

  const ref = useRef(null);

  const isInView = useInView(ref, { once: false, amount: 0.5 });



  return (

    <div ref={ref} className="mb-12 overflow-hidden">

      {subtitle && (

        <motion.span

          initial={{ y: 20, opacity: 0 }}

          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}

          transition={{ duration: 0.8 }}

          className="text-pastel-primary-dark font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block"

        >

          {subtitle}

        </motion.span>

      )}

      <div className="overflow-hidden">

        <motion.h2

          initial={{ y: "100%" }}

          animate={isInView ? { y: 0 } : { y: "100%" }}

          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}

          className={`text-4xl md:text-7xl font-bold tracking-tight leading-tight ${light ? 'text-text-primary' : 'text-text-primary'}`}

        >

          {children}

        </motion.h2>

      </div>

    </div>

  );

};



const ExpertiseCard = ({ icon: Icon, title, description, colorClass }) => {

  const ref = useRef(null);

  const isInView = useInView(ref, { once: false, amount: 0.2 });



  return (

    <MagneticWrapper strength={0.1}>

      <motion.div

        ref={ref}

        initial={{ opacity: 0, y: 30 }}

        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}

        className="group relative p-1 px-1 rounded-[2.5rem] bg-gradient-to-br from-pastel-primary/20 to-transparent border border-pastel-primary/30 hover:border-pastel-primary-dark/50 transition-all duration-500 overflow-hidden"

      >

        <div className="p-8 rounded-[2.4rem] bg-white/90 backdrop-blur-2xl shadow-lg h-full flex flex-col">

           <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 shadow-xl relative overflow-hidden group-hover:scale-110 transition-transform`}>

              <div className="absolute inset-0 bg-white/30 animate-pulse" />

              <Icon className="text-white w-7 h-7 relative z-10" />

           </div>

           <h3 className="text-xl md:text-2xl font-bold mb-4 text-text-primary group-hover:text-pastel-primary-dark transition-colors">{title}</h3>

           <p className="text-text-secondary leading-relaxed font-light mb-6 text-sm md:text-base flex-grow">{description}</p>

           <div className="flex items-center gap-2 text-text-muted text-[10px] font-bold uppercase tracking-widest group-hover:text-pastel-primary-dark transition-colors mt-auto">

              En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />

           </div>

        </div>

      </motion.div>

    </MagneticWrapper>

  );

};



// --- Application Principale ---



export default function App() {

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [showScrollTop, setShowScrollTop] = useState(false);



  useEffect(() => {

    const handleScroll = () => {

      setShowScrollTop(window.scrollY > 500);

    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);



  const scrollToTop = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

  };



  // Resserage des zones de transition pour éviter le blanc

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);

  const introOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);

  const mainOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  

  // Effet de parallaxe sur les fonds de texte

  const textBgX = useTransform(scrollYProgress, [0, 1], [0, -200]);



  return (

    <div className="bg-bg-main text-text-primary font-sans selection:bg-pastel-accent selection:text-text-primary min-h-screen scroll-smooth">

      <AnimatedBackground />



      {/* Barre de progression pastel */}

      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-pastel-primary/10">

        <motion.div className="h-full bg-gradient-to-r from-pastel-primary via-pastel-accent to-pastel-secondary origin-left" style={{ scaleX }} />

      </div>



      {/* Navigation stylisée */}

      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-white/80 backdrop-blur-md border-b border-pastel-primary/20">

        <a href="#" className="text-xl font-black tracking-tighter flex items-center gap-3 cursor-pointer group">

          <motion.div

            animate={{ rotate: 360 }}

            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}

            className="w-8 h-8 bg-gradient-to-tr from-pastel-primary to-pastel-accent rounded-lg flex items-center justify-center shadow-lg shadow-pastel-primary/30 group-hover:shadow-xl group-hover:shadow-pastel-primary/50 transition-shadow"

          >

            <div className="w-3 h-3 bg-white rounded-full" />

          </motion.div>

          <span className="bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">FLUX & CIE</span>

        </a>

        <div className="flex items-center gap-8">

          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-text-muted">

            <a href="#solutions" className="hover:text-pastel-primary-dark transition-colors cursor-pointer">Solutions</a>

            <a href="#contact" className="hover:text-pastel-primary-dark transition-colors cursor-pointer">Contact</a>

          </div>

          <a href="#contact" className="px-6 py-2.5 bg-pastel-primary text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-pastel-primary-dark transition-all shadow-lg shadow-pastel-primary/30 cursor-pointer">Discutons</a>

        </div>

      </nav>



      {/* --- HERO SECTION REVISITÉE --- */}

      <section id="hero" className="relative h-[250vh] w-full">

        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">

          

          {/* Texte de fond géant pour remplir le vide */}

          <motion.div

            style={{ x: textBgX }}

            className="absolute whitespace-nowrap text-[20vw] font-black text-pastel-primary/[0.06] pointer-events-none select-none top-1/2 -translate-y-1/2"

          >

            FLUX & CIE AUTOMATISATION INTELLIGENTE

          </motion.div>



          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 max-w-5xl">

            <motion.div

              initial={{ y: 20, opacity: 0 }}

              animate={{ y: 0, opacity: 1 }}

              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-primary/10 border border-pastel-primary/30 text-pastel-primary-dark text-[10px] font-bold uppercase tracking-[0.2em] mb-12"

            >

              <Activity size={12} className="animate-pulse" /> Automatisation Intelligente & Outils Métier Sur Mesure

            </motion.div>

            <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.85] mb-10 text-text-primary">

              L'AUTOMATISATION <br/>

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-primary via-pastel-accent to-pastel-secondary">COMME UNE<br className="md:hidden"/> SIGNATURE.</span>

            </h1>

          </motion.div>



          {/* Séquence d'intro plus compacte */}

          <motion.div style={{ opacity: introOpacity }} className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">

            <div className="max-w-4xl">

               <h2 className="text-3xl md:text-6xl font-bold leading-tight text-text-primary drop-shadow-lg max-w-5xl mx-auto">

                Workflows intelligents et outils de gestion sur mesure pour e-commerçants, reconditionneurs et destockeurs qui veulent <span className="text-pastel-accent-dark italic serif font-light">scaler sans recruter.</span>

               </h2>

               <p className="mt-10 text-xl md:text-3xl font-light text-text-secondary">

                100% personnalisé. <span className="text-pastel-primary-dark font-medium">0% template.</span>

               </p>

               <div className="mt-12 flex justify-center gap-2">

                 {[1,2,3].map(i => (

                   <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, delay: i*0.2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-pastel-primary" />

                 ))}

               </div>

            </div>

          </motion.div>

        </div>

      </section>



      {/* --- ZONE DE CONTENU VIBRANTE --- */}

      <motion.div style={{ opacity: mainOpacity }} className="relative z-10 bg-bg-alt rounded-t-[5rem] shadow-[0_-40px_100px_rgba(165,180,252,0.15)]">

        

        {/* Section Showcase */}

        <section id="approche" className="py-24 md:py-32 px-6 max-w-7xl mx-auto scroll-mt-24">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="relative group">

              <motion.div

                whileInView={{ rotate: [-2, 0], scale: [0.95, 1] }}

                className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-pastel-primary/20"

              >

                <img

                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"

                  alt="Abstract liquid art"

                  className="w-full h-[650px] object-cover hover:scale-105 transition-transform duration-1000"

                />

                <div className="absolute inset-0 bg-gradient-to-t from-bg-alt via-transparent to-transparent" />

                <div className="absolute bottom-10 left-10 right-10 p-6 md:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-pastel-primary/30 shadow-2xl">

                   <p className="text-pastel-primary-dark font-bold uppercase text-[10px] tracking-widest mb-3">Témoignage Client</p>

                   <p className="text-base md:text-lg font-bold text-text-primary leading-relaxed mb-3">"Avant, je perdais 1h par jour à solliciter des avis clients. Maintenant, tout est automatisé : mes clients reçoivent un message personnalisé après chaque visite. J'ai doublé mes avis Google en 2 mois."</p>
                   <p className="text-xs md:text-sm text-text-secondary italic">— Client Flux & Cie, Secteur Services</p>

                </div>

              </motion.div>

              {/* Glow background */}

              <div className="absolute -inset-10 bg-pastel-primary/15 blur-[100px] rounded-full -z-10 group-hover:bg-pastel-primary/25 transition-all" />

            </div>

            

            <div className="space-y-12">

              <RevealTitle subtitle="Notre approche">Parce que votre business est unique.<br/>Vos outils devraient l'être aussi.</RevealTitle>

              <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed">

                Pas de template WordPress. Pas de Zapier générique.<br/>
                Pas de solution "clé en main" qui ne tourne jamais vraiment.

              </p>

              <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed mt-6">

                Chaque <span className="text-text-primary font-medium underline decoration-pastel-primary/50">automatisation</span>, chaque <span className="text-text-primary font-medium underline decoration-pastel-primary/50">application</span> est pensée comme une signature : elle reflète <span className="text-text-primary font-semibold">VOTRE</span> façon de travailler, pas celle imposée par un logiciel standard.

              </p>



              <div className="grid gap-6">

                {[

                  { icon: Zap, t: "Automatisation Intelligente", c: "text-pastel-coral", d: "Workflows qui tournent 24/7 : génération de contenus IA, synchronisation multi-plateformes, notifications automatiques." },

                  { icon: Layers, t: "Outils de Gestion Sur Mesure", c: "text-pastel-primary-dark", d: "Applications métier développées spécifiquement pour vos besoins : tableaux de bord, interfaces de gestion, validation workflow." },

                  { icon: Code, t: "Intégration Écosystème", c: "text-pastel-accent-dark", d: "Connexion fluide avec vos outils existants (Shopify, CRM, ERP, APIs) pour un écosystème unifié sans friction." }

                ].map((item, i) => (

                  <motion.div

                    key={i}

                    whileInView={{ x: [-20, 0], opacity: [0, 1] }}

                    className="flex gap-6 p-6 rounded-2xl bg-white/80 border border-pastel-primary/20 hover:bg-white transition-colors shadow-sm"

                  >

                    <item.icon className={item.c} size={24} />

                    <div>

                      <h4 className="font-bold text-text-primary mb-1">{item.t}</h4>

                      <p className="text-text-secondary text-sm font-light">{item.d}</p>

                    </div>

                  </motion.div>

                ))}

              </div>

            </div>

          </div>

        </section>




        {/* Grille de Services Vibrant */}

        <section id="solutions" className="py-24 md:py-32 px-6 scroll-mt-24">

          <div className="max-w-7xl mx-auto">

             <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">

                <RevealTitle subtitle="Nos Expertises">Deux piliers complémentaires<br/>pour transformer vos process.</RevealTitle>

             </div>

             <div className="grid md:grid-cols-3 gap-8 items-stretch">

               <ExpertiseCard

                 icon={Cpu}

                 title="Automatisation Intelligente"

                 description="Workflows qui tournent 24/7 pendant que vous vous concentrez sur votre cœur de métier. · Génération automatique de contenus (IA) · Synchronisation multi-plateformes · Notifications intelligentes (Telegram, email) · Intégrations API (Shopify, eBay, Google) · Traitement de données en masse. Idéal pour : e-commerce, reconditionnement, gestion de stock."

                 colorClass="bg-gradient-to-br from-pastel-accent to-pastel-coral"

               />

               <ExpertiseCard

                 icon={Zap}

                 title="Outils de Gestion Sur Mesure"

                 description="Applications métier développées spécifiquement pour vos besoins opérationnels. · Interfaces de gestion produits personnalisées · Tableaux de bord métier temps réel · Systèmes de validation workflow · Outils de suivi et reporting · Applications web responsive. Idéal pour : pilotage d'activité, process complexes, équipes terrain."

                 colorClass="bg-gradient-to-br from-pastel-primary to-pastel-lavender"

               />

               <ExpertiseCard

                 icon={Globe}

                 title="Cas d'Usage : Mise en Ligne Automatisée"

                 description="Pour reconditionneurs & destockeurs qui veulent scaler. Le problème : Vous recevez 100-200 produits/semaine. Les mettre en ligne manuellement prend 15h. La solution : Upload CSV/photos ➝ traitement automatique · Génération titre/description optimisés SEO (IA) · Publication multi-plateformes (eBay, LBC, Shopify) · Interface validation pour cas complexes uniquement. Résultat : De 50 produits/mois à 500 sans recruter."

                 colorClass="bg-gradient-to-br from-pastel-secondary to-pastel-sky"

               />

             </div>

          </div>

        </section>



        {/* Footer & CTA Massif */}

        <section id="contact" className="pt-24 md:pt-32 pb-10 px-6 overflow-hidden relative scroll-mt-24">

          <div className="max-w-5xl mx-auto text-center relative z-10">

            <motion.h2

              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}

              className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none mb-16 text-text-primary"

            >

              DISCUTONS DE <br/>

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-primary to-pastel-accent">VOS PROCESS.</span>

            </motion.h2>

            <div className="max-w-3xl mx-auto mb-16 space-y-6">
              <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed">
                Vous avez une tâche répétitive qui vous bouffe du temps ?<br/>
                Vous jonglez entre 5 outils qui ne se parlent pas ?<br/>
                Vous voulez passer de 50 à 500 produits sans recruter ?
              </p>
              <p className="text-base md:text-lg text-text-primary font-medium border-l-4 border-pastel-primary pl-6">
                On prend 30 minutes ensemble pour voir ce qui est possible.<br/>
                Pas de blabla commercial. Juste un diagnostic concret.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center mb-32">

              <a href="mailto:hello@flux-cie.com" className="group relative px-10 md:px-12 py-5 md:py-6 bg-pastel-primary text-white rounded-full font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:pr-14 md:hover:pr-16 shadow-lg shadow-pastel-primary/30 hover:shadow-xl hover:shadow-pastel-primary/50">

                 <span className="relative z-10">Réserver un appel découverte</span>

                 <div className="absolute top-0 right-0 h-full w-0 group-hover:w-full bg-pastel-primary-dark transition-all duration-500" />

                 <ArrowRight className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white" />

              </a>

              <div className="h-px w-20 bg-pastel-primary/20 md:block hidden" />

              <a href="#solutions" className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted hover:text-pastel-primary-dark transition-colors">

                 Voir nos solutions

              </a>

            </div>



            <div className="grid md:grid-cols-3 gap-12 pt-20 border-t border-pastel-primary/20 text-left">

              <div className="space-y-4">

                <div className="text-[10px] font-bold text-pastel-primary-dark uppercase mb-6 tracking-widest underline decoration-2">Contact</div>

                <a href="mailto:hello@flux-cie.com" className="block text-lg md:text-xl text-text-primary font-light underline underline-offset-8 decoration-pastel-primary/20 hover:decoration-pastel-primary transition-all">hello@flux-cie.com</a>
                <a href="https://t.me/fluxetcie" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary font-light hover:text-pastel-primary-dark transition-colors">📱 Telegram : @fluxetcie</a>

              </div>

              <div className="space-y-4">

                <div className="text-[10px] font-bold text-pastel-primary-dark uppercase mb-6 tracking-widest">Localisation</div>

                <p className="text-sm text-text-secondary font-light leading-relaxed">📍 Basé à Guingamp, Bretagne<br/>🇫🇷 Clients partout en France (et au-delà)</p>

              </div>

              <div className="flex gap-6 justify-end items-end">

                {['TW', 'IG', 'LI'].map(s => (

                  <motion.a whileHover={{ y: -5 }} key={s} href="#" className="w-10 h-10 rounded-full border border-pastel-primary/30 flex items-center justify-center text-[10px] font-bold hover:bg-pastel-primary hover:text-white transition-all">

                    {s}

                  </motion.a>

                ))}

              </div>

            </div>



            <div className="mt-20 text-[9px] font-bold tracking-[0.5em] text-text-light uppercase">

              Flux & Cie — L'automatisation comme une signature © 2025 — Fait avec ❤️ en Bretagne

            </div>

          </div>

        </section>

      </motion.div>



      {/* Bouton Scroll to Top */}

      <motion.button

        initial={{ opacity: 0, scale: 0 }}

        animate={{

          opacity: showScrollTop ? 1 : 0,

          scale: showScrollTop ? 1 : 0

        }}

        onClick={scrollToTop}

        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-pastel-primary to-pastel-accent text-white rounded-full shadow-2xl shadow-pastel-primary/40 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group"

      >

        <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />

      </motion.button>

    </div>

  );

}

