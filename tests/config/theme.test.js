import { describe, it, expect } from 'vitest';
import fs from 'fs';
import toml from 'toml';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindConfig from '../../tailwind.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Theme Synchronization', () => {
  it('should have the active Hugo theme defined in tailwind.config.js', () => {
    // Get active theme from hugo.toml
    const hugoPath = path.resolve(__dirname, '../../hugo.toml');
    const hugoConfig = toml.parse(fs.readFileSync(hugoPath, 'utf-8'));
    const activeTheme = hugoConfig.params?.daisyTheme;

    // Get daisyUI themes configured from tailwind.config.js
    const supportedThemes = tailwindConfig.daisyui?.themes || [];

    // The Assertion
    expect(activeTheme, 'Hugo daisyTheme is not defined in hugo.toml').toBeDefined();
    expect(supportedThemes, 'No themes found in tailwind.config.js').toContain(activeTheme);
  });
});