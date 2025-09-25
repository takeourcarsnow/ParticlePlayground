import { Settings } from './config';
import { State } from './state';
import { DEG } from './utils';
import { rebuildParticles } from './particles';
import { updateHUD } from './hud';

export function setMouseGravityFromPoint(px:number,py:number){
  const cx = (State.canvas?.clientWidth||0)/2, cy=(State.canvas?.clientHeight||0)/2; let dx = (px-cx), dy=(py-cy); const len=Math.hypot(dx,dy)||1; State.mouseGravity.x=dx/len; State.mouseGravity.y=dy/len; }
function enableTiltRequest(){ function onGranted(){ State.tiltEnabled=true; updateHUD(); if(State.els.tiltPrompt) State.els.tiltPrompt.hidden=true; }
  if(typeof DeviceMotionEvent!=='undefined' && (DeviceMotionEvent as any).requestPermission){ (DeviceMotionEvent as any).requestPermission().then((res:string)=>{ if(res==='granted') onGranted(); else alert('Motion permission denied.'); }).catch(()=>alert('Motion permission request failed.')); } else { onGranted(); } }
function onDeviceOrientation(e:DeviceOrientationEvent){ if(!State.tiltEnabled) return; const beta=(e.beta||0)*DEG; const gamma=(e.gamma||0)*DEG; let gx=Math.sin(gamma); let gy=Math.sin(beta); const orient=(screen.orientation && (screen.orientation as any).angle) || (window as any).orientation || 0; const a=(orient||0)*DEG; const rx=gx*Math.cos(-a) - gy*Math.sin(-a); const ry=gx*Math.sin(-a) + gy*Math.cos(-a); const len=Math.hypot(rx,ry)||1; State.gDir.x=rx/len; State.gDir.y=ry/len; }
function initPointer(){ const pointerEl=State.canvas!; function setPointer(e:any,type:string){ const rect=State.canvas!.getBoundingClientRect(); let x:number,y:number,id:number|null=null; if(e.touches && e.touches[0]){ const t=e.touches[0]; id=t.identifier; x=t.clientX-rect.left; y=t.clientY-rect.top; } else { x=e.clientX-rect.left; y=e.clientY-rect.top; } State.pointer.dx=x-State.pointer.lastX; State.pointer.dy=y-State.pointer.lastY; State.pointer.lastX=State.pointer.x=x; State.pointer.lastY=State.pointer.y=y; if(type==='down'){ State.pointer.down=true; State.pointer.active=true; State.pointer.id=id; if(Settings.controls.mouseSetsGravity){ setMouseGravityFromPoint(x,y);} } else if(type==='up'){ State.pointer.down=false; State.pointer.id=null; State.pointer.dx=0; State.pointer.dy=0; } }
  pointerEl.addEventListener('pointerdown',(e)=>{ State.canvas!.setPointerCapture((e as PointerEvent).pointerId); setPointer(e,'down'); });
  pointerEl.addEventListener('pointermove',e=>setPointer(e,'move'));
  pointerEl.addEventListener('pointerup',e=>setPointer(e,'up'));
  pointerEl.addEventListener('pointercancel',e=>setPointer(e,'up'));
  State.canvas!.addEventListener('click',(e:any)=>{ if(Settings.controls.mouseSetsGravity){ setMouseGravityFromPoint(e.clientX,e.clientY); } }); }
function initKeyboard(){ window.addEventListener('keydown',(e)=>{ if(e.key===' '){ State.running=!State.running; if(State.hud.pauseBtn) State.hud.pauseBtn.textContent=State.running?'Pause':'Resume'; e.preventDefault(); } if(e.key==='c'||e.key==='C'){ State.els.panel?.classList.toggle('hidden'); } if(e.key==='g'||e.key==='G'){ Settings.controls.mouseSetsGravity=!Settings.controls.mouseSetsGravity; updateHUD(); } if(e.key==='r'||e.key==='R'){ rebuildParticles(false); } if(e.key==='f'||e.key==='F'){ Settings.visuals.showHUD=!Settings.visuals.showHUD; if(State.hud.root) State.hud.root.style.display=Settings.visuals.showHUD?'block':'none'; } }); }
export function initInput(){ if(State.haveDeviceOrientation && State.els.tiltPrompt){ setTimeout(()=>{ if(State.els.tiltPrompt) State.els.tiltPrompt.hidden=false; },600); }
  State.els.tiltBtn?.addEventListener('click',enableTiltRequest); State.els.tiltBtnTop?.addEventListener('click',enableTiltRequest); State.els.dismissTilt?.addEventListener('click',()=>{ if(State.els.tiltPrompt) State.els.tiltPrompt.hidden=true; }); window.addEventListener('deviceorientation', onDeviceOrientation,true); initPointer(); initKeyboard(); setMouseGravityFromPoint((State.canvas?.clientWidth||0)/2,(State.canvas?.clientHeight||0)/2); }
