import midi from 'midi';
import type { FakeInput, FakeOutput } from './utils/fakeMidi.js';
export type MidiPort = midi.Input | midi.Output | FakeInput | FakeOutput;

/** Create a new MIDI input port with SYSEX enabled */
export function createInput(): midi.Input {
  const port = new midi.Input();
  port.ignoreTypes(false, true, true); // allow SYSEX
  return port;
}

/** Create a new MIDI output port */
export function createOutput(): midi.Output {
  return new midi.Output();
}

/** Find the index of an input port by name, return -1 if not found */
export function findInputPortIndex(input: midi.Input, name: string): number {
  const count = input.getPortCount();
  for (let i = 0; i < count; i++) {
    if (input.getPortName(i) === name) return i;
  }
  return -1;
}

/** Find the index of an output port by name, return -1 if not found */
export function findOutputPortIndex(output: midi.Output, name: string): number {
  const count = output.getPortCount();
  for (let i = 0; i < count; i++) {
    if (output.getPortName(i) === name) return i;
  }
  return -1;
}

/** Assert that a port exists, throw if not */
export function requirePortIndex(
  type: 'input' | 'output',
  port: MidiPort,
  name: string,
): number {
  const index =
    type === 'input'
      ? findInputPortIndex(port as midi.Input, name)
      : findOutputPortIndex(port as midi.Output, name);

  if (index < 0) throw new Error(`${type} port "${name}" not found`);
  return index;
}

/** Open a port by name and return the instance */
export function getPort(
  type: 'input' | 'output',
  port: MidiPort,
  name: string,
): MidiPort {
  const index = requirePortIndex(type, port, name);

  if (type === 'input') {
    const inputPort = port as midi.Input;
    inputPort.ignoreTypes(false, true, true);
    inputPort.openPort(index);
    return inputPort;
  } else {
    const outputPort = port as midi.Output;
    outputPort.openPort(index);
    return outputPort;
  }
}
