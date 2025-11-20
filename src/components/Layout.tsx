'use client';

import BrowserLayout from './Browser/BrowserLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="lg:pl-20 bg-black dark:bg-black min-h-screen bg-gradient-mesh pb-20 lg:pb-0">
      <BrowserLayout>
        <div className="max-w-screen-lg lg:mx-auto mx-3 sm:mx-4">{children}</div>
      </BrowserLayout>
    </main>
  );
};

export default Layout;
