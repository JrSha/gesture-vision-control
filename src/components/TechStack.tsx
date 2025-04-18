
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code2, 
  BrainCircuit, 
  Layers, 
  WifiIcon,
  Github,
  BookOpen
} from "lucide-react";

const TechStack: React.FC = () => {
  return (
    <Card className="w-full max-w-3xl bg-card/80 backdrop-blur-sm border-tech-cyan/20 shadow-lg shadow-tech-glow/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-mono flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-tech-cyan" />
          Technical Implementation
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cv">Computer Vision</TabsTrigger>
            <TabsTrigger value="unity">Unity Integration</TabsTrigger>
            <TabsTrigger value="code">Code Snippets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-3">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-tech-cyan">Vision-Based Gesture Control Pipeline</h3>
              <p className="text-sm text-muted-foreground">
                This system uses computer vision to capture and interpret human gestures, 
                translating them into commands for a robot in a Unity simulation environment. 
                The core technology stack includes:
              </p>
              
              <div className="flex flex-wrap gap-1.5 my-2">
                <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/30">
                  Python
                </Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/30">
                  OpenCV
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-300 border-green-500/30">
                  Unity3D
                </Badge>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-300 border-yellow-500/30">
                  MediaPipe
                </Badge>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-300 border-orange-500/30">
                  WebSockets
                </Badge>
                <Badge variant="outline" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30">
                  C#
                </Badge>
              </div>
            </div>
            
            <div className="bg-background/40 rounded-md p-3 border border-border/50 space-y-2">
              <h3 className="text-sm font-semibold">System Architecture</h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>1. <span className="text-tech-cyan">Camera Input</span> → Captures visual data from the webcam</p>
                <p>2. <span className="text-tech-cyan">Preprocessing</span> → Isolates hand/gesture regions</p>
                <p>3. <span className="text-tech-cyan">Gesture Recognition</span> → Identifies specific hand poses</p>
                <p>4. <span className="text-tech-cyan">Command Mapping</span> → Translates gestures to robot commands</p>
                <p>5. <span className="text-tech-cyan">Unity Communication</span> → Sends commands to Unity via WebSockets</p>
                <p>6. <span className="text-tech-cyan">Robot Simulation</span> → Updates robot behavior in Unity</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cv" className="space-y-3">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-tech-cyan">Computer Vision Implementation</h3>
              <p className="text-sm text-muted-foreground">
                The vision subsystem leverages OpenCV and MediaPipe for robust hand tracking and gesture recognition.
                This allows for real-time detection and interpretation of human gestures.
              </p>
            </div>
            
            <div className="bg-background/40 rounded-md p-3 border border-border/50 space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-semibold">Hand Detection & Tracking</h4>
                <p className="text-xs text-muted-foreground">
                  MediaPipe's Hand solution provides a 21-point landmark model of the hand,
                  enabling precise tracking of fingers and palm positioning.
                </p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-semibold">Gesture Classification</h4>
                <p className="text-xs text-muted-foreground">
                  Using relative positions and angles between hand landmarks, the system
                  can recognize predefined gestures like pointing, open hand, closed fist,
                  and custom poses.
                </p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-semibold">Python Implementation</h4>
                <p className="text-xs text-muted-foreground">
                  The core CV functionality runs in a Python backend, using a combination
                  of OpenCV for image processing and custom gesture recognition algorithms
                  to extract meaningful commands.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="unity" className="space-y-3">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-tech-cyan">Unity Integration</h3>
              <p className="text-sm text-muted-foreground">
                The Unity environment hosts a virtual robot that responds to the detected
                gestures in real-time, demonstrating human-robot interaction capabilities.
              </p>
            </div>
            
            <div className="bg-background/40 rounded-md p-3 border border-border/50 space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-semibold">Communication Protocol</h4>
                <p className="text-xs text-muted-foreground">
                  A WebSocket server in Unity receives gesture commands from the Python
                  backend. This allows for low-latency, bidirectional communication between
                  the vision system and the simulation.
                </p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-semibold">Robot Controller</h4>
                <p className="text-xs text-muted-foreground">
                  A C# script in Unity maps incoming gesture commands to robot actions.
                  Different gestures trigger different behaviors such as movement, 
                  grabbing objects, or performing predefined tasks.
                </p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-semibold">Visual Feedback</h4>
                <p className="text-xs text-muted-foreground">
                  The Unity environment provides visual feedback about recognized gestures
                  and robot responses, enhancing the interactive experience and making the
                  system intuitive to use.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="space-y-3">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-tech-cyan">Implementation Code Snippets</h3>
              <p className="text-sm text-muted-foreground">
                Example code snippets from the core components of the system.
              </p>
            </div>
            
            <div className="bg-black/80 rounded-md p-3 border border-tech-cyan/20 font-mono text-xs overflow-x-auto">
              <div className="text-blue-400 mb-1"># Python: Hand Detection with MediaPipe</div>
              <pre className="text-green-300">
{`import cv2
import mediapipe as mp

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

def detect_hands(image):
    # Convert BGR to RGB
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # Process the image and detect hands
    results = hands.process(image_rgb)
    return results.multi_hand_landmarks`}
              </pre>
            </div>
            
            <div className="bg-black/80 rounded-md p-3 border border-tech-cyan/20 font-mono text-xs overflow-x-auto">
              <div className="text-blue-400 mb-1"># Python: WebSocket Server for Unity Communication</div>
              <pre className="text-green-300">
{`import asyncio
import websockets
import json

connected_clients = set()

async def send_gesture(websocket, gesture):
    message = json.dumps({"gesture": gesture})
    await websocket.send(message)

async def handle_connection(websocket, path):
    global connected_clients
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            # Handle incoming messages from Unity
            data = json.loads(message)
            print(f"Received from Unity: {data}")
    finally:
        connected_clients.remove(websocket)`}
              </pre>
            </div>
            
            <div className="bg-black/80 rounded-md p-3 border border-tech-cyan/20 font-mono text-xs overflow-x-auto">
              <div className="text-blue-400 mb-1">// C#: Unity Robot Controller</div>
              <pre className="text-yellow-300">
{`using System;
using UnityEngine;
using NativeWebSocket;

public class RobotController : MonoBehaviour 
{
    private WebSocket websocket;
    private RobotMovement robotMovement;
    
    async void Start() 
    {
        robotMovement = GetComponent<RobotMovement>();
        websocket = new WebSocket("ws://localhost:8765");
        
        websocket.OnMessage += (bytes) => {
            var message = System.Text.Encoding.UTF8.GetString(bytes);
            var data = JsonUtility.FromJson<GestureCommand>(message);
            HandleGestureCommand(data.gesture);
        };
        
        await websocket.Connect();
    }
    
    void HandleGestureCommand(string gesture) 
    {
        switch(gesture) {
            case "HAND_OPEN":
                robotMovement.StopMovement();
                break;
            case "POINTING":
                robotMovement.MoveForward();
                break;
            // Additional gestures handled here
        }
    }
}`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-3">
          <a 
            href="#" 
            className="text-xs flex items-center text-tech-cyan hover:text-tech-cyan/80 transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            View Full Documentation
          </a>
          
          <a 
            href="#" 
            className="text-xs flex items-center text-tech-cyan hover:text-tech-cyan/80 transition-colors"
          >
            <Github className="h-3.5 w-3.5 mr-1" />
            GitHub Repository
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechStack;
