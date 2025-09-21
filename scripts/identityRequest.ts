// scripts/identityRequest.ts
import { SysExMessage } from 'midi';
import { MidiWrapper } from '../src/MidiWrapper.js';

const IDENTITY_REQUEST: number[] = [
  0xf0, // SysEx start
  0x7e, // Non-realtime
  0x7f, // Device ID (All devices)
  0x06, // General Information
  0x01, // Identity Request
  0xf7, // End of SysEx
];

interface IdentityReply {
  manufacturerId: number;
  familyId: number;
  memberId: number;
  firmware: {
    minorLSB: number;
    minorMSB: number;
    majorLSB: number;
    majorMSB: number;
  };
}
/** Parse a Korg Monologue identity reply SysEx message */
function parseIdentityReply(message: number[]): IdentityReply {
  return {
    manufacturerId: message[6],
    familyId: (message[8] << 8) | message[7],
    memberId: (message[10] << 8) | message[9],
    firmware: {
      minorLSB: message[11],
      minorMSB: message[12],
      majorLSB: message[13],
      majorMSB: message[14],
    },
  };
}

async function run(): Promise<void> {
  console.log('Opening Monologue MIDI ports...');

  // Use the wrapper
  const midi = new MidiWrapper();
  const input = midi.getPort('input', 'monologue KBD/KNOB');
  const output = midi.getPort('output', 'monologue SOUND');

  input.on('message', (_deltaTime, message) => {
    if (message[0] === 0xf0) {
      console.log('✅ SysEx message received:', message);

      try {
        const info = parseIdentityReply(message);
        console.log('--- Parsed Identity Reply ---');
        console.log(`Manufacturer ID: 0x${info.manufacturerId.toString(16)}`);
        console.log(`Family ID: 0x${info.familyId.toString(16)}`);
        console.log(`Member ID: 0x${info.memberId.toString(16)}`);
        console.log(
          `Firmware: ${info.firmware.majorMSB}.${info.firmware.majorLSB}.${info.firmware.minorMSB}.${info.firmware.minorLSB}`,
        );
      } catch (err) {
        console.error('Failed to parse identity reply', err);
      }
    }
  });

  console.log('Sending Identity Request...');
  output.sendMessage(IDENTITY_REQUEST as SysExMessage);
}

run().catch((err) => {
  console.error('Error running identity request script', err);
});
