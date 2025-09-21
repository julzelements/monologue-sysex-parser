import { describe, it, expect } from 'vitest';
import { MidiWrapper } from '../../src/MidiWrapper.js';

const skipHardware = process.env.SKIP_HARDWARE_TESTS === 'true';

(skipHardware ? describe.skip : describe)(
  'Monologue inputs and outputs',
  () => {
    const MONO_INPUT_NAME = 'monologue KBD/KNOB';
    const MONO_OUTPUT_NAME = 'monologue SOUND';
    const midi = new MidiWrapper(); // real hardware

    it('should find the monologue input port', () => {
      const index = midi.requirePortIndex('input', MONO_INPUT_NAME);
      expect(index).toBeGreaterThanOrEqual(0);
    });

    it('should find the monologue output port', () => {
      const index = midi.requirePortIndex('output', MONO_OUTPUT_NAME);
      expect(index).toBeGreaterThanOrEqual(0);
    });
  },
);
