import { 
  Home, 
  Search, 
  ShoppingCart, 
  Bell, 
  User, 
  ChevronDown, 
  LogOut, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  MenuIcon } from 'lucide-react';
import Header from '../../components/dashboardComponent/Header';
import LeftsideNavbar from '../../components/dashboardComponent/LeftsideNavbar';

import { useSelector } from 'react-redux';


export default function Dashboard() {

  const { user,  } = useSelector(state => state.auth);
  
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      {/* Body Layout */}
      <div className="flex flex-1 min-h-0">

        {/* sidebar navigation */}
        <LeftsideNavbar  user={user}/>

        {/* Main Content */}
        <main className="flex flex-col md:px-10 px-4 py-8 bg-blue-50 min-h-0 w-full">
          <h1 className="text-3xl font-bold text-black mb-4 md:mt-0 mt-3">Home</h1>

          <div className="w-full ">
            <div className="hero flex flex-col w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6 shadow">
              <h2 className="md:text-xl text-base font-semibold mb-2">Welcome, Super Admin!</h2>
              <p className="mb-2 md:text-base text-xs">You have full access to all system features and can manage all users and content.</p>
              <span className="bg-white/20 py-1 px-4 rounded-lg md:text-sm text-xs font-semibold w-40">Role: SUPERADMIN</span>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-xl p-6 shadow max-w-3xl">
            <h3 className="text-lg font-semibold mb-3">Your Capabilities</h3>
            <ul className="grid md:grid-cols-2 md:text-base text-xs gap-2 text-[#497488]">
              <li className="flex items-center"><span className="text-green-500 mr-1">✓</span>Create, edit, delete all admins</li>
              <li className="flex items-center"><span className="text-green-500 mr-1">✓</span>Full content management access</li>
              <li className="flex items-center"><span className="text-green-500 mr-1">✓</span>Create, edit, delete all content creators</li>
              <li className="flex items-center"><span className="text-green-500 mr-1">✓</span>System-wide administrative privileges</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}


