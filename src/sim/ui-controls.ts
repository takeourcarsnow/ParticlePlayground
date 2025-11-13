import { Settings } from './config';

// Utility functions for UI controls
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pathGet(obj: unknown, path: string) { return path.split('.').reduce((o: any, k) => o && o[k], obj); }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pathSet(obj: unknown, path: string, val: unknown) { const ks = path.split('.'); const last = ks.pop()!; const parent = ks.reduce((o: any, k) => o[k], obj); parent[last] = val; }

export function group(title: string) {
  const g = document.createElement('div');
  g.className = 'group';
  const h = document.createElement('h3');
  h.textContent = title;
  g.appendChild(h);
  return g;
}

export function ctrlRange(parent: HTMLElement, path: string, label: string, min: number, max: number, step: number, fmtFn: (v: number) => string = (v) => String(v), onChange: ((v: number) => void) | null = null) {
  const wrap = document.createElement('div'); wrap.className = 'ctrl';
  const lab = document.createElement('label'); lab.textContent = label;
  const right = document.createElement('div'); right.className = 'rowline';
  const input = document.createElement('input'); input.type = 'range'; input.min = String(min); input.max = String(max); input.step = String(step); input.value = pathGet(Settings, path);
  const val = document.createElement('span'); val.className = 'value'; val.textContent = fmtFn(+input.value);
  input.addEventListener('input', () => { const num = parseFloat(input.value); pathSet(Settings, path, num); val.textContent = fmtFn(num); if (onChange) onChange(num); });
  right.appendChild(input); right.appendChild(val); wrap.appendChild(lab); wrap.appendChild(right); parent.appendChild(wrap); return input;
}

export function ctrlNumber(parent: HTMLElement, path: string, label: string, step = 1, onChange: ((v: number) => void) | null = null) {
  const wrap = document.createElement('div'); wrap.className = 'ctrl';
  const lab = document.createElement('label'); lab.textContent = label;
  const input = document.createElement('input'); input.type = 'number'; input.value = pathGet(Settings, path); input.step = String(step);
  input.addEventListener('change', () => { const v = parseFloat(input.value); pathSet(Settings, path, v); if (onChange) onChange(v); });
  wrap.appendChild(lab); wrap.appendChild(input); parent.appendChild(wrap); return input;
}

export function ctrlSelect(parent: HTMLElement, path: string, label: string, options: { value: string; name: string }[], onChange: ((v: string) => void) | null = null) {
  const wrap = document.createElement('div'); wrap.className = 'ctrl';
  const lab = document.createElement('label'); lab.textContent = label;
  const sel = document.createElement('select');
  options.forEach(o => { const opt = document.createElement('option'); opt.value = o.value; opt.textContent = o.name; sel.appendChild(opt); });
  sel.value = pathGet(Settings, path);
  sel.addEventListener('change', () => { pathSet(Settings, path, sel.value); if (onChange) onChange(sel.value); });
  wrap.appendChild(lab); wrap.appendChild(sel); parent.appendChild(wrap); return sel;
}

export function ctrlColor(parent: HTMLElement, path: string, label: string, onChange: ((v: string) => void) | null = null) {
  const wrap = document.createElement('div'); wrap.className = 'ctrl';
  const lab = document.createElement('label'); lab.textContent = label;
  const input = document.createElement('input'); input.type = 'color'; input.value = pathGet(Settings, path);
  input.addEventListener('input', () => { pathSet(Settings, path, input.value); if (onChange) onChange(input.value); });
  wrap.appendChild(lab); wrap.appendChild(input); parent.appendChild(wrap); return input;
}

export function ctrlCheck(parent: HTMLElement, path: string, label: string, onChange: ((v: boolean) => void) | null = null) {
  const wrap = document.createElement('div'); wrap.className = 'ctrl';
  const lab = document.createElement('label'); lab.textContent = label;
  const input = document.createElement('input'); input.type = 'checkbox'; input.checked = pathGet(Settings, path);
  input.addEventListener('change', () => { pathSet(Settings, path, input.checked); if (onChange) onChange(input.checked); });
  wrap.appendChild(lab); wrap.appendChild(input); parent.appendChild(wrap); return input;
}