import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Production Asset Integrity', () => {
  const cssDir = './assets/css';
  const configPath = './hugo.toml';
  const targetFile = 'compiled.css'; // The output from your npm build:css script

  // Helper to get the theme from your config
  const getActiveTheme = () => {
    try {
      const content = fs.readFileSync(configPath, 'utf8');
      const match = content.match(/daisyTheme\s*=\s*['"](.+?)['"]/);
      return match ? match[1] : 'cupcake'; // Default to cupcake if not found
    } catch (e) {
      return 'cupcake';
    }
  };

  it('should verify that compiled.css exists', () => {
    const filePath = path.join(cssDir, targetFile);
    const exists = fs.existsSync(filePath);
    
    expect(exists).toBe(true);
    
    // Check that the file isn't empty
    const stats = fs.statSync(filePath);
    expect(stats.size).toBeGreaterThan(0);
  });

  it('should verify DaisyUI and Theme variables in the CSS', () => {
    const activeTheme = getActiveTheme();
    const filePath = path.join(cssDir, targetFile);
    const cssContent = fs.readFileSync(filePath, 'utf8');

    // Verify Tailwind/DaisyUI injected the theme
    // DaisyUI uses [data-theme=...] selectors
    expect(cssContent).toContain(`[data-theme=${activeTheme}]`);
    
    // Verify standard Tailwind/DaisyUI variables exist (e.g., --p for Primary color)
    expect(cssContent).toContain('--p');
  });

  it('should ensure no source mapping or debug junk in production CSS', () => {
    const filePath = path.join(cssDir, targetFile);
    const cssContent = fs.readFileSync(filePath, 'utf8');
    
    // Ensure we aren't leaking local paths from your Mate 20/Mac into the CSS
    expect(cssContent).not.toContain('com.termux');
    expect(cssContent).not.toContain('/Users/');
  });
});