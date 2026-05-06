 import { useAuth } from '../../hooks/useAuth';

  const Navbar = () => {
    const { user } = useAuth();
    return (
      <header className="glass-navbar">
        <h1 className="heading-2">Finance Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="body-text">{user?.email}</span>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {user?.email?.[0].toUpperCase()}
          </div>
        </div>
      </header>
    );
  };

  export default Navbar;
