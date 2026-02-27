import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Hugo Pipes & PostCSS Synthesis', () => {
  const genDir = './resources/_gen/assets/css';
  const configPath = './hugo.toml';

  // Helper function for retrieving the active theme from hugo.toml
  const getActiveTheme = () => {
    const content = fs.readFileSync(configPath, 'utf8');
    const match = content.match(/daisyTheme\s*=\s*['"](.+?)['"]/);
    return match ? match[1] : 'light';
  };

  it('should generate metadata artifacts (.content and .json)', () => {
    const files = fs.readdirSync(genDir);
    expect(files.some(f => f.endsWith('.content'))).toBe(true);
    expect(files.some(f => f.endsWith('.json'))).toBe(true);
  });

  it('should verify theme logic exists within the .content artifact', () => {
    const activeTheme = getActiveTheme();
    const files = fs.readdirSync(genDir);
    
    // During 'dev', the compiled CSS is stored inside the .content file
    const contentFile = files.find(f => f.endsWith('.content'));
    
    if (!contentFile) {
      throw new Error("Build artifact (.content) not found!");
    }

    const compiledData = fs.readFileSync(path.join(genDir, contentFile), 'utf8');

    // Verify the theme selector is present in the compiled string
    expect(compiledData).toContain(`[data-theme=${activeTheme}]`);
    expect(compiledData).toContain('--p');
  });
});