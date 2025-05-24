
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Topic } from '../types';

interface NavbarProps {
  topics: Topic[];
}

export const Navbar: React.FC<NavbarProps> = ({ topics }) => {
  if (topics.length === 0) {
    return <p className="text-gray-400">No topics match your search.</p>;
  }
  return (
    <nav>
      <ul className="space-y-2">
        {topics.map(topic => (
          <li key={topic.id}>
            <NavLink
              to={`/topic/${topic.id}`}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-gray-300 hover:bg-sky-700 hover:text-white transition-colors duration-150 ease-in-out ${
                  isActive ? 'bg-sky-600 text-white font-semibold shadow-md' : 'bg-slate-700/50'
                }`
              }
            >
              {topic.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
    