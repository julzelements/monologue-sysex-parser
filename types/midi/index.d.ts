declare module 'midi' {
  import { EventEmitter } from 'events';
  import * as Stream from 'stream';

  export type MidiMessage = [number, number, number];
  export type MidiCallback = (deltaTime: number, message: MidiMessage) => void;

  export class Input extends EventEmitter {
    closePort(): void;
    getPortCount(): number;
    getPortName(port: number): string;
    ignoreTypes(sysex: boolean, timing: boolean, activeSensing: boolean): void;
    openPort(port: number): void;
    openVirtualPort(port: string): void;
    on(event: 'message', callback: MidiCallback): this;
  }

  export class Output {
    closePort(): void;
    getPortCount(): number;
    getPortName(port: number): string;
    openPort(port: number): void;
    openVirtualPort(port: string): void;
    send(message: MidiMessage): void;
    sendMessage(message: MidiMessage): void;
  }

  /** @deprecated */
  export const input: typeof Input;
  /** @deprecated */
  export const output: typeof Output;

  export function createReadStream(input?: Input): Stream;
  export function createWriteStream(output?: Output): Stream;
}
