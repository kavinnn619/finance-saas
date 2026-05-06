 import { motion } from 'framer-motion';
  import { Outlet } from 'react-router-dom';

  const AuthLayout = () => (
    <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50"
  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="glass-card w-full max-w-md"><Outlet /></div>
    </motion.div>
  );

  export default AuthLayout;
