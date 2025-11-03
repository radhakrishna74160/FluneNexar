import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import Login from "@/pages/Login";
import NameManager from "@/pages/NameManager";
import Chat from "@/pages/Chat";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasNamedManager, setHasNamedManager] = useState(false);

  if (!isAuthenticated) {
    return <Login />;
  }

  if (!hasNamedManager) {
    return <NameManager onContinue={() => setHasNamedManager(true)} />;
  }

  return (
    <Switch>
      <Route path="/" component={Chat} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
