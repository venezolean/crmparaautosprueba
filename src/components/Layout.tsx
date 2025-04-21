import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Users, Car, BarChart3, Mail, MessageSquare, 
  LayoutDashboard, LogOut, Settings 
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/clients', icon: Users, label: 'Clientes' },
  { path: '/opportunities', icon: Car, label: 'Oportunidades' },
  { path: '/email-campaigns', icon: Mail, label: 'Campañas Email' },
  { path: '/whatsapp', icon: MessageSquare, label: 'WhatsApp' },
  { path: '/metrics', icon: BarChart3, label: 'Métricas' },
  { path: '/settings', icon: Settings, label: 'Configuración' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 hidden md:block">AutoCRM</h1>
          <h1 className="text-xl font-bold text-gray-800 md:hidden text-center">A</h1>
        </div>
        <nav className="flex-1 mt-6 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 md:px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                  isActive ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className={`hidden md:block ml-3 font-medium ${isActive ? 'text-blue-600' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full px-4 md:px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
            <LogOut className="w-6 h-6" />
            <span className="hidden md:block ml-3 font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}