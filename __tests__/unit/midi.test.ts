import { describe, it, expect } from 'vitest';
import { requirePortIndex } from '../../src/midi.js';

describe('monologue inputs and outputs', () => {
  describe('inputs 💻 ⬅⬅⬅⬅ 🎹', () => {
    it('should exist', () => {
      const index = requirePortIndex('input', 'monologue KBD/KNOB');
      expect(index).toBeGreaterThanOrEqual(0);
    });
  });

  describe('outputs 💻 ➡➡➡➡ 🎹', () => {
    it('should exist', () => {
      const index = requirePortIndex('output', 'monologue SOUND');
      expect(index).toBeGreaterThanOrEqual(0);
    });
  });
});
