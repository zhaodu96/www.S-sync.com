import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  CreditCard, 
  Clock, 
  MapPin, 
  ChevronRight,
  Star,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CLASSES } from './constants';
import { toast, Toaster } from 'sonner';

// --- Types ---
interface Booking {
  id: string;
  title: string;
  instructor: string;
  time: string;
  date: string;
  location: string;
}

// --- Components ---

const Modal = ({ isOpen, onClose, children, title }: { isOpen: boolean, onClose: () => void, children: React.ReactNode, title: string }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-maroon/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-6 border-b border-maroon/5 flex items-center justify-between">
              <h3 className="text-xl font-bold italic text-maroon">{title}</h3>
              <button onClick={onClose} className="p-2 hover:bg-maroon/5 rounded-full transition-colors">
                <X size={20} className="text-maroon/40" />
              </button>
            </div>
            <div className="p-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const MemberPortalView = ({ 
  credits, 
  setCredits, 
  bookings, 
  setBookings,
  setBookedClasses
}: { 
  credits: number, 
  setCredits: React.Dispatch<React.SetStateAction<number>>, 
  bookings: Booking[], 
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>,
  setBookedClasses: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  // Feature 3: Dynamic State Management (Moved to App.tsx)
  
  // UI States
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Feature 1: Interactive 'Cancel' Button Logic
  const handleCancelClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    if (!selectedBooking) return;
    
    setCancellingId(selectedBooking.id);
    setIsProcessing(true);

    // Mock Database Action
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Credit Refund & UI Update
    setBookings(prev => prev.filter(b => b.id !== selectedBooking.id));
    setBookedClasses(prev => prev.filter(id => id !== selectedBooking.id));
    setCredits(prev => prev + 1);
    
    toast.success('Booking Cancelled', {
      description: `+1 Credit Refunded for ${selectedBooking.title}`,
      icon: <CheckCircle2 className="text-green-500" />
    });

    setIsCancelModalOpen(false);
    setSelectedBooking(null);
    setIsProcessing(false);
    setCancellingId(null);
  };

  // Feature 2: Interactive 'Buy Class Pack' Button Logic
  const handleBuyPack = async () => {
    setIsPaymentModalOpen(true);
  };

  const confirmPayment = async () => {
    setIsProcessing(true);

    // Mock Payment Process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Database Action & Credit Update
    setCredits(prev => prev + 10);
    
    toast.success('Payment Successful', {
      description: '10-Class Pack added to your account.',
      icon: <CheckCircle2 className="text-green-500" />
    });

    setIsPaymentModalOpen(false);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <Toaster position="top-right" expand={false} richColors />
      
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-maroon">
            My Portal
          </h1>
          <p className="text-maroon/50 font-medium mt-1">
            Manage your classes, credits, and progress.
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-maroon/5 flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">Available Credits</p>
            <motion.p 
              key={credits}
              initial={{ scale: 1.2, color: '#D4AF37' }}
              animate={{ scale: 1, color: '#800020' }}
              className="text-xl font-black italic"
            >
              {credits}
            </motion.p>
          </div>
          <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
            <Star size={20} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* My Bookings */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 shadow-sm border border-maroon/5">
          <h2 className="text-xl font-bold italic mb-6">My Bookings</h2>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <motion.div 
                    key={booking.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-6 p-4 rounded-2xl bg-maroon/5 border border-maroon/5 hover:border-maroon/20 transition-all"
                  >
                    <div className="w-16 h-16 bg-maroon text-cream rounded-2xl flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold uppercase">Mar</span>
                      <span className="text-xl font-black italic">{booking.date === 'Today' ? '30' : '31'}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{booking.title}</h3>
                      <p className="text-xs text-maroon/60">with {booking.instructor}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-[10px] font-medium opacity-60">
                          <Clock size={12} /> {booking.time}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-medium opacity-60">
                          <MapPin size={12} /> {booking.location}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCancelClick(booking)}
                      disabled={cancellingId === booking.id}
                      className="px-4 py-2 bg-white text-maroon border border-maroon/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-maroon hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {cancellingId === booking.id ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Cancelling...
                        </>
                      ) : 'Cancel'}
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-maroon/5 rounded-full flex items-center justify-center mx-auto mb-4 text-maroon/20">
                    <Calendar size={32} />
                  </div>
                  <p className="text-maroon/40 font-bold italic">No active bookings</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-maroon text-cream rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <h3 className="text-xl font-bold italic mb-4">Need more credits?</h3>
            <p className="text-sm opacity-70 mb-6">Top up your account to book more classes and private lessons.</p>
            <button 
              onClick={handleBuyPack}
              className="w-full py-3 bg-gold text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
            >
              Buy Class Pack
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-maroon/5">
            <h3 className="font-bold italic mb-4">Recommended for you</h3>
            <div className="space-y-4">
              {CLASSES.slice(0, 2).map((cls) => (
                <div key={cls.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-maroon/5 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: cls.color }} />
                  <div>
                    <p className="text-xs font-bold">{cls.title}</p>
                    <p className="text-[10px] opacity-50">{cls.day} • {cls.startTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal 
        isOpen={isCancelModalOpen} 
        onClose={() => !isProcessing && setIsCancelModalOpen(false)} 
        title="Confirm Cancellation"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <AlertCircle size={32} />
          </div>
          <p className="text-maroon/60 mb-8">
            Are you sure you want to cancel <span className="font-bold text-maroon">{selectedBooking?.title}</span> on <span className="font-bold text-maroon">Mar {selectedBooking?.date === 'Today' ? '30' : '31'}</span>?
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsCancelModalOpen(false)}
              disabled={isProcessing}
              className="flex-1 py-3 border border-maroon/10 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-maroon/5 transition-colors disabled:opacity-50"
            >
              Go Back
            </button>
            <button 
              onClick={confirmCancel}
              disabled={isProcessing}
              className="flex-1 py-3 bg-maroon text-cream rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-maroon-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Processing...
                </>
              ) : 'Yes, Cancel'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Payment Modal */}
      <Modal 
        isOpen={isPaymentModalOpen} 
        onClose={() => !isProcessing && setIsPaymentModalOpen(false)} 
        title="Purchase Class Pack"
      >
        <div className="space-y-6">
          <div className="bg-maroon/5 p-6 rounded-2xl border border-maroon/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-maroon/40">Item</span>
              <span className="text-xs font-bold uppercase tracking-widest text-maroon/40">Price</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg italic">10-Class Pack</span>
              <span className="font-black text-xl text-gold">$100.00</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-maroon/40">Payment Method</p>
            <div className="flex items-center gap-4 p-4 border border-maroon/10 rounded-2xl bg-white">
              <div className="w-10 h-10 bg-maroon/5 rounded-lg flex items-center justify-center text-maroon">
                <CreditCard size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">•••• •••• •••• 4242</p>
                <p className="text-[10px] opacity-50 uppercase font-bold">Expires 12/28</p>
              </div>
              <CheckCircle2 size={20} className="text-gold" />
            </div>
          </div>

          <button 
            onClick={confirmPayment}
            disabled={isProcessing}
            className="w-full py-4 bg-maroon text-cream rounded-2xl font-black italic text-lg shadow-xl hover:bg-maroon-dark transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : 'CONFIRM PAYMENT'}
          </button>
          <p className="text-[10px] text-center text-maroon/40 font-medium">
            Secure payment powered by Stripe. Your credits will be added instantly.
          </p>
        </div>
      </Modal>
    </div>
  );
};
