import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import WebcamFeed from "@/components/WebcamFeed";
import UnityConnection from "@/components/UnityConnection";
import ControlPanel from "@/components/ControlPanel";
import TechStack from "@/components/TechStack";

const Index = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [processingActive, setProcessingActive] = useState(false);
  const [unityConnected, setUnityConnected] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState<string | null>(null);

  // Handle gesture detection from webcam component
  const handleGestureDetected = (gesture: string) => {
    setDetectedGesture(gesture);
  };

  // Simulated function that would send commands to Unity in a real implementation
  const sendGestureCommand = (gesture: string) => {
    console.log(`Sending gesture command to Unity: ${gesture}`);
    // In a real implementation, this would communicate with Unity via WebSockets
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/5 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-tech-cyan font-mono border-b border-tech-cyan/20 pb-2">
              Vision Input
            </h2>
            <WebcamFeed 
              onGestureDetected={handleGestureDetected}
              onCameraStatusChange={setCameraActive}
              onProcessingStatusChange={setProcessingActive}
            />
          </div>
          <div className="md:w-2/5 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-tech-cyan font-mono border-b border-tech-cyan/20 pb-2">
              Unity Output
            </h2>
            <UnityConnection 
              onConnectionStatusChange={setUnityConnected}
              sendGestureCommand={sendGestureCommand}
              latestGesture={detectedGesture}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4 text-tech-cyan font-mono border-b border-tech-cyan/20 pb-2">
            System Controls
          </h2>
          <ControlPanel 
            cameraActive={cameraActive}
            processingActive={processingActive}
            unityConnected={unityConnected}
            lastDetectedGesture={detectedGesture}
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4 text-tech-cyan font-mono border-b border-tech-cyan/20 pb-2">
            Technical Details
          </h2>
          <TechStack />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
