export interface SettingsType {
  particles: {
    count:number; radiusMin:number; radiusMax:number; uniformSize:boolean; shape:'circle'|'square'|'triangle'; colorMode:'solid'|'velocity'|'heat'; solidColor:string; palette:'plasma'|'cool'|'fire'|'aurora'; blend:string; velocityColorScale:number; opacity:number; massMode:'constant'|'byArea'|'inverse'|'random'; mass:number; randomMassMin:number; randomMassMax:number;
  };
  physics: { gravity:number; tiltSensitivity:number; airDrag:number; windX:number; windY:number; boundaries:string; restitution:number; wallFriction:number; particleFriction:number; container:{cx:number; cy:number; radiusN:number; sizeN:number}; };
  collisions: { mode:'elastic'|'soft'|'inelastic'|'none'; softness:number; inelasticity:number; enable:boolean; adapt:boolean };
  forces: { turbulenceMode:string; amplitude:number; scale:number; timeScale:number; curlStrength:number; vortexX:number; vortexY:number; vortexStrength:number; vortexFalloff:number; vortexCW:boolean; windVar:number; windGust:number; jetsAngle:number; jetsSpacing:number; swirlSpacing:number; swirlFalloff:number; swirlAlt:boolean; wellsCount:number; wellsStrength:number; wellsFalloff:number; wellsSpin:number; wellsMove:boolean; wellsRepel:boolean; wellsSeed:number; };
  pointer: { enabled:boolean; tool:string; strength:number; radius:number; };
  visuals: { trail:number; background:string; showHUD:boolean; wireframe:boolean; showContainer:boolean };
  performance: { simSpeed:number; substeps:number; adaptive:boolean; lowFpsThreshold:number; maxParticles:number; collisionCap:number };
  controls: { mouseSetsGravity:boolean };
}

export const Settings: SettingsType = {
  particles: { count:1200, radiusMin:2, radiusMax:4, uniformSize:false, shape:'circle', colorMode:'velocity', solidColor:'#66ccff', palette:'plasma', blend:'lighter', velocityColorScale:350, opacity:1.0, massMode:'byArea', mass:1, randomMassMin:0.4, randomMassMax:2.0 },
  physics: { gravity:40, tiltSensitivity:1.0, airDrag:0.06, windX:0, windY:0, boundaries:'screen-bounce', restitution:0.85, wallFriction:0.02, particleFriction:0.02, container:{cx:0.5, cy:0.5, radiusN:0.45, sizeN:0.45} },
  collisions: { mode:'elastic', softness:0.6, inelasticity:0.3, enable:true, adapt:true },
  forces: { turbulenceMode:'none', amplitude:140, scale:0.0025, timeScale:0.3, curlStrength:1.0, vortexX:0.5, vortexY:0.5, vortexStrength:480, vortexFalloff:1.2, vortexCW:true, windVar:0.0, windGust:0.0, jetsAngle:0, jetsSpacing:140, swirlSpacing:160, swirlFalloff:1.2, swirlAlt:true, wellsCount:4, wellsStrength:800, wellsFalloff:1.3, wellsSpin:0.4, wellsMove:true, wellsRepel:false, wellsSeed:12345 },
  pointer: { enabled:false, tool:'attract', strength:1100, radius:140 },
  visuals: { trail:0.18, background:'#0b0e14', showHUD:true, wireframe:false, showContainer:true },
  performance: { simSpeed:1.0, substeps:3, adaptive:false, lowFpsThreshold:45, maxParticles:8000, collisionCap:12 },
  controls: { mouseSetsGravity:false }
};

type SettingsSections = Partial<SettingsType> & {
  particles?: Partial<SettingsType['particles']>;
  physics?: Partial<SettingsType['physics']>;
  collisions?: Partial<SettingsType['collisions']>;
  forces?: Partial<SettingsType['forces']>;
  pointer?: Partial<SettingsType['pointer']>;
  visuals?: Partial<SettingsType['visuals']>;
  performance?: Partial<SettingsType['performance']>;
  controls?: Partial<SettingsType['controls']>;
};

