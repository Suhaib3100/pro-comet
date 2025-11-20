"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import SetupWizard from "@/components/Setup/SetupWizard";
import type { UIConfigSections } from "@/lib/config/types";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";
import { ChatProvider } from "@/lib/hooks/useChat";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  const [configSections, setConfigSections] = useState<UIConfigSections | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);

      try {
        const res = await fetch("/api/config", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setSetupComplete(Boolean(data?.values?.setupComplete));
          setConfigSections(data?.fields as UIConfigSections);
        } else {
          setSetupComplete(false);
        }
      } catch {
        setSetupComplete(false);
      }
      
      // Removed redirect logic to allow OnboardingFlow to handle auth
    };

    void init();
  }, [pathname, router]);

  if (setupComplete === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!setupComplete && configSections) {
    return <SetupWizard configSections={configSections} />;
  }

  return (
    <ChatProvider>
      <Sidebar>{children}</Sidebar>
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "bg-light-secondary dark:bg-dark-secondary dark:text-white/70 text-black-70 rounded-lg p-4 flex flex-row items-center space-x-2",
          },
        }}
      />
    </ChatProvider>
  );
}
