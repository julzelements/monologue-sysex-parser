// scripts/captureSysex.ts
import midi from 'midi';
import fs from 'fs';

// === CONFIG ===
const MONO_INPUT_NAME = 'monologue KBD/KNOB';
const OUTPUT_FILE = './__tests__/data/testData.ts';

// === SETUP MIDI INPUT ===
const input = new midi.Input();

// Make sure SYSEX messages are received
input.ignoreTypes(false, true, true);

function findPortIndex(name: string): number {
  const count = input.getPortCount();
  for (let i = 0; i < count; i++) {
    if (input.getPortName(i) === name) return i;
  }
  throw new Error(`Input port "${name}" not found`);
}

const portIndex = findPortIndex(MONO_INPUT_NAME);
input.openPort(portIndex);

console.log(
  `Listening for SYSEX on "${MONO_INPUT_NAME}"... Press the Monologue SYSEX dump button.`,
);

// === LISTEN FOR SYSEX ===
input.on('message', (_deltaTime, message: number[]) => {
  // SYSEX starts with 0xF0 and ends with 0xF7
  if (message[0] === 0xf0 && message[message.length - 1] === 0xf7) {
    console.log('SYSEX dump received! Saving to file...');

    const bufferString = `[${message.join(', ')}]`;
    const fileContent = `export const defaultSysexBuffer = Uint8Array.from(${bufferString});\n`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Saved to ${OUTPUT_FILE}`);

    input.closePort();
    process.exit(0);
  } else {
    console.log('Received non-SYSEX MIDI message:', message);
  }
});
