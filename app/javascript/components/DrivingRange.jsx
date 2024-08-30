import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-procedural-textures';

const DrivingRange = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new BABYLON.Engine(canvasRef.current, true);
      const createScene = () => {
        const scene = new BABYLON.Scene(engine);
        
        // Camera
        const camera = new BABYLON.ArcRotateCamera(
          "camera",
          -Math.PI / 4, // alpha (rotation around y-axis)
          Math.PI / 3,  // beta (rotation around x-axis)
          250,          // radius
          new BABYLON.Vector3(0, 0, 0), // target
          scene
        );
        camera.attachControl(canvasRef.current, true);
        
        // Light
        new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        
        // Ground (driving range)
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 400}, scene);
        const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.6, 0.2);
        ground.material = groundMaterial;

        // Create fairway lines
        const lineSpacing = 5; // Space between lines
        const lineWidth = 0.2;
        const lineColor = new BABYLON.Color3(0.18, 0.55, 0.18);

        for (let z = -200; z <= 200; z += lineSpacing) {
          const line = BABYLON.MeshBuilder.CreateBox("line", {height: 0.1, width: lineWidth, depth: 400}, scene);
          line.position.y = 0.05; // Slightly above the ground to prevent z-fighting
          line.position.z = z;
          line.material = new BABYLON.StandardMaterial("lineMat", scene);
          line.material.diffuseColor = lineColor;
        }
        
        // Putting green (on the side of the fairway)
        const puttingGreen = BABYLON.MeshBuilder.CreateDisc("puttingGreen", {radius: 20}, scene);
        puttingGreen.rotation.x = Math.PI / 2;
        puttingGreen.position.y = 0.05; // Slightly above the ground
        puttingGreen.position.x = 60; // Positioned at the side of the driving range
        const puttingGreenMaterial = new BABYLON.StandardMaterial("puttingGreenMat", scene);
        puttingGreenMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.8, 0.1);
        puttingGreen.material = puttingGreenMaterial;

        // Flag pin (on the side with the green)
        const flagPole = BABYLON.MeshBuilder.CreateCylinder("flagPole", {height: 5, diameter: 0.1}, scene);
        flagPole.position = new BABYLON.Vector3(60, 2.5, 0);
        const flagPoleMaterial = new BABYLON.StandardMaterial("flagPoleMat", scene);
        flagPoleMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
        flagPole.material = flagPoleMaterial;

        // Flag (on the side with the green)
        const flag = BABYLON.MeshBuilder.CreatePlane("flag", {width: 1, height: 0.6}, scene);
        flag.position = new BABYLON.Vector3(60.5, 4.7, 0);
        flag.rotation.y = Math.PI / 2;
        const flagMaterial = new BABYLON.StandardMaterial("flagMat", scene);
        flagMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
        flag.material = flagMaterial;

        // Golf ball
        const ball = BABYLON.MeshBuilder.CreateSphere("ball", {diameter: 0.0427}, scene);
        ball.position.y = 0.0213;

        return scene;
      };

      const scene = createScene();

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });

      return () => {
        scene.dispose();
        engine.dispose();
      };
    }
  }, []);

  return (
    <div>
      <p>Driving Range Component</p>
      <canvas ref={canvasRef} style={{width: '100%', height: '600px'}} />
    </div>
  );
};

export default DrivingRange;