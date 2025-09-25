export interface Particle {
  x: number; y: number; vx: number; vy: number; r: number; m: number; heat: number; color: string;
}
export interface PointerState { x:number; y:number; dx:number; dy:number; down:boolean; id:number|null; lastX:number; lastY:number; active:boolean; }
export interface HUDRefs { root:HTMLElement|null; fps:HTMLElement|null; collMode:HTMLElement|null; turbMode:HTMLElement|null; tiltState:HTMLElement|null; mouseG:HTMLElement|null; gravityVal:HTMLElement|null; countVal:HTMLElement|null; shapeMode:HTMLElement|null; colorMode:HTMLElement|null; boundMode:HTMLElement|null; pauseBtn:HTMLButtonElement|null; stepBtn:HTMLButtonElement|null; resetBtn:HTMLButtonElement|null; fullscreenBtn:HTMLButtonElement|null; }
export interface ElementRefs { panel:HTMLElement|null; tabsEl:HTMLElement|null; contentEl:HTMLElement|null; togglePanel:HTMLElement|null; randomizeBtn:HTMLElement|null; presetMenuBtn:HTMLElement|null; tiltPrompt:HTMLElement|null; tiltBtn:HTMLElement|null; tiltBtnTop:HTMLElement|null; dismissTilt:HTMLElement|null; }
