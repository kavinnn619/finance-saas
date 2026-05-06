 import { motion } from 'framer-motion';
  import { clsx } from 'clsx';

  interface Props { children: React.ReactNode; className?: string; onClick?: () => void; }

  const GlassCard = ({ children, className, onClick }: Props) => (
    <motion.div className={clsx('glass-card', className)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 300 }} onClick={onClick}>
      {children}
    </motion.div>
  );

  export default GlassCard;
