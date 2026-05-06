import { motion } from 'framer-motion';
  import GlassCard from '../components/common/GlassCard';

  const Dashboard = () => {
    const cards = [
      { title: 'Total Balance', value: '$12,450.00', icon: '💰' },
      { title: 'Monthly Income', value: '$5,200.00', icon: '📈' },
      { title: 'Monthly Expenses', value: '$2,100.00', icon: '📉' },
      { title: 'Active Accounts', value: '3', icon: '🏦' },
    ];

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="heading-1">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{
  delay: index * 0.1 }}>
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{card.icon}</span>
                  <span className="caption">{card.title}</span>
                </div>
                <div className="heading-2">{card.value}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  export default Dashboard;
