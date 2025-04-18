
import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  CameraOff, 
  HandMetal, 
  Handshake,
  PanelTopOpen, 
  PauseCircle,
  PlayCircle, 
  Repeat 
} from "lucide-react";

interface WebcamFeedProps {
  onGestureDetected?: (gesture: string) => void;
  onCameraStatusChange?: (isActive: boolean) => void;
  onProcessingStatusChange?: (isActive: boolean) => void;
}

const WebcamFeed: React.FC<WebcamFeedProps> = ({ 
  onGestureDetected,
  onCameraStatusChange,
  onProcessingStatusChange
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Start the webcam feed
  const startWebcam = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user" 
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        if (onCameraStatusChange) onCameraStatusChange(true);
      }
    } catch (err) {
      setCameraError("Unable to access camera. Please check permissions.");
      console.error("Error accessing webcam:", err);
    }
  };

  // Stop the webcam feed
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      setIsProcessing(false);
      if (onCameraStatusChange) onCameraStatusChange(false);
      if (onProcessingStatusChange) onProcessingStatusChange(false);
    }
  };

  // Toggle processing state (would trigger actual CV in real implementation)
  const toggleProcessing = () => {
    if (!isProcessing) {
      // In a real implementation, this would start the OpenCV processing
      setIsProcessing(true);
      if (onProcessingStatusChange) onProcessingStatusChange(true);
      simulateGestureDetection();
    } else {
      // Stop the processing
      setIsProcessing(false);
      if (onProcessingStatusChange) onProcessingStatusChange(false);
      setDetectedGesture(null);
    }
  };

  // Simulate gesture detection (in real app this would be done with OpenCV)
  const simulateGestureDetection = () => {
    if (!isProcessing) return;
    
    const gestures = ["HAND_OPEN", "POINTING", "THUMBS_UP", "FIST", "VICTORY"];
    const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
    
    setDetectedGesture(randomGesture);
    if (onGestureDetected) {
      onGestureDetected(randomGesture);
    }
    
    // Continue simulating if still processing
    setTimeout(() => {
      if (isProcessing) {
        simulateGestureDetection();
      }
    }, 2000);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <Card className="w-full max-w-3xl bg-card/80 backdrop-blur-sm border-tech-cyan/20 shadow-lg shadow-tech-glow/10">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-mono flex items-center gap-2">
          <Camera className="h-5 w-5 text-tech-cyan" />
          Vision Input Feed
        </CardTitle>
        <div className="flex items-center gap-2">
          {isStreaming ? (
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              Camera Active
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-slate-500/20 text-slate-400 border-slate-500/30">
              Camera Inactive
            </Badge>
          )}
          
          {isProcessing && (
            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse">
              Processing
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="relative rounded-md overflow-hidden bg-black/30 aspect-video flex items-center justify-center">
          {cameraError && !isStreaming && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 bg-red-900/10">
              <CameraOff className="h-12 w-12 mb-2" />
              <p className="text-sm max-w-[80%] text-center">{cameraError}</p>
            </div>
          )}
          
          {!isStreaming && !cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
              <Camera className="h-12 w-12 mb-2" />
              <p className="text-sm">Camera feed not started</p>
            </div>
          )}
          
          <video 
            ref={videoRef}
            className={`w-full h-full object-cover ${!isStreaming ? 'invisible' : ''}`}
            autoPlay
            playsInline
            muted
          ></video>
          
          {detectedGesture && isProcessing && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-tech-cyan text-black font-mono">
                <HandMetal className="mr-1 h-3 w-3" />
                {detectedGesture}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="mt-3 flex justify-between">
          <div className="flex gap-2">
            {!isStreaming ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={startWebcam}
                className="border-tech-cyan/30 hover:border-tech-cyan hover:bg-tech-cyan/10"
              >
                <Camera className="mr-1 h-4 w-4" />
                Start Camera
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={stopWebcam}
                className="border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400"
              >
                <CameraOff className="mr-1 h-4 w-4" />
                Stop Camera
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!isStreaming}
              onClick={toggleProcessing}
              className={`${isProcessing 
                ? 'border-yellow-500/30 hover:border-yellow-500 hover:bg-yellow-500/10 text-yellow-400' 
                : 'border-green-500/30 hover:border-green-500 hover:bg-green-500/10 text-green-400'}`}
            >
              {isProcessing ? (
                <>
                  <PauseCircle className="mr-1 h-4 w-4" />
                  Pause Processing
                </>
              ) : (
                <>
                  <PlayCircle className="mr-1 h-4 w-4" />
                  Start Processing
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebcamFeed;
