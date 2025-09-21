// tests/midiWrapper.fake.spec.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { MidiWrapper } from '../../src/MidiWrapper.js';
import { FakeInput, FakeOutput } from '../../src/utils/fakeMidi.js';

describe('MidiWrapper with fake ports', () => {
  let fakeInput: FakeInput;
  let fakeOutput: FakeOutput;
  let midi: MidiWrapper;

  beforeEach(() => {
    fakeInput = new FakeInput(['monologue KBD/KNOB']);
    fakeOutput = new FakeOutput(['monologue SOUND']);
    midi = new MidiWrapper({ input: fakeInput, output: fakeOutput });
  });

  it('should find the fake input port', () => {
    const index = midi.requirePortIndex('input', 'monologue KBD/KNOB');
    expect(index).toBe(0);
  });

  it('should receive a fake SYSEX message', () => {
    let received: number[] | null = null;
    fakeInput.on('message', (_dt, msg) => (received = msg));

    fakeInput.emitMessage(0, [0xf0, 0x42, 0x3c, 0xf7]);
    expect(received).toEqual([0xf0, 0x42, 0x3c, 0xf7]);
  });

  it('should find the fake output port', () => {
    const index = midi.requirePortIndex('output', 'monologue SOUND');
    expect(index).toBe(0);
  });

  it('should send a fake message', () => {
    fakeOutput.sendMessage([0x90, 0x40, 0x7f]);
    expect(fakeOutput.sent[0].message).toEqual([0x90, 0x40, 0x7f]);
  });
});
