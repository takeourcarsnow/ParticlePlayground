"use client";
import React, { useEffect } from 'react';
import { startSimulation } from '../src/sim/main';

export default function Page(){
  useEffect(()=>{ startSimulation(); },[]);
  return (
    <>
      <canvas id="c"></canvas>
      <div id="hud">
        <div className="row">
          <span className="tag">FPS: <b id="fps">0</b></span>
          <span className="tag">Gravity: <b id="gravityVal" className="clickable">40</b></span>
          <span className="tag">Particles: <b id="countVal" className="clickable">1200</b></span>
          <span className="tag">Collisions: <b id="collMode" className="clickable">elastic</b></span>
          <span className="tag">Turbulence: <b id="turbMode" className="clickable">none</b></span>
          <span className="tag">Tilt: <b id="tiltState" className="clickable">off</b></span>
          <span className="tag">Mouse Gravity: <b id="mouseG" className="clickable">on</b></span>
          <span className="tag">Shape: <b id="shapeMode" className="clickable">circle</b></span>
          <span className="tag">Color: <b id="colorMode" className="clickable">velocity</b></span>
          <span className="tag">Boundaries: <b id="boundMode" className="clickable">screen-bounce</b></span>
        </div>
        <div className="row" style={{marginTop:6}}>
          <button className="btn" id="pauseBtn">Pause</button>
          <button className="btn" id="stepBtn" title="Step one frame">Step</button>
          <button className="btn" id="resetBtn" title="Reset particles">Reset</button>
          <button className="btn" id="fullscreenBtn">Fullscreen</button>
        </div>
      </div>

      <button id="togglePanel">☰ Controls <small>(C)</small></button>

      <div id="panel">
        <div id="panelHeader">
          <div className="title">Particle Tilt Playground</div>
          <div className="actions">
            <button id="enableTiltTop" className="primary">Enable Tilt</button>
            <button id="randomize">Randomize</button>
            <button id="presetMenu">Presets</button>
          </div>
        </div>
        <div id="tabs"></div>
        <div id="content"></div>
        <div className="footerNote">Tip: On desktop, click anywhere to set gravity direction. On mobile, tap Enable Tilt.</div>
      </div>

      <div id="tiltPrompt" hidden>
        <div className="bubble">
          <div className="row">
            <div className="flex" style={{flex:1,gap:10}}>
              <span className="chip">📱 Device Tilt</span>
              <div>To roll marbles with your phone, grant motion permission.</div>
            </div>
            <button id="enableTilt" className="primary">Enable Tilt</button>
            <button id="dismissTilt">Dismiss</button>
          </div>
        </div>
      </div>
    </>
  );
}
