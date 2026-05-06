import { motion } from 'framer-motion';
  import { Outlet } from 'react-router-dom';
  import Sidebar from '../components/common/Sidebar';
  import Navbar from '../components/common/Navbar';

  const DashboardLayout = () => (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Navbar />
        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Outlet />
        </motion.div>
      </main>
    </div>
  );

  export default DashboardLayout;