export const PRESETS: Record<string,()=>SettingsSections> = {
  Marbles: () => ({
    particles: { count:800, shape:'circle', radiusMin:3, radiusMax:6, uniformSize:false, colorMode:'solid', solidColor:'#88d0ff', blend:'source-over', massMode:'byArea', opacity:1, palette:'plasma', velocityColorScale:350, mass:1, randomMassMin:0.4, randomMassMax:2.0 },
    physics: { gravity:400, tiltSensitivity:1.2, airDrag:0.02, windX:0, windY:0, boundaries:'screen-bounce', restitution:0.85, wallFriction:0.1, particleFriction:0.03, container:{ cx:0.5, cy:0.5, radiusN:0.45, sizeN:0.45 } },
    collisions: { mode:'elastic', softness:0.5, inelasticity:0.2, enable:true, adapt:true },
    forces: { turbulenceMode:'none', amplitude:0, scale:Settings.forces.scale, timeScale:Settings.forces.timeScale, curlStrength:Settings.forces.curlStrength, vortexX:Settings.forces.vortexX, vortexY:Settings.forces.vortexY, vortexStrength:Settings.forces.vortexStrength, vortexFalloff:Settings.forces.vortexFalloff, vortexCW:Settings.forces.vortexCW, windVar:0, windGust:0, jetsAngle:0, jetsSpacing:140, swirlSpacing:160, swirlFalloff:1.2, swirlAlt:true, wellsCount:4, wellsStrength:800, wellsFalloff:1.3, wellsSpin:0.4, wellsMove:true, wellsRepel:false, wellsSeed:Settings.forces.wellsSeed },
    visuals: { trail:0.0, background:Settings.visuals.background, showContainer:true, showHUD:true, wireframe:false }
  }),
  CircleBowl: () => ({
    particles: { count:900, radiusMin:3, radiusMax:5, uniformSize:false, shape:'circle', colorMode:'velocity', palette:'cool', blend:'lighter', massMode:'byArea', opacity:0.95, solidColor:'#66ccff', velocityColorScale:350, mass:1, randomMassMin:0.4, randomMassMax:2.0 },
    physics: { gravity:300, tiltSensitivity:1.0, airDrag:0.06, boundaries:'container-circle', restitution:0.85, wallFriction:0.08, windX:0, windY:0, particleFriction:0.02, container:{cx:0.5,cy:0.5,radiusN:0.44,sizeN:0.45} },
    collisions: { mode:'soft', softness:0.75, enable:true, inelasticity:0.3, adapt:true },
    forces: { turbulenceMode:'flow', amplitude:100, scale:0.002, timeScale:0.3, curlStrength:1, vortexX:0.5, vortexY:0.5, vortexStrength:480, vortexFalloff:1.2, vortexCW:true, windVar:0, windGust:0, jetsAngle:0, jetsSpacing:140, swirlSpacing:160, swirlFalloff:1.2, swirlAlt:true, wellsCount:4, wellsStrength:800, wellsFalloff:1.3, wellsSpin:0.4, wellsMove:true, wellsRepel:false, wellsSeed:Settings.forces.wellsSeed },
    visuals: { trail:0.06, background:'#0b0e14', showContainer:true, showHUD:true, wireframe:false }
  }),
  SwirlGrid: () => ({
    particles: { count:1500, radiusMin:2, radiusMax:3.5, uniformSize:false, shape:'circle', colorMode:'velocity', palette:'aurora', blend:'lighter', massMode:'constant', mass:0.7, opacity:0.95, solidColor:'#66ccff', velocityColorScale:350, randomMassMin:0.4, randomMassMax:2.0 },
    physics: { gravity:0, tiltSensitivity:0.7, airDrag:0.06, boundaries:'screen-wrap', restitution:0.5, wallFriction:0.05, windX:0, windY:0, particleFriction:0.02, container:{cx:0.5,cy:0.5,radiusN:0.45,sizeN:0.45} },
    collisions: { mode:'none', enable:true, softness:0.6, inelasticity:0.3, adapt:true },
    forces: { turbulenceMode:'swirlgrid', amplitude:160, swirlSpacing:160, swirlFalloff:1.2, scale:0.0025, timeScale:0.3, curlStrength:1, vortexX:0.5, vortexY:0.5, vortexStrength:480, vortexFalloff:1.2, vortexCW:true, windVar:0, windGust:0, jetsAngle:0, jetsSpacing:140, swirlAlt:true, wellsCount:4, wellsStrength:800, wellsFalloff:1.3, wellsSpin:0.4, wellsMove:true, wellsRepel:false, wellsSeed:Settings.forces.wellsSeed },
    visuals: { trail:0.22, background:'#07101a', showContainer:false, showHUD:true, wireframe:false }
  }),
  WellsDance: () => ({
    particles: { count:1200, radiusMin:2, radiusMax:4, uniformSize:false, shape:'circle', colorMode:'velocity', palette:'plasma', blend:'lighter', massMode:'random', randomMassMin:0.5, randomMassMax:1.4, opacity:0.95, solidColor:'#66ccff', velocityColorScale:420, mass:1 },
    physics: { gravity:0, tiltSensitivity:0.5, airDrag:0.05, boundaries:'screen-wrap', restitution:0.6, wallFriction:0.02, windX:0, windY:0, particleFriction:0.02, container:{cx:0.5,cy:0.5,radiusN:0.45,sizeN:0.45} },
    collisions: { mode:'none', enable:true, softness:0.6, inelasticity:0.3, adapt:true },
    forces: { turbulenceMode:'wells', amplitude:0, wellsCount:5, wellsStrength:900, wellsFalloff:1.2, wellsSpin:0.5, wellsMove:true, wellsRepel:false, scale:0.0025, timeScale:0.3, curlStrength:1, vortexX:0.5, vortexY:0.5, vortexStrength:480, vortexFalloff:1.2, vortexCW:true, windVar:0, windGust:0, jetsAngle:0, jetsSpacing:140, swirlSpacing:160, swirlFalloff:1.2, swirlAlt:true, wellsSeed:2025 },
    visuals: { trail:0.18, background:'#05070d', showContainer:false, showHUD:true, wireframe:false }
  }),
  Jelly: () => ({
    particles: { count:1000, radiusMin:5, radiusMax:5, uniformSize:true, shape:'circle', colorMode:'solid', solidColor:'#ffd580', blend:'source-over', massMode:'byArea', opacity:1.0, palette:'plasma', velocityColorScale:350, mass:1, randomMassMin:0.4, randomMassMax:2.0 },
    physics: { gravity:90, tiltSensitivity:0.9, airDrag:0.08, boundaries:'container-square', restitution:0.2, wallFriction:0.15, windX:0, windY:0, particleFriction:0.02, container:{cx:0.5,cy:0.5,radiusN:0.45,sizeN:0.43} },
    collisions: { mode:'soft', softness:0.85, enable:true, inelasticity:0.3, adapt:true },
    forces: { turbulenceMode:'none', amplitude:0, scale:0.0025, timeScale:0.3, curlStrength:1, vortexX:0.5, vortexY:0.5, vortexStrength:480, vortexFalloff:1.2, vortexCW:true, windVar:0, windGust:0, jetsAngle:0, jetsSpacing:140, swirlSpacing:160, swirlFalloff:1.2, swirlAlt:true, wellsCount:4, wellsStrength:800, wellsFalloff:1.3, wellsSpin:0.4, wellsMove:true, wellsRepel:false, wellsSeed:Settings.forces.wellsSeed },
    visuals: { trail:0.03, background:'#0b0e14', showContainer:true, showHUD:true, wireframe:false }
  }),
};
