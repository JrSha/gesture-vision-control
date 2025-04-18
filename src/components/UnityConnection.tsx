
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LinkIcon, 
  Link2Off, 
  Server, 
  RefreshCw, 
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";

interface UnityConnectionProps {
  onConnectionStatusChange?: (isConnected: boolean) => void;
  sendGestureCommand?: (gesture: string) => void;
  latestGesture?: string | null;
}

const UnityConnection: React.FC<UnityConnectionProps> = ({ 
  onConnectionStatusChange,
  sendGestureCommand,
  latestGesture
}) => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [ipAddress, setIpAddress] = useState<string>('127.0.0.1');
  const [port, setPort] = useState<string>('8080');
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [connectionLog, setConnectionLog] = useState<string[]>([]);

  // Simulate connection to Unity
  const connectToUnity = () => {
    // In a real implementation, this would establish a WebSocket connection
    setConnectionStatus('connecting');
    addToLog(`Attempting connection to Unity at ${ipAddress}:${port}...`);
    
    // Simulate connection delay
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setConnectionStatus('connected');
        if (onConnectionStatusChange) onConnectionStatusChange(true);
        addToLog(`Connection established successfully.`);
      } else {
        setConnectionStatus('disconnected');
        if (onConnectionStatusChange) onConnectionStatusChange(false);
        addToLog(`Connection failed. Please check Unity server is running.`);
      }
    }, 1500);
  };

  // Disconnect from Unity
  const disconnectFromUnity = () => {
    // In a real implementation, this would close the WebSocket
    setConnectionStatus('disconnected');
    if (onConnectionStatusChange) onConnectionStatusChange(false);
    addToLog(`Disconnected from Unity server.`);
  };

  // Add message to log
  const addToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConnectionLog(prev => [...prev.slice(-9), `[${timestamp}] ${message}`]);
  };

  // Handle new gesture command
  useEffect(() => {
    if (connectionStatus === 'connected' && latestGesture && latestGesture !== lastCommand) {
      setLastCommand(latestGesture);
      addToLog(`Sending command to Unity: ${latestGesture}`);
      
      // In a real implementation, this would send the command through WebSocket
      if (sendGestureCommand) {
        sendGestureCommand(latestGesture);
      }
    }
  }, [latestGesture, connectionStatus, lastCommand, sendGestureCommand]);

  return (
    <Card className="w-full max-w-3xl bg-card/80 backdrop-blur-sm border-tech-cyan/20 shadow-lg shadow-tech-glow/10">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-mono flex items-center gap-2">
          <Server className="h-5 w-5 text-tech-cyan" />
          Unity Connection
        </CardTitle>
        
        <div>
          {connectionStatus === 'disconnected' && (
            <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
              <XCircle className="mr-1 h-3 w-3" />
              Disconnected
            </Badge>
          )}
          
          {connectionStatus === 'connecting' && (
            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
              Connecting
            </Badge>
          )}
          
          {connectionStatus === 'connected' && (
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Connected
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="IP Address"
                className="flex-1 h-9 px-3 py-2 bg-background/50 border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-tech-cyan"
                disabled={connectionStatus !== 'disconnected'}
              />
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="Port"
                className="w-20 h-9 px-3 py-2 bg-background/50 border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-tech-cyan"
                disabled={connectionStatus !== 'disconnected'}
              />
            </div>
            
            <div className="border border-border/50 rounded-md bg-background/30 h-[180px] overflow-y-auto mb-3 p-2 font-mono text-xs">
              {connectionLog.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <AlertCircle className="h-5 w-5 mb-1" />
                  <span>No connection activity</span>
                </div>
              ) : (
                <div className="space-y-1">
                  {connectionLog.map((log, index) => (
                    <div key={index} className="text-muted-foreground">{log}</div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              {connectionStatus === 'disconnected' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={connectToUnity}
                  className="border-tech-cyan/30 hover:border-tech-cyan hover:bg-tech-cyan/10"
                >
                  <LinkIcon className="mr-1 h-4 w-4" />
                  Connect to Unity
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disconnectFromUnity}
                  className="border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400"
                >
                  <Link2Off className="mr-1 h-4 w-4" />
                  Disconnect
                </Button>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => addToLog("Connection status checked.")}
                className="border-slate-500/30 hover:border-slate-400 hover:bg-slate-500/10"
              >
                <RefreshCw className="mr-1 h-4 w-4" />
                Check Status
              </Button>
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="border border-border/50 rounded-md bg-background/30 h-full p-3 flex flex-col">
              <h3 className="text-sm font-medium mb-2 text-tech-cyan">Current Command</h3>
              
              {lastCommand ? (
                <div className="flex flex-col items-center justify-center flex-1 px-3 py-2 bg-tech-teal/10 rounded-md border border-tech-cyan/20">
                  <Badge className="mb-2 bg-tech-cyan text-black font-mono">
                    {lastCommand}
                  </Badge>
                  <div className="text-xs text-center text-muted-foreground">
                    {connectionStatus === 'connected' ? 
                      'Command sent to Unity' : 
                      'Waiting for connection...'}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-muted-foreground">
                  <span className="text-sm">No commands sent</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnityConnection;
