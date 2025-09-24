import React from 'react';
import Header from './Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-white bg-grid-black/[0.05]">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-100 -z-10" />
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="absolute bottom-0 w-full">
        <MadeWithApplaa />
      </footer>
    </div>
  );
};

export default AppLayout;