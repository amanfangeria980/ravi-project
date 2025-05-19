import { motion } from 'framer-motion';
import { User } from '../../data/mockData';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface HeaderProps {
  user: User;
}

export const Header = ({ user }: HeaderProps) => {
  const progress = (user.savingsGoal / 100000) * 100; // Assuming 100k is max goal

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-primary-100 relative"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-10 bg-primary-500 rounded-full mr-2" />
          <h1 className="text-2xl font-bold text-primary-700 flex items-center gap-2">
            Hello, {user.name} <span className="hidden sm:inline">👋</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="w-64 mr-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Savings Goal</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary-500"
              />
            </div>
          </div>
          <Link to="/profile" className="group">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shadow transition-transform group-hover:scale-105">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <UserCircleIcon className="w-10 h-10 text-primary-400" />
              )}
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}; 