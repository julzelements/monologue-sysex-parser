// src/MidiWrapper.ts
import midi from 'midi';
import { FakeInput, FakeOutput } from './utils/fakeMidi.js';

export type MidiPort = midi.Input | midi.Output | FakeInput | FakeOutput;

export interface MidiWrapperOptions {
  useFake?: boolean;
  input?: MidiPort;
  output?: MidiPort;
}

export class MidiWrapper {
  input: MidiPort;
  output: MidiPort;

  constructor(options: MidiWrapperOptions = {}) {
    if (options.input && options.output) {
      this.input = options.input;
      this.output = options.output;
    } else if (options.useFake) {
      this.input = new FakeInput(['monologue KBD/KNOB']);
      this.output = new FakeOutput(['monologue SOUND']);
    } else {
      this.input = new midi.Input();
      this.output = new midi.Output();
    }
  }

  createInput(): midi.Input {
    const port = new midi.Input();
    port.ignoreTypes(false, true, true);
    return port;
  }

  createOutput(): midi.Output {
    return new midi.Output();
  }

  findInputPortIndex(name: string): number {
    const count = this.input.getPortCount();
    for (let i = 0; i < count; i++) {
      if (this.input.getPortName(i) === name) return i;
    }
    return -1;
  }

  findOutputPortIndex(name: string): number {
    const count = this.output.getPortCount();
    for (let i = 0; i < count; i++) {
      if (this.output.getPortName(i) === name) return i;
    }
    return -1;
  }

  requirePortIndex(type: 'input' | 'output', name: string): number {
    const index =
      type === 'input'
        ? this.findInputPortIndex(name)
        : this.findOutputPortIndex(name);

    if (index < 0) throw new Error(`${type} port "${name}" not found`);
    return index;
  }

  getPort(type: 'input', name: string): midi.Input;
  getPort(type: 'output', name: string): midi.Output;

  getPort(type: 'input' | 'output', name: string): MidiPort {
    const index = this.requirePortIndex(type, name);
    if (type === 'input') {
      (this.input as midi.Input).ignoreTypes(false, true, true);
      (this.input as midi.Input).openPort(index);
      return this.input;
    } else {
      (this.output as midi.Output).openPort(index);
      return this.output;
    }
  }
}
