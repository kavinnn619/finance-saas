import { useState } from 'react';
  import { NavLink, useNavigate } from 'react-router-dom';
  import { motion, AnimatePresence } from 'framer-motion';
  import { useAuth } from '../../hooks/useAuth';

  const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const navItems = [
      { path: '/', label: 'Dashboard', icon: '📊' },
      { path: '/transactions', label: 'Transactions', icon: '💸' },
      { path: '/accounts', label: 'Accounts', icon: '🏦' },
      { path: '/reports', label: 'Reports', icon: '📈' },
    ];

    return (
      <motion.aside className={`glass-sidebar ${isCollapsed ? 'collapsed' : ''}`} animate={{ width: isCollapsed ? 80 :
  250 }}>
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && <h2 className="heading-3">Finance SaaS</h2>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-lg hover:bg-white/10">
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={({ isActive }) => `flex items-center p-3 rounded-lg ${isActive ?
  'bg-blue-500/20' : 'hover:bg-white/10'}`}>
                  <span className="text-xl mr-3">{item.icon}</span>
                  <AnimatePresence>
                    {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0
  }}>{item.label}</motion.span>}
                  </AnimatePresence>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center p-3 w-full rounded-lg
  hover:bg-red-500/20 text-red-500">
          <span className="text-xl mr-3">🚪</span>
          {!isCollapsed && 'Logout'}
        </button>
      </motion.aside>
    );
  };

  export default Sidebar;
