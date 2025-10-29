'use client';

import BrowserLayout from './Browser/BrowserLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="lg:pl-20 bg-light-primary dark:bg-dark-primary min-h-screen">
      <BrowserLayout>
        <div className="max-w-screen-lg lg:mx-auto mx-4">{children}</div>
      </BrowserLayout>
    </main>
  );
};

export default Layout;
