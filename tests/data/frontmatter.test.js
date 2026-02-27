import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

describe('Content Schema Validation', () => {
  // Helper to extract keys from any archetype file
  const getKeysFromArchetype = (archetypePath) => {
    if (!fs.existsSync(archetypePath)) return [];
    const content = fs.readFileSync(archetypePath, 'utf8');
    const matches = content.matchAll(/^([a-z0-9_]+):/gim);
    return Array.from(matches, m => m[1]);
  };

  // Validate /content/posts/ matches posts.md
  describe('Posts Directory (posts.md schema)', () => {
    const postKeys = getKeysFromArchetype('./archetypes/posts.md');
    const postFiles = globSync(
        'content/posts/**/*.md',
        {ignore: 'content/posts/_index.md'}
    );
    it.each(postFiles)('verifying %s', (file) => {
      const content = fs.readFileSync(file, 'utf8');
      postKeys.forEach(key => {
        expect(content, `Missing key "${key}" in ${file}`).toMatch(
          new RegExp(`^${key}:`, 'm')
        );
      });
    });
  });

  // Validate everything else matches default.md
  // This excludes the posts directory
  describe('General Content (default.md schema)', () => {
    const defaultKeys = getKeysFromArchetype('./archetypes/default.md');
    const otherFiles = globSync('content/**/*.md', { 
        ignore: 'content/posts/**' 
    });

    // If there are no other files, this test always passes
    if (otherFiles.length === 0) {
        it('no general content files found (skipping)', () => {
            expect(true).toBe(true);
        });
    } else {

        // Else check through all other files
        it.each(otherFiles)('verifying %s', (file) => {
            const content = fs.readFileSync(file, 'utf8');
            defaultKeys.forEach(key => {
                expect(content, `Missing key "${key}" in ${file}`).toMatch(
                new RegExp(`^${key}:`, 'm')
                );
            });
        });
    }
    
  });
});