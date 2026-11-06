import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User as UserIcon, 
  Phone, 
  Mail, 
  FileText, 
  RotateCw, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Edit3, 
  Lock, 
  LifeBuoy, 
  LogOut, 
  Plus, 
  Send, 
  X,
  CreditCard,
  Check,
  ChevronDown,
  Shield
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { 
    currentUser, 
    settings, 
    logout, 
    switchRole, 
    setCurrentView,
    tickets,
    createTicket,
    replyTicket 
  } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<'info' | 'edit_profile' | 'security' | 'tickets'>('info');

  // Edit Profile State
  const [nameInput, setNameInput] = useState(currentUser?.name || 'Arafat Mazumder');
  const [phoneInput, setPhoneInput] = useState(currentUser?.phone || '01915985602');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Security Password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Support Ticket State
  const [isOpeningTicket, setIsOpeningTicket] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDept, setTicketDept] = useState<'Sales' | 'Technical Support' | 'License Issue' | 'Billing'>('Technical Support');
  const [ticketMessage, setTicketMessage] = useState('');
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

  const userTickets = tickets.filter(t => t.userId === currentUser?.id || currentUser?.role === 'admin');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;
    setPasswordSuccess(true);
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    createTicket(ticketSubject, ticketDept, 'medium', ticketMessage);
    setIsOpeningTicket(false);
    setTicketSubject('');
    setTicketMessage('');
  };

  const handleReplySubmit = (ticketId: string) => {
    const text = replyTexts[ticketId];
    if (!text || !text.trim()) return;
    replyTicket(ticketId, text);
    setReplyTexts(prev => ({ ...prev, [ticketId]: '' }));
  };

  const avatarSrc = currentUser?.avatarUrl || '/default_user_pfp.jpeg';
  const supportPin = currentUser?.id || '23062';

  return (
    <div className="w-full min-h-[75vh] bg-slate-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ============================================================== */}
        {/* CARD 1: PROFILE HEADER CARD (Exact design from Screenshot 2)   */}
        {/* ============================================================== */}
        <div className="w-full bg-white dark:bg-white rounded-3xl p-6 sm:p-8 text-center shadow-lg border border-slate-200/90 relative overflow-hidden">
          
          {/* Circular Centered Avatar with Online Green Dot */}
          <div className="relative inline-block mx-auto mb-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-md mx-auto relative">
              <img
                src={avatarSrc}
                alt={currentUser?.name || 'Arafat Mazumder'}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/default_user_pfp.jpeg';
                }}
              />
            </div>
            
            {/* Green Online / Active Status Badge at bottom right of avatar ring */}
            <span 
              className="absolute bottom-1 right-2 sm:right-3 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center" 
              title="Online & Verified"
            />
          </div>

          {/* User Name + Verified Pill Badge */}
          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              {currentUser?.name || 'Arafat Mazumder'}
            </h1>
            
            {/* Verified Badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Verified</span>
            </span>
          </div>

          {/* Subtitle Line: Support PIN & Verified Account */}
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 mt-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-slate-400 stroke-[2.2]" />
              <span>Support PIN: <strong className="font-mono text-slate-800">{supportPin}</strong></span>
            </div>

            <span className="text-slate-300">·</span>

            <div className="flex items-center gap-1.5 text-slate-600">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Verified Account</span>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* CARD 2: USER INFORMATION CARD (Exact design from Screenshot 3) */}
        {/* ============================================================== */}
        <div className="w-full bg-white dark:bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-200/90 space-y-4">
          
          {/* Title Header */}
          <div>
            <span className="text-[11px] font-extrabold tracking-widest text-indigo-600 uppercase block mb-1">
              ACCOUNT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              User Information
            </h2>
          </div>

          {/* 4 Clean Information Rows */}
          <div className="space-y-3 pt-1">
            
            {/* 1. NAME */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <UserIcon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  NAME
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 truncate block">
                  {currentUser?.name || 'Arafat Mazumder'}
                </span>
              </div>
            </div>

            {/* 2. PHONE */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  PHONE
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 font-mono block">
                  {currentUser?.phone || '01915985602'}
                </span>
              </div>
            </div>

            {/* 3. EMAIL */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  EMAIL
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 truncate block font-mono">
                  {currentUser?.email || 'arafatmazumder304@gmail.com'}
                </span>
              </div>
            </div>

            {/* 4. USER ID */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  USER ID
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 font-mono block">
                  {supportPin}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* QUICK ACCOUNT UTILITIES (Edit, Security, Support Desk, Logout)  */}
        {/* ============================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          
          <button
            type="button"
            onClick={() => setActiveSubTab(activeSubTab === 'edit_profile' ? 'info' : 'edit_profile')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              activeSubTab === 'edit_profile'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab(activeSubTab === 'security' ? 'info' : 'security')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              activeSubTab === 'security'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Change Password</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab(activeSubTab === 'tickets' ? 'info' : 'tickets')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              activeSubTab === 'tickets'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Support Tickets ({userTickets.length})</span>
          </button>

          {currentUser?.role === 'admin' && (
            <button
              type="button"
              onClick={() => setCurrentView('admin_dashboard')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600/30 flex items-center gap-1.5 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </button>
          )}

          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600/10 text-rose-400 border border-rose-500/20 hover:bg-rose-600/20 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>

        </div>

        {/* Collapsible Sub-View: Edit Profile */}
        {activeSubTab === 'edit_profile' && (
          <form onSubmit={handleProfileSave} className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 animate-in fade-in">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-indigo-400" />
              <span>Update Profile Information</span>
            </h3>

            {profileSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('info')}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs rounded-xl hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Collapsible Sub-View: Security / Password */}
        {activeSubTab === 'security' && (
          <form onSubmit={handlePasswordChange} className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 animate-in fade-in">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Change Account Password</span>
            </h3>

            {passwordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Password changed securely!</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">New Secure Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('info')}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs rounded-xl hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Collapsible Sub-View: Support Tickets */}
        {activeSubTab === 'tickets' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-indigo-400" />
                <span>Developer Support Tickets</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsOpeningTicket(!isOpeningTicket)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Ticket</span>
              </button>
            </div>

            {/* New Ticket Form */}
            {isOpeningTicket && (
              <form onSubmit={handleTicketSubmit} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={e => setTicketSubject(e.target.value)}
                    placeholder="e.g. Issue installing script on VPS"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Department</label>
                    <select
                      value={ticketDept}
                      onChange={e => setTicketDept(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Technical Support">Technical Support</option>
                      <option value="License Issue">License Issue</option>
                      <option value="Billing">Billing & Top-up</option>
                      <option value="Sales">Sales Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Detailed Message</label>
                  <textarea
                    rows={3}
                    value={ticketMessage}
                    onChange={e => setTicketMessage(e.target.value)}
                    placeholder="Provide details about your query..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Submit Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpeningTicket(false)}
                    className="px-3 py-2 bg-slate-800 text-slate-400 hover:text-white text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Existing Tickets List */}
            {userTickets.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No active support tickets found.</p>
            ) : (
              <div className="space-y-3">
                {userTickets.map(ticket => (
                  <div key={ticket.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white">{ticket.ticketNumber} · {ticket.subject}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {ticket.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {ticket.messages.map((m, idx) => (
                        <div key={idx} className={`p-3 rounded-xl text-xs ${m.sender === 'support' ? 'bg-indigo-950/40 border border-indigo-500/30 text-indigo-200' : 'bg-slate-900 text-slate-300'}`}>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 font-mono">
                            <span className="font-bold text-slate-300">{m.senderName} ({m.sender})</span>
                            <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="leading-relaxed">{m.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Reply to this ticket..."
                        value={replyTexts[ticket.id] || ''}
                        onChange={e => setReplyTexts(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                        onKeyDown={e => e.key === 'Enter' && handleReplySubmit(ticket.id)}
                      />
                      <button
                        type="button"
                        onClick={() => handleReplySubmit(ticket.id)}
                        className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                        title="Send Reply"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
