import { describe, it, expect } from 'vitest';
import * as midiModule from '../../src/midi.js';

const skipHardware = process.env.SKIP_HARDWARE_TESTS === 'true';

(skipHardware ? describe.skip : describe)(
  'Monologue inputs and outputs',
  () => {
    const MONO_INPUT_NAME = 'monologue KBD/KNOB';
    const MONO_OUTPUT_NAME = 'monologue SOUND';

    it('should find the monologue input port 💻 ⬅⬅⬅⬅ 🎹', () => {
      const input = midiModule.createInput();
      const index = midiModule.requirePortIndex(
        'input',
        input,
        MONO_INPUT_NAME,
      );
      expect(index).toBeGreaterThanOrEqual(0);
    });

    it('should find the monologue output port 💻 ➡➡➡➡ 🎹', () => {
      const output = midiModule.createOutput();
      const index = midiModule.requirePortIndex(
        'output',
        output,
        MONO_OUTPUT_NAME,
      );
      expect(index).toBeGreaterThanOrEqual(0);
    });
  },
);
