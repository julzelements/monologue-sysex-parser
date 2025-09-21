import { describe, it, expect, beforeEach } from 'vitest';
import { FakeInput, FakeOutput } from '../../src/utils/fakeMidi.js';
import * as midiModule from '../../src/midi.js';

describe('monologue inputs and outputs', () => {
  let input: FakeInput;
  let output: FakeOutput;

  beforeEach(() => {
    // Create fresh fake instances for each test
    input = new FakeInput(['monologue KBD/KNOB']);
    output = new FakeOutput(['monologue SOUND']);
  });

  it('should find the monologue input port', () => {
    const index = midiModule.requirePortIndex(
      'input',
      input,
      'monologue KBD/KNOB',
    );
    expect(index).toBe(0);
  });

  it('should receive a fake SYSEX message', () => {
    let received: number[] | null = null;
    input.on('message', (_dt, msg) => (received = msg));

    input.emitMessage(0, [0xf0, 0x42, 0x3c, 0xf7]);
    expect(received).toEqual([0xf0, 0x42, 0x3c, 0xf7]);
  });

  it('should find the monologue output port', () => {
    const index = midiModule.requirePortIndex(
      'output',
      output,
      'monologue SOUND',
    );
    expect(index).toBe(0);
  });

  it('should send a fake message', () => {
    output.sendMessage([0x90, 0x40, 0x7f]);
    expect(output.sent[0].message).toEqual([0x90, 0x40, 0x7f]);
  });
});
