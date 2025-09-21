import { describe, it, expect } from 'vitest';
import * as midiModule from '../../src/midi.js';

describe('Monologue inputs and outputs', () => {
  const MONO_INPUT_NAME = 'monologue KBD/KNOB';
  const MONO_OUTPUT_NAME = 'monologue SOUND';

  it('should find the monologue input port 💻 ⬅⬅⬅⬅ 🎹', () => {
    const input = midiModule.createInput();
    const index = midiModule.requirePortIndex('input', input, MONO_INPUT_NAME);
    expect(index).toBeGreaterThanOrEqual(0);
  });

  // it('should open the monologue input port and receive messages', (done) => {
  //   const input = midiModule.createInput();
  //   const port = midiModule.getPort('input', input, MONO_INPUT_NAME);

  //   port.on('message', (_deltaTime, message: number[]) => {
  //     // Just verify we received a message
  //     expect(message).toBeInstanceOf(Array);
  //     port.closePort();
  //     done();
  //   });

  //   console.log(
  //     'Send some MIDI from your Monologue (e.g., press a key) to trigger this test.',
  //   );
  // });

  it('should find the monologue output port 💻 ➡➡➡➡ 🎹', () => {
    const output = midiModule.createOutput();
    const index = midiModule.requirePortIndex(
      'output',
      output,
      MONO_OUTPUT_NAME,
    );
    expect(index).toBeGreaterThanOrEqual(0);
  });

  // it('should send a MIDI message to the monologue output', () => {
  //   const output = midiModule.createOutput();
  //   const port = midiModule.getPort('output', output, MONO_OUTPUT_NAME);

  //   // Send a note-on message (0x90 = note on, 0x40 = note 64, 0x7f = velocity)
  //   port.sendMessage([0x90, 0x40, 0x7f]);

  //   // You can manually verify on the synth that the note played
  //   // For automated tests, consider using a SYSEX echo if your Monologue supports it
  // });
});
