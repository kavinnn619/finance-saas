import { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import { useAuth } from '../../hooks/useAuth';
  import api from '../../utils/api';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const { data } = await api.post('/api/auth/login', { email, password });
        login(data.accessToken, data.user);
        navigate('/');
      } catch (err: any) { setError(err.response?.data?.error || 'Login failed'); }
    };

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="heading-2 text-center mb-8">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="caption">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg   glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="caption">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3
  rounded-lg glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600
  transition-colors">Login</button>
        </form>
        <p className="text-center mt-4 body-text">Don't have an account? <Link to="/register" className="text-blue-500
  hover:underline">Register</Link></p>
      </motion.div>
    );
  };

  export default Login;
