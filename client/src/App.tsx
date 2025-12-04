import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const showCursor = () => {
      document.documentElement.classList.remove("cursor-hidden");
      clearTimeout(hideTimeout);
    };

    const hideCursor = () => {
      hideTimeout = setTimeout(() => {
        document.documentElement.classList.add("cursor-hidden");
      }, 3000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isOutside = e.clientX < 0 || e.clientY < 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight;
      
      if (isOutside) {
        document.documentElement.classList.add("cursor-hidden");
        clearTimeout(hideTimeout);
      } else {
        showCursor();
        hideCursor();
      }
    };

    const handleActivity = () => {
      showCursor();
      hideCursor();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);
    document.addEventListener("keydown", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      clearTimeout(hideTimeout);
    };
  }, []);

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
