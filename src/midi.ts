import midi from 'midi';
import { FakeInput, FakeOutput } from '../__tests__/utils/fakeMidi.js';

const USE_FAKE = process.env.MIDI_FAKE === 'true';

export const input = USE_FAKE ? new FakeInput() : new midi.Input();
export const output = USE_FAKE ? new FakeOutput() : new midi.Output();

/**
 * Find the index of an input port by name.
 * Throws if not found unless return -1 is allowed.
 */
export function findInputPortIndex(name: string): number {
  const ports = input.getPortCount();
  for (let i = 0; i < ports; i++) {
    if (input.getPortName(i) === name) {
      return i;
    }
  }
  return -1;
}

/**
 * Find the index of an output port by name.
 * Throws if not found unless return -1 is allowed.
 */
export function findOutputPortIndex(name: string): number {
  const ports = output.getPortCount();
  for (let i = 0; i < ports; i++) {
    if (output.getPortName(i) === name) {
      return i;
    }
  }
  return -1;
}

/**
 * Assert that a port exists, otherwise throw with a clear error.
 */
export function requirePortIndex(
  type: 'input' | 'output',
  name: string,
): number {
  const index =
    type === 'input' ? findInputPortIndex(name) : findOutputPortIndex(name);

  if (index < 0) {
    throw new Error(`${type} port "${name}" not found`);
  }
  return index;
}
