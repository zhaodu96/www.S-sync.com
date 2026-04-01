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
  // UI States
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancelClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    if (!selectedBooking) return;
    setCancellingId(selectedBooking.id);
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
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

  const handleBuyPack = () => setIsPaymentModalOpen(true);

  const confirmPayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCredits(prev => prev + 10);
    toast.success('Payment Successful', {
      description: '10-Class Pack added to your account.',
      icon: <CheckCircle2 className="text-green-500" />
    });
    setIsPaymentModalOpen(false);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <Toaster position="top-right" expand={false} richColors />
      
      <header>
        <h2 className="text-5xl font-black text-maroon italic uppercase tracking-tighter">Welcome back, Student</h2>
        <p className="text-maroon/50 font-medium mt-2 italic">Your artistic journey at OKEY Dance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-maroon p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-cream/60 font-bold uppercase tracking-widest">Available Credits</p>
          <motion.p 
            key={credits}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-7xl font-black text-cream mt-4 italic"
          >
            {credits}
          </motion.p>
          <button 
            onClick={handleBuyPack}
            className="mt-8 px-6 py-2 bg-gold text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-maroon transition-all"
          >
            Top Up Credits
          </button>
        </div>
        
        <div className="bg-stone-800 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Classes Joined</p>
          <p className="text-7xl font-black text-white mt-4 italic">24</p>
          <p className="mt-8 text-[10px] text-white/40 font-bold uppercase tracking-widest">Lifetime Achievement</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black italic text-maroon uppercase tracking-tight">Upcoming Classes</h3>
          <span className="px-4 py-1 bg-maroon/5 rounded-full text-[10px] font-bold text-maroon uppercase tracking-widest">
            {bookings.length} Reserved
          </span>
        </div>
        
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <motion.div 
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-6 p-6 rounded-3xl bg-white border border-maroon/5 hover:border-maroon/20 transition-all shadow-sm group"
                >
                  <div className="w-16 h-16 bg-maroon text-cream rounded-2xl flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-[10px] font-bold uppercase opacity-60">Mar</span>
                    <span className="text-2xl font-black italic">{booking.date === 'Today' ? '30' : '31'}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-xl italic text-maroon tracking-tight">{booking.title}</h3>
                    <p className="text-xs font-bold text-maroon/40 uppercase tracking-widest mt-1">with {booking.instructor}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-maroon/60 uppercase tracking-widest">
                        <Clock size={12} className="text-gold" /> {booking.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-maroon/60 uppercase tracking-widest">
                        <MapPin size={12} className="text-gold" /> {booking.location}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCancelClick(booking)}
                    disabled={cancellingId === booking.id}
                    className="px-6 py-3 bg-stone-100 text-maroon/40 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-maroon hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {cancellingId === booking.id ? <Loader2 size={12} className="animate-spin" /> : 'Cancel'}
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center bg-maroon/5 rounded-[40px] border border-dashed border-maroon/20">
                <Calendar size={48} className="mx-auto mb-4 text-maroon/10" />
                <p className="text-maroon/40 font-bold italic uppercase tracking-widest text-sm">No active bookings found</p>
              </div>
            )}
          </AnimatePresence>
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
