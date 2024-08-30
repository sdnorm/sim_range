import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const DrivingRange = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new BABYLON.Engine(canvasRef.current, true);
      const createScene = () => {
        const scene = new BABYLON.Scene(engine);
        
        // Camera
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvasRef.current, true);
        
        // Light
        new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        
        // Ground (driving range)
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 400}, scene);
        const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.6, 0.2);
        ground.material = groundMaterial;
        
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