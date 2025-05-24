import React from 'react';
import { Link } from '@inertiajs/react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';

const categories = [
  { name: 'General', slug: 'general' },
  { name: 'Design', slug: 'design' },
  { name: 'Projects', slug: 'projects' },
  { name: 'Events', slug: 'events' },
];

const infoLinks = [
  { name: 'Contact Us', href: '/contact' },
  { name: 'Advertise', href: '/advertise' },
  { name: 'Newsletter', href: '/newsletter' },
  { name: 'Privacy Policy', href: '/pages/privacy-policy' },
  { name: 'Terms of Service', href: '/pages/terms' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Discussions', href: '/discussions' },
  { name: 'Projects', href: '/projects' },
  { name: 'Directory', href: '/directory/users' },
  { name: 'Events', href: '/events' },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2 inline-block">
              ArchAlley
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              ArchAlley is the hub for architecture enthusiasts to connect, share, and grow. Join the conversation and be part of a vibrant community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Categories</h4>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Info</h4>
            <ul className="space-y-2">
              {infoLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Sub-footer */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ArchAlley. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com/archalley" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com/archalley" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com/company/archalley" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://instagram.com/archalley" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 