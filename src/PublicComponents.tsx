import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Phone, MessageSquare, Instagram, Music2, Send, Mail, X, CheckCircle2, AlertCircle, Calendar, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { CLASSES, INSTRUCTORS } from './constants';

export const PublicSchedule = ({ 
  isInteractive = false, 
  credits = 0, 
  bookedClasses = [], 
  onBook = () => {} 
}: { 
  isInteractive?: boolean, 
  credits?: number, 
  bookedClasses?: string[], 
  onBook?: (classId: string) => void 
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = Array.from({ length: 10 }, (_, i) => i + 9);

  const [selectedClass, setSelectedClass] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState(false);

  const getClassesForDay = (day: string) => CLASSES.filter(c => c.day === day);

  const handleBookClick = (cls: any) => {
    if (!isInteractive) return;
    setSelectedClass(cls);
    setShowModal(true);
  };

  const confirmBooking = () => {
    if (selectedClass) {
      onBook(selectedClass.id);
      setShowModal(false);
      setSelectedClass(null);
    }
  };

  return (
    <section id="schedule" className={`py-20 px-8 ${isInteractive ? 'bg-transparent' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        {!isInteractive && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black italic tracking-tighter text-maroon mb-4">Weekly Schedule</h2>
            <p className="text-maroon/60 max-w-2xl mx-auto">
              Join our high-energy classes led by industry professionals. Find your rhythm and book your spot today.
            </p>
          </div>
        )}

        <div className="overflow-x-auto pb-8">
          <div className="grid grid-cols-[80px_repeat(5,1fr)] min-w-[1000px] border border-maroon/10 rounded-3xl overflow-hidden shadow-sm bg-white">
            {/* Header */}
            <div className="h-16 bg-maroon/5 border-b border-maroon/10" />
            {days.map(day => (
              <div key={day} className="h-16 bg-maroon/5 flex items-center justify-center font-black italic text-maroon border-b border-l border-maroon/10">
                {day}
              </div>
            ))}

            {/* Grid Body */}
            {hours.map(hour => (
              <React.Fragment key={hour}>
                <div className="h-24 flex items-center justify-center text-xs font-mono text-maroon/40 border-b border-maroon/10">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                {days.map(day => {
                  const dayClasses = getClassesForDay(day).filter(c => parseInt(c.startTime.split(':')[0]) === hour);
                  return (
                    <div key={`${day}-${hour}`} className="h-24 border-b border-l border-maroon/10 relative bg-maroon/[0.01] group">
                      {dayClasses.map(cls => {
                        const isBooked = bookedClasses.includes(cls.id);
                        return (
                          <motion.div
                            key={cls.id}
                            whileHover={!isBooked ? { scale: 1.02 } : {}}
                            onClick={() => !isBooked && handleBookClick(cls)}
                            className={`absolute inset-1 rounded-xl p-3 text-white shadow-lg z-10 flex flex-col justify-between transition-all ${isBooked ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
                            style={{ backgroundColor: isBooked ? '#4A4A4A' : cls.color }}
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <p className="text-xs font-black italic leading-tight">{cls.title}</p>
                                {isBooked && <CheckCircle2 size={12} className="text-white" />}
                              </div>
                              <div className="flex items-center gap-1 mt-1 opacity-80">
                                <MapPin size={10} />
                                <p className="text-[10px] font-medium">{cls.location}</p>
                              </div>
                            </div>
                            <button 
                              disabled={isBooked}
                              className={`mt-auto w-full py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-colors ${
                                isBooked 
                                  ? 'bg-black/20 text-white/50' 
                                  : 'bg-white/20 hover:bg-white/30 text-white'
                              }`}
                            >
                              {isBooked ? 'Booked' : 'Book Now'}
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && selectedClass && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-maroon/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-cream w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl border border-maroon/10"
            >
              <div className="bg-maroon p-8 text-cream relative">
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <h3 className="text-3xl font-black italic tracking-tighter">Confirm Booking</h3>
                <p className="text-cream/60 text-xs uppercase tracking-widest mt-2">Class Reservation</p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-maroon/5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: selectedClass.color }}>
                    <Calendar size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black italic text-maroon">{selectedClass.title}</h4>
                    <div className="flex items-center gap-2 text-maroon/60 text-xs mt-1">
                      <Clock size={12} />
                      <span>{selectedClass.day}, {selectedClass.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-maroon/60 text-xs mt-1">
                      <MapPin size={12} />
                      <span>{selectedClass.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-maroon/5 rounded-2xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-maroon/40">Cost</span>
                  <span className="font-black italic text-maroon">1 Credit</span>
                </div>

                {credits > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-maroon/60 text-center">
                      You have <span className="font-bold text-maroon">{credits} credits</span> remaining.
                    </p>
                    <button 
                      onClick={confirmBooking}
                      className="w-full py-5 bg-maroon text-cream rounded-2xl font-black italic text-xl shadow-xl hover:bg-maroon-dark transition-all flex items-center justify-center gap-3"
                    >
                      <ShieldCheck size={20} />
                      CONFIRM BOOKING
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                      <AlertCircle size={20} />
                      <p className="text-sm font-bold">Not enough credits</p>
                    </div>
                    <p className="text-xs text-maroon/60 text-center px-4">
                      You've used all your credits. Purchase a new pack to continue booking classes.
                    </p>
                    <button 
                      onClick={() => {
                        setShowModal(false);
                        // In a real app, we'd navigate to the buy page
                        toast.error("Redirecting to Buy Class Pack page...");
                      }}
                      className="w-full py-5 bg-gold text-white rounded-2xl font-black italic text-xl shadow-xl hover:opacity-90 transition-all"
                    >
                      BUY CLASS PACK
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 text-maroon/40 font-bold text-xs uppercase tracking-widest hover:text-maroon transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const InstructorShowcase = () => {
  return (
    <section id="instructors" className="py-20 px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic tracking-tighter text-maroon mb-4">Our Instructors</h2>
          <p className="text-maroon/60 max-w-2xl mx-auto">
            Learn from the best in the industry. Our teachers bring years of professional experience to every class.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSTRUCTORS.map((instructor) => (
            <motion.div 
              key={instructor.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-maroon/5 flex flex-col items-center text-center group"
            >
              <div className="relative mb-6">
                <img 
                  src={instructor.avatar} 
                  alt={instructor.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-cream shadow-xl group-hover:border-gold transition-colors"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-2 -right-2 bg-maroon text-cream px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Expert
                </div>
              </div>
              <h3 className="text-2xl font-black italic text-maroon mb-2">{instructor.name}</h3>
              <p className="text-sm text-maroon/60 leading-relaxed mb-6">
                {instructor.bio}
              </p>
              <button className="mt-auto text-gold font-bold text-xs uppercase tracking-widest hover:underline">
                View Full Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AboutUs = () => {
  return (
    <section id="about" className="py-20 px-8 bg-maroon text-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black italic tracking-tighter mb-8">Elevating the Studio Experience</h2>
            <div className="space-y-6 text-cream/80 text-lg leading-relaxed">
              <p>
                S-sync was born from a vision to bridge the gap between professional dance training and modern studio management. We believe that every artist deserves a space that inspires growth, and every studio owner deserves tools that simplify excellence.
              </p>
              <p>
                Our flagship Paris location features state-of-the-art acoustics, specialized sprung floors, and a community of world-class instructors dedicated to your artistic journey.
              </p>
            </div>
            <div className="mt-10 flex gap-8">
              <div>
                <p className="text-4xl font-black italic text-gold">15+</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Expert Teachers</p>
              </div>
              <div>
                <p className="text-4xl font-black italic text-gold">2k+</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Active Students</p>
              </div>
              <div>
                <p className="text-4xl font-black italic text-gold">Studio A/B</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Premium Spaces</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[60px] overflow-hidden border-8 border-cream/10 rotate-3">
              <img 
                src="https://picsum.photos/seed/studio/800/800" 
                alt="Studio Interior" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gold rounded-[40px] -z-10 -rotate-6 opacity-20 blur-2xl" />
          </motion.div>
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
