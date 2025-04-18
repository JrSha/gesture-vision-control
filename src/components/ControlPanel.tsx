
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, 
  Eye, 
  Gauge, 
  Sliders, 
  HandMetal,
  Code,
  Save,
  Upload
} from "lucide-react";

interface ControlPanelProps {
  cameraActive: boolean;
  processingActive: boolean;
  unityConnected: boolean;
  lastDetectedGesture: string | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  cameraActive,
  processingActive,
  unityConnected,
  lastDetectedGesture
}) => {
  const [sensitivity, setSensitivity] = useState<number[]>([70]);
  const [detectionThreshold, setDetectionThreshold] = useState<number[]>([65]);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [handTrackingEnabled, setHandTrackingEnabled] = useState(true);
  const [gestureTrackingEnabled, setGestureTrackingEnabled] = useState(true);
  
  // These would be real metrics in a full implementation
  const systemStatus = {
    fps: Math.floor(Math.random() * 30) + 30,
    latency: Math.floor(Math.random() * 20) + 10,
    cpuUsage: Math.floor(Math.random() * 30) + 10,
    recognizedGestures: ["HAND_OPEN", "POINTING", "THUMBS_UP", "FIST", "VICTORY"],
  };

  // Generate stats based on tracking state
  const getTrackingStats = () => {
    if (!processingActive) return [];
    
    return [
      { label: "FPS", value: `${systemStatus.fps}`, status: systemStatus.fps > 50 ? "good" : systemStatus.fps > 30 ? "medium" : "poor" },
      { label: "Latency", value: `${systemStatus.latency}ms`, status: systemStatus.latency < 20 ? "good" : systemStatus.latency < 40 ? "medium" : "poor" },
      { label: "CPU", value: `${systemStatus.cpuUsage}%`, status: systemStatus.cpuUsage < 20 ? "good" : systemStatus.cpuUsage < 50 ? "medium" : "poor" }
    ];
  };

  const handleSaveSettings = () => {
    // This would save settings to localStorage or a backend in a real implementation
    console.log("Settings saved", {
      sensitivity: sensitivity[0],
      detectionThreshold: detectionThreshold[0],
      debugMode,
      handTrackingEnabled,
      gestureTrackingEnabled
    });
  };

  const handleExportConfig = () => {
    // This would export settings as a JSON file in a real implementation
    const config = {
      sensitivity: sensitivity[0],
      detectionThreshold: detectionThreshold[0],
      debugMode,
      handTrackingEnabled,
      gestureTrackingEnabled,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vision-control-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-3xl bg-card/80 backdrop-blur-sm border-tech-cyan/20 shadow-lg shadow-tech-glow/10">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-mono flex items-center gap-2">
          <Settings className="h-5 w-5 text-tech-cyan" />
          Control Panel
        </CardTitle>
        
        <div className="flex space-x-2">
          <Badge variant={cameraActive ? "outline" : "secondary"} className={cameraActive ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : ""}>
            <Eye className="mr-1 h-3 w-3" />
            Camera
          </Badge>
          
          <Badge variant={processingActive ? "outline" : "secondary"} className={processingActive ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : ""}>
            <Gauge className="mr-1 h-3 w-3" />
            Processing
          </Badge>
          
          <Badge variant={unityConnected ? "outline" : "secondary"} className={unityConnected ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}>
            <Code className="mr-1 h-3 w-3" />
            Unity
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* System Status */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">System Status</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {getTrackingStats().map((stat, index) => (
                <div key={index} className="bg-background/40 p-2 rounded-md border border-border/50">
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-mono">{stat.value}</div>
                    <div className={`h-2 w-2 rounded-full ${
                      stat.status === "good" ? "bg-green-500" : 
                      stat.status === "medium" ? "bg-yellow-500" : 
                      "bg-red-500"
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Parameter Controls */}
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Detection Parameters</h3>
            <div className="space-y-3 mb-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Sensitivity</span>
                  <span className="font-mono">{sensitivity}%</span>
                </div>
                <Slider 
                  value={sensitivity}
                  onValueChange={setSensitivity}
                  className="my-1.5"
                  max={100}
                  step={1}
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Detection Threshold</span>
                  <span className="font-mono">{detectionThreshold}%</span>
                </div>
                <Slider 
                  value={detectionThreshold}
                  onValueChange={setDetectionThreshold}
                  className="my-1.5"
                  max={100}
                  step={1}
                />
              </div>
            </div>
            
            {/* Additional Settings */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center">
                  <HandMetal className="h-4 w-4 mr-2 text-tech-cyan" />
                  Hand Tracking
                </label>
                <Switch 
                  checked={handTrackingEnabled}
                  onCheckedChange={setHandTrackingEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center">
                  <Sliders className="h-4 w-4 mr-2 text-tech-cyan" />
                  Gesture Recognition
                </label>
                <Switch 
                  checked={gestureTrackingEnabled}
                  onCheckedChange={setGestureTrackingEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center">
                  <Code className="h-4 w-4 mr-2 text-tech-cyan" />
                  Debug Mode
                </label>
                <Switch 
                  checked={debugMode}
                  onCheckedChange={setDebugMode}
                />
              </div>
            </div>
          </div>
          
          {/* Current Gesture Panel */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Current Gesture</h3>
            <div className="border border-border/50 rounded-md bg-background/30 h-[160px] p-3 flex flex-col items-center justify-center mb-3">
              {lastDetectedGesture ? (
                <>
                  <div className="text-6xl mb-2">
                    {lastDetectedGesture === "HAND_OPEN" && "👋"}
                    {lastDetectedGesture === "POINTING" && "👆"}
                    {lastDetectedGesture === "THUMBS_UP" && "👍"}
                    {lastDetectedGesture === "FIST" && "✊"}
                    {lastDetectedGesture === "VICTORY" && "✌️"}
                  </div>
                  <Badge className="bg-tech-cyan text-black font-mono">
                    {lastDetectedGesture}
                  </Badge>
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  <HandMetal className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <span className="text-sm">No gesture detected</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSaveSettings}
                className="border-tech-cyan/30 hover:border-tech-cyan hover:bg-tech-cyan/10"
              >
                <Save className="mr-1 h-4 w-4" />
                Save Settings
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportConfig}
                className="border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-500/10 text-indigo-400"
              >
                <Upload className="mr-1 h-4 w-4" />
                Export Config
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
