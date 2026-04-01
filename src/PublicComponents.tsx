import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Phone, MessageSquare, Instagram, Music2, Send, Mail, X, CheckCircle2, AlertCircle, Calendar, ShieldCheck, LayoutDashboard, CreditCard, Zap, Globe, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { CLASSES, INSTRUCTORS } from './constants';

export const FeatureGrid = () => {
  const features = [
    {
      title: "Automated Scheduling",
      description: "Proprietary dynamic grid with real-time conflict detection and resource optimization.",
      icon: Zap,
      tag: "CORE ENGINE",
      status: "OPTIMAL"
    },
    {
      title: "Multi-tenant Cloud",
      description: "Architected for scale. Manage multiple studio branches from a single executive CEO dashboard.",
      icon: Layers,
      tag: "INFRASTRUCTURE",
      status: "SCALABLE"
    },
    {
      title: "Global Payments",
      description: "Integrated checkout and automated financial reconciliation managed by S-sync Finance.",
      icon: CreditCard,
      tag: "FINTECH",
      status: "SECURE"
    }
  ];

  return (
    <section id="features" className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-maroon italic tracking-tighter uppercase leading-[0.85]">
            Enterprise-Grade <br /> <span className="text-gold">Cloud Infrastructure.</span>
          </h2>
          <p className="text-maroon/40 font-mono text-[10px] mt-8 uppercase tracking-[0.4em]">
            The technical backbone for the world's leading dance studios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-10 rounded-[3rem] bg-cream/20 border border-maroon/5 hover:bg-maroon hover:text-cream transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <feature.icon size={120} />
              </div>
              
              <div className="w-16 h-16 bg-maroon text-cream rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-maroon transition-colors shadow-lg">
                <feature.icon size={32} />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-gold">
                  {feature.tag}
                </span>
                <div className="h-px flex-1 bg-maroon/10 group-hover:bg-cream/20" />
              </div>

              <h3 className="text-3xl font-black italic tracking-tight mb-4 uppercase leading-none">
                {feature.title}
              </h3>
              <p className="text-sm font-medium opacity-60 leading-relaxed max-w-[90%]">
                {feature.description}
              </p>
              
              <div className="mt-10 pt-8 border-t border-maroon/10 group-hover:border-cream/10 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono uppercase tracking-widest opacity-40">System Status</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-500 group-hover:text-green-400">{feature.status}</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TeamSection = () => {
  const team = [
    {
      name: "Du",
      role: "Founder & CEO",
      bio: "10+ years deep-dive in Street Dance industry. Veteran dancer turned tech innovator. Bridging the gap between artistic expression and cloud efficiency.",
      specialty: "Market Vision & Product Strategy"
    },
    {
      name: "Phat",
      role: "CTO (Chief Technology Officer)",
      bio: "Ph.D. in Computer Science. Architect of S-sync's proprietary scheduling engine and multi-tenant cloud infrastructure. Expert in Scalable Systems.",
      specialty: "Cloud Computing & Algorithmic Optimization"
    },
    {
      name: "Princess",
      role: "CFO (Chief Financial Officer)",
      bio: "Expert in SaaS financial modeling and cross-border payment scaling. Managing the fiscal health and investment strategy for S-sync’s global expansion.",
      specialty: "Revenue Architecture & Financial Growth"
    }
  ];

  return (
    <div className="bg-cream/50 py-24 px-8 rounded-[60px] mt-20 border border-maroon/5 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-maroon text-5xl font-black italic tracking-tighter leading-none">THE CORE ARCHITECTS</h2>
            <p className="text-maroon/40 font-bold uppercase tracking-widest text-xs mt-4">Executive Leadership Team</p>
          </div>
          <div className="h-px flex-1 bg-maroon/10 mx-12 hidden md:block mb-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <motion.div 
              key={member.name} 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[40px] border border-maroon/5 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-maroon opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-1 bg-maroon mb-8 group-hover:w-full transition-all duration-500 rounded-full"></div>
              <h3 className="text-3xl font-black italic text-maroon">{member.name}</h3>
              <p className="text-gold font-black text-[10px] uppercase tracking-[0.2em] mt-2">{member.role}</p>
              <p className="text-maroon/60 text-sm mt-6 leading-relaxed font-medium">{member.bio}</p>
              <div className="mt-8 pt-8 border-t border-maroon/5 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-maroon/30 uppercase tracking-widest">Focus Area</span>
                <p className="text-xs font-black italic text-maroon">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AboutUs = () => {
  return (
    <section id="about" className="py-24 px-8 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1 bg-maroon/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-maroon mb-6">
              Our Mission
            </div>
            <h2 className="text-6xl font-black italic tracking-tighter text-maroon leading-[0.9] mb-8">
              Architecting the Future of <span className="text-gold">Dance Commerce.</span>
            </h2>
            <div className="space-y-6 text-maroon/70 text-lg leading-relaxed font-medium">
              <p>
                S-sync is more than a management tool—it's a high-performance cloud infrastructure built specifically for the street dance industry. We've combined deep industry expertise with cutting-edge SaaS architecture to help studio owners scale globally.
              </p>
              <p>
                From our proprietary multi-tenant scheduling engine to automated financial reconciliation, we provide the technical backbone that allows artists to focus on what they do best: creating.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-maroon/10 pt-12">
              <div>
                <p className="text-4xl font-black italic text-maroon">15+</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Partner Studios</p>
              </div>
              <div>
                <p className="text-4xl font-black italic text-maroon">99.9%</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">System Uptime</p>
              </div>
              <div>
                <p className="text-4xl font-black italic text-maroon">24ms</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Server Latency</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[80px] overflow-hidden border-[12px] border-white shadow-2xl rotate-2">
              <img 
                src="https://picsum.photos/seed/tech/800/1000" 
                alt="Cloud Infrastructure" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-gold rounded-full -z-10 animate-pulse opacity-20 blur-3xl" />
          </motion.div>
        </div>

        <TeamSection />
      </div>
    </section>
  );
};

export const PricingAndRegister = () => {
  // 状态 1: 'selecting' (选套餐), 'registering' (填资料), 'success' (完成)
  const [step, setStep] = React.useState('selecting');
  const [selectedPlan, setSelectedPlan] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const plans = [
    { 
      id: 'core', 
      name: "CORE / Starter", 
      price: "€99", 
      period: "/mo",
      description: "Ideal for independent boutique studios looking to digitize.",
      features: ["100 Members", "Basic Engine", "Email Support", "Community Access"],
      highlight: false
    },
    { 
      id: 'scale', 
      name: "SCALE / Pro", 
      price: "€249", 
      period: "/mo",
      description: "Advanced tools for growing brands and multi-location studios.",
      features: ["Multi-Tenant", "White-label Logo", "Dr. Phat's Tech Team", "Advanced Analytics"],
      highlight: true
    },
    { 
      id: 'elite', 
      name: "ELITE / Enterprise", 
      price: "Custom", 
      period: "",
      description: "For global dance franchises requiring maximum security and scale.",
      features: ["Dedicated Server", "API Suite", "Consulting with Du", "24/7 VIP Support"],
      highlight: false
    }
  ];

  // 处理点击套餐
  const handleSelectPlan = (plan: any) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedPlan(plan);
      setStep('registering');
      setLoading(false);
    }, 1200); // 模拟云端处理延迟，增加科技感
  };

  if (loading) {
    return (
      <div className="min-h-[600px] bg-cream flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-maroon border-t-transparent rounded-full"
        />
        <p className="mt-8 font-black text-maroon animate-pulse tracking-[0.3em] text-xs uppercase">Provisioning Cloud Instance...</p>
      </div>
    );
  }

  return (
    <section id="pricing" className="py-24 px-8 bg-cream overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 'selecting' && (
          <motion.div 
            key="selecting"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-maroon italic tracking-tighter uppercase">Activate Your Engine</h2>
              <p className="text-maroon/40 font-bold mt-4 uppercase tracking-[0.3em] text-[10px]">Select a SaaS Tier to start your 14-day free trial</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {plans.map((plan) => (
                <motion.div 
                  key={plan.id} 
                  whileHover={{ y: -10 }}
                  className={`flex flex-col p-10 rounded-[2.5rem] transition-all duration-500 ${
                    plan.highlight 
                    ? 'bg-white border-4 border-maroon shadow-[0_35px_60px_-15px_rgba(128,0,32,0.2)]' 
                    : 'bg-white/50 border border-maroon/10'
                  }`}
                >
                  {plan.highlight && (
                    <div className="flex justify-center -mt-14 mb-8">
                      <span className="bg-maroon text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-black text-maroon italic tracking-tight uppercase">{plan.name}</h3>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-black text-maroon">{plan.price}</span>
                    <span className="text-maroon/40 text-sm font-bold">{plan.period}</span>
                  </div>
                  <p className="text-xs text-maroon/60 mt-4 font-medium leading-relaxed">{plan.description}</p>

                  <ul className="mt-10 space-y-5 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start text-sm font-medium text-maroon/70">
                        <CheckCircle2 className="text-gold mr-3 shrink-0" size={18} /> 
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full mt-12 py-5 rounded-2xl font-black italic text-lg uppercase tracking-widest transition-all shadow-xl ${
                      plan.highlight 
                      ? 'bg-maroon text-cream hover:bg-maroon-dark' 
                      : 'bg-maroon/5 text-maroon hover:bg-maroon hover:text-cream'
                    }`}
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'registering' && (
          <motion.div 
            key="registering"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl border border-maroon/10"
          >
            <button 
              onClick={() => setStep('selecting')} 
              className="text-maroon font-black text-[10px] uppercase tracking-widest mb-8 flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              ← Change Plan ({selectedPlan?.name})
            </button>
            
            <h2 className="text-3xl font-black text-maroon italic uppercase mb-2 tracking-tighter text-center">Studio Setup</h2>
            <p className="text-center text-maroon/40 text-[10px] font-bold mb-10 uppercase tracking-[0.3em]">Powered by S-sync Technology</p>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep('success'); }}>
              <div>
                <label className="text-[10px] font-black uppercase text-maroon/40 mb-2 block tracking-widest">Studio Name (Tenant Name)</label>
                <input required type="text" placeholder="e.g. OKEY Dance Studio" className="w-full p-4 bg-cream/30 border border-maroon/5 rounded-xl focus:border-maroon outline-none transition-all font-bold text-maroon" />
              </div>
              
              {selectedPlan?.id !== 'core' && (
                <div>
                  <label className="text-[10px] font-black uppercase text-maroon/40 mb-2 block tracking-widest">Brand Accent Color (White-label)</label>
                  <div className="flex gap-4 items-center">
                    <input type="color" defaultValue="#800020" className="w-16 h-12 rounded-xl cursor-pointer bg-cream/30 p-1 border border-maroon/5" />
                    <span className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">Select your brand identity</span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] font-black uppercase text-maroon/40 mb-2 block tracking-widest">CEO / Admin Email</label>
                <input required type="email" placeholder="owner@studio.com" className="w-full p-4 bg-cream/30 border border-maroon/5 rounded-xl focus:border-maroon outline-none transition-all font-bold text-maroon" />
              </div>

              <button type="submit" className="w-full py-5 bg-maroon text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-maroon/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Initialize Cloud Platform
              </button>
            </form>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-maroon p-16 rounded-[4rem] flex flex-col items-center text-center text-cream shadow-2xl"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-24 h-24 bg-cream/10 rounded-full flex items-center justify-center mb-10"
            >
              <ShieldCheck className="text-gold" size={48} />
            </motion.div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6">Instance Ready!</h2>
            <p className="opacity-80 font-bold uppercase tracking-[0.2em] text-[10px] leading-loose max-w-sm">
              Your studio infrastructure has been successfully provisioned on the S-sync Cloud. 
              Check your email for access to the Merchant Dashboard.
            </p>
            <button 
              onClick={() => setStep('selecting')}
              className="mt-12 bg-cream text-maroon px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-maroon transition-all shadow-xl"
            >
              Back to Main Console
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部保障 */}
      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-maroon/5 shadow-sm">
          <ShieldCheck className="text-gold" size={16} />
          <span className="text-maroon/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            Secure Cloud Payment Powered by S-sync Finance & Princess Strategy
          </span>
        </div>
      </div>
    </section>
  );
};

export const ContactSection = () => {
  const [isSending, setIsSending] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });

  // Configuration - Easy to change later
  const CONTACT_INFO = {
    phone: '+33 1 70 32 45 89',
    email: 'hello@s-sync.studio',
    whatsappMessage: "Hi S-sync, I'd like to inquire about classes!",
    address: '15 Rue de la Paix, 75002 Paris, France'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSending(false);
    setFormData({ name: '', email: '', message: '' });
    toast.success("Success! We'll get back to you soon", {
      description: "Your message has been sent to our team.",
      className: "bg-cream border-maroon text-maroon font-bold italic"
    });
  };

  return (
    <section id="contact" className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Info & Map */}
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl font-black italic tracking-tighter text-maroon mb-6">Get in Touch</h2>
              <p className="text-maroon/60 text-lg leading-relaxed mb-8">
                Ready to find your rhythm? Contact us for class inquiries, private bookings, or studio tours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-cream transition-all">
                    <Phone size={20} />
                  </div>
                  <div className="flex items-center gap-3">
                    <a 
                      href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                      className="text-xl font-bold text-maroon hover:text-gold transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                    <a 
                      href={`https://wa.me/33170324589?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      title="Chat on WhatsApp"
                    >
                      <MessageSquare size={14} fill="currentColor" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-cream transition-all">
                    <Mail size={20} />
                  </div>
                  <a 
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-xl font-bold text-maroon hover:text-gold transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-cream transition-all">
                    <MapPin size={20} />
                  </div>
                  <p className="text-lg font-medium text-maroon/80">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-64 bg-maroon/5 rounded-3xl overflow-hidden border border-maroon/10 group">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-maroon/20">
                <MapPin size={48} className="mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-bold italic">Paris, France</p>
              </div>
              {/* Actual Embed Placeholder */}
              <iframe 
                title="S-sync Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.215930013722!2d2.329824315663365!3d48.87122197928886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3966023d6b%3A0x647087a360e2069!2sPlace%20de%20l&#39;Op%C3%A9ra!5e0!3m2!1sen!2sfr!4v1647444444444!5m2!1sen!2sfr"
                className="w-full h-full opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                loading="lazy"
              />
            </div>

            {/* Socials */}
            <div className="flex gap-6">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Music2, label: 'TikTok' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#"
                  className="w-14 h-14 bg-white border border-maroon/10 rounded-2xl flex items-center justify-center text-maroon hover:text-gold hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-cream/50 rounded-[40px] p-10 border border-maroon/5 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-maroon/40 ml-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Jean Dupont"
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 text-maroon placeholder:text-maroon/20 focus:ring-2 focus:ring-gold outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-maroon/40 ml-2">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="jean@example.com"
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 text-maroon placeholder:text-maroon/20 focus:ring-2 focus:ring-gold outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-maroon/40 ml-2">Your Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your goals..."
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 text-maroon placeholder:text-maroon/20 focus:ring-2 focus:ring-gold outline-none transition-all shadow-sm resize-none"
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSending}
                className="w-full py-5 bg-maroon text-cream rounded-2xl font-black italic text-xl shadow-2xl hover:bg-maroon-dark transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Send size={20} />
                    </motion.div>
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const CONTACT_INFO = {
    phone: '+33 1 70 32 45 89',
    whatsappMessage: "Hi S-sync, I'd like to inquire about classes!"
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-72 bg-white rounded-3xl shadow-2xl border border-maroon/5 overflow-hidden"
          >
            <div className="bg-maroon p-6 text-cream">
              <h3 className="font-black italic text-xl">Chat with us</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-60 mt-1">We typically reply in minutes</p>
            </div>
            <div className="p-4 space-y-3">
              <a 
                href={`https://wa.me/33170324589?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-maroon/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MessageSquare size={18} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-bold text-maroon">WhatsApp</p>
                  <p className="text-[10px] text-maroon/40">Instant messaging</p>
                </div>
              </a>
              <a 
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-maroon/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-maroon text-cream rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-maroon">Call Us</p>
                  <p className="text-[10px] text-maroon/40">{CONTACT_INFO.phone}</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-4 bg-maroon text-cream rounded-full shadow-2xl hover:bg-maroon-dark hover:scale-105 transition-all group"
      >
        <div className="relative">
          <MessageSquare size={20} className={isOpen ? 'hidden' : 'block'} />
          <X size={20} className={isOpen ? 'block' : 'hidden'} />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full border-2 border-maroon animate-pulse" />
          )}
        </div>
        <span className="font-bold italic tracking-tight">Chat with us</span>
      </button>
    </div>
  );
};
