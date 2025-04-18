
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Move, 
  HandMetal, 
  RotateCcw,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Pause
} from "lucide-react";

interface RobotVisualizationProps {
  latestGesture: string | null;
}

const RobotVisualization: React.FC<RobotVisualizationProps> = ({ 
  latestGesture 
}) => {
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  
  // Map gestures to robot actions
  useEffect(() => {
    if (!latestGesture) return;
    
    setIsActive(true);
    
    // Process the gesture and update robot position
    switch (latestGesture) {
      case "HAND_OPEN":
        // Stop movement
        setLastAction("STOP");
        break;
      case "POINTING":
        // Move forward
        setRobotPosition(prev => ({ 
          ...prev, 
          y: Math.max(prev.y - 20, -80) 
        }));
        setLastAction("MOVE FORWARD");
        break;
      case "THUMBS_UP":
        // Rotate clockwise
        setRobotPosition(prev => ({ 
          ...prev, 
          rotation: prev.rotation + 45 
        }));
        setLastAction("ROTATE CLOCKWISE");
        break;
      case "FIST":
        // Move backward
        setRobotPosition(prev => ({ 
          ...prev, 
          y: Math.min(prev.y + 20, 80) 
        }));
        setLastAction("MOVE BACKWARD");
        break;
      case "VICTORY":
        // Strafe left/right
        setRobotPosition(prev => ({ 
          ...prev, 
          x: prev.x === 0 ? -40 : prev.x < 0 ? 40 : 0 
        }));
        setLastAction("STRAFE");
        break;
      default:
        break;
    }
  }, [latestGesture]);

  // Get the appropriate icon for the current action
  const getActionIcon = () => {
    switch (lastAction) {
      case "STOP":
        return <Pause className="h-6 w-6 text-yellow-400" />;
      case "MOVE FORWARD":
        return <ArrowUp className="h-6 w-6 text-green-400" />;
      case "ROTATE CLOCKWISE":
        return <RotateCcw className="h-6 w-6 text-blue-400" />;
      case "MOVE BACKWARD":
        return <ArrowDown className="h-6 w-6 text-red-400" />;
      case "STRAFE":
        return robotPosition.x < 0 
          ? <ArrowLeft className="h-6 w-6 text-purple-400" />
          : <ArrowRight className="h-6 w-6 text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl bg-card/80 backdrop-blur-sm border-tech-cyan/20 shadow-lg shadow-tech-glow/10">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-mono flex items-center gap-2">
          <Bot className="h-5 w-5 text-tech-cyan" />
          Robot Control
        </CardTitle>
        {lastAction && (
          <Badge variant="outline" className="bg-tech-cyan/20 text-tech-cyan border-tech-cyan/30">
            <Move className="mr-1 h-3 w-3" />
            {lastAction}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <div className="relative rounded-md overflow-hidden bg-black/50 aspect-video flex items-center justify-center">
          {/* Robot visualization area */}
          <div className="absolute w-full h-full border-2 border-tech-cyan/30 rounded-md">
            {/* Grid lines for visual reference */}
            <div className="absolute w-full h-[1px] top-1/2 bg-tech-cyan/30"></div>
            <div className="absolute h-full w-[1px] left-1/2 bg-tech-cyan/30"></div>
            
            {/* Coordinate markers */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs text-tech-cyan/70 mt-1">Y+</div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-tech-cyan/70 mb-1">Y-</div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-xs text-tech-cyan/70 ml-1">X-</div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs text-tech-cyan/70 mr-1">X+</div>
            
            {/* Robot representation */}
            <div 
              className={`absolute w-24 h-24 bg-tech-cyan/40 border-2 border-tech-cyan rounded-md flex items-center justify-center shadow-md shadow-tech-cyan/30 ${isActive ? 'animate-pulse' : ''}`}
              style={{ 
                top: `calc(50% + ${robotPosition.y}px)`, 
                left: `calc(50% + ${robotPosition.x}px)`,
                transform: `translate(-50%, -50%) rotate(${robotPosition.rotation}deg)`,
                transition: 'all 0.3s ease-out'
              }}
            >
              <Bot className="h-12 w-12 text-tech-cyan" />
              {/* Direction indicator */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-tech-cyan rounded-full"></div>
            </div>
            
            {/* Robot trail/path visualization (optional) */}
            {isActive && (
              <div 
                className="absolute w-6 h-6 rounded-full bg-tech-cyan/10 border border-tech-cyan/20"
                style={{ 
                  top: `calc(50% + ${robotPosition.y}px)`, 
                  left: `calc(50% + ${robotPosition.x}px)`,
                  transform: `translate(-50%, -50%)`,
                  transition: 'all 0.1s ease-out'
                }}
              ></div>
            )}
          </div>
          
          {/* Current action display */}
          {lastAction && (
            <div className="absolute top-3 right-3 flex items-center">
              <Badge className="bg-black/50 text-tech-cyan font-mono border border-tech-cyan/30">
                {getActionIcon()}
                {latestGesture}
              </Badge>
            </div>
          )}
          
          {/* Instructions */}
          {!isActive && (
            <div className="text-center text-tech-cyan max-w-xs z-10">
              <HandMetal className="h-10 w-10 mx-auto mb-2 text-tech-cyan opacity-60" />
              <p className="text-sm">Use hand gestures to control the robot:</p>
              <ul className="text-xs mt-2 space-y-1 text-left mx-auto w-fit">
                <li className="flex items-center gap-1"><span className="text-lg">👋</span> HAND_OPEN: Stop movement</li>
                <li className="flex items-center gap-1"><span className="text-lg">👆</span> POINTING: Move forward</li>
                <li className="flex items-center gap-1"><span className="text-lg">👍</span> THUMBS_UP: Rotate clockwise</li>
                <li className="flex items-center gap-1"><span className="text-lg">✊</span> FIST: Move backward</li>
                <li className="flex items-center gap-1"><span className="text-lg">✌️</span> VICTORY: Strafe left/right</li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="mt-3 text-xs text-tech-cyan/70">
          <p>Perform gestures in the camera feed to control the robot in real-time</p>
          <p className="mt-1 text-tech-cyan/50">Current position: X: {robotPosition.x}, Y: {robotPosition.y}, Rotation: {robotPosition.rotation}°</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RobotVisualization;
