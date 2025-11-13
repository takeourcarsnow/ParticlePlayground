import { Settings, PRESETS } from './config';
import { State } from './state';
import { rand, randInt } from './utils';
import { rebuildParticles } from './particles';
import { TABS, showTab } from './ui-tabs';

// Function to create tabs
export function makeTabs() {
  const tabsEl = State.els.tabsEl!; tabsEl.innerHTML = '';
  TABS.forEach((t, i) => {
    const b = document.createElement('button');
    b.textContent = t.name;
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', () => {
      [...tabsEl.children].forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      showTab(t.id);
    });
    tabsEl.appendChild(b);
  });
  showTab('particles');
}

// Function to initialize header buttons
export function initHeaderButtons() {
  State.els.randomizeBtn?.addEventListener('click', () => {
    Settings.particles.count = Math.round(rand(300, 2800));
    Settings.particles.uniformSize = Math.random() < 0.35;
    if (Settings.particles.uniformSize) {
      Settings.particles.radiusMax = rand(1.5, 6);
      Settings.particles.radiusMin = Settings.particles.radiusMax;
    } else {
      Settings.particles.radiusMin = rand(1, 4);
      Settings.particles.radiusMax = Settings.particles.radiusMin + rand(1, 4);
    }
    Settings.particles.shape = ['circle', 'square', 'triangle'][randInt(0, 2)] as typeof Settings.particles.shape;
    Settings.particles.colorMode = ['solid', 'velocity', 'heat'][randInt(0, 2)] as typeof Settings.particles.colorMode;
    Settings.particles.palette = ['plasma', 'cool', 'fire', 'aurora'][randInt(0, 3)] as typeof Settings.particles.palette;
    Settings.particles.blend = ['source-over', 'lighter', 'screen', 'multiply'][randInt(0, 3)] as typeof Settings.particles.blend;
    Settings.physics.gravity = rand(0, 800);
    Settings.physics.airDrag = rand(0.01, 0.4);
    Settings.physics.restitution = rand(0.1, 0.9);
    Settings.collisions.mode = ['elastic', 'soft', 'inelastic', 'none'][randInt(0, 3)] as typeof Settings.collisions.mode;
    Settings.forces.turbulenceMode = ['none', 'flow', 'curl', 'vortex', 'wind', 'jets', 'swirlgrid', 'wells'][randInt(0, 7)];
    Settings.forces.amplitude = rand(0, 800);
    Settings.forces.scale = rand(0.001, 0.008);
    Settings.forces.timeScale = rand(0, 1.2);
    Settings.physics.boundaries = ['screen-bounce', 'screen-wrap', 'none', 'container-circle', 'container-square'][randInt(0, 4)];
    rebuildParticles(false);
    makeTabs();
  });
  State.els.presetMenuBtn?.addEventListener('click', () => {
    const names = Object.keys(PRESETS);
    const choice = prompt('Load preset: ' + names.join(', '), 'Marbles');
    if (!choice) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const presetFn = (PRESETS as Record<string, () => any>)[choice.trim()];
    if (presetFn) {
      const p = presetFn();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.keys(p).forEach(section => { Object.assign((Settings as any)[section], (p as any)[section]); });
      if (Settings.particles.uniformSize) { Settings.particles.radiusMin = Settings.particles.radiusMax; }
      rebuildParticles(false);
      makeTabs();
    } else { alert('Preset not found.'); }
  });
}

// Main UI initialization function
export function initUI() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (document.body as any).style.background = Settings.visuals.background;
  State.els.togglePanel?.addEventListener('click', () => State.els.panel?.classList.toggle('hidden'));
  makeTabs();
  initHeaderButtons();
}