
import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "min-h-screen w-full bg-gradient-to-b from-tech-dark to-tech-blue/90 flex flex-col",
        className
      )}
    >
      <header className="w-full border-b border-tech-cyan/20 backdrop-blur-sm bg-black/20 py-3 px-4 md:px-6">
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-mono font-bold text-xl text-tech-cyan flex items-center">
              <span className="bg-tech-cyan text-tech-dark px-2 py-0.5 rounded mr-2 text-sm">RV</span>
              Robot Vision
            </div>
            <div className="ml-4 text-xs text-tech-cyan/60 border-l border-tech-cyan/20 pl-4 hidden md:block">
              Human-Robot Interaction through Gesture Recognition
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-muted-foreground">System Active</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-6 gap-6">
        {children}
      </main>
      
      <footer className="w-full border-t border-tech-cyan/20 backdrop-blur-sm bg-black/20 py-3 px-4 md:px-6">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <div>
            Vision-Based Gesture Control for Human-Robot Interaction
          </div>
          <div>
            OpenCV • MediaPipe • Python • WebSockets
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
