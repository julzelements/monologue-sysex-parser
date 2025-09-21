// tests/utils/fakeMidi.ts
export type MessageHandler = (deltaTime: number, message: number[]) => void;

export class FakeInput {
  private handlers: Record<string, MessageHandler[]> = {};
  private ports: string[];

  constructor(ports: string[] = ['monologue KBD/KNOB']) {
    this.ports = ports;
  }

  getPortCount() {
    return this.ports.length;
  }

  getPortName(i: number) {
    return this.ports[i];
  }

  openPort(_i: number) {
    // no-op for tests
  }

  closePort() {
    // no-op for tests
  }

  ignoreTypes(_sysex = false, _timing = false, _activeSense = false) {
    // no-op
  }

  on(event: 'message', cb: MessageHandler) {
    this.handlers[event] ??= [];
    this.handlers[event].push(cb);
  }

  /** Simulate a MIDI message arriving */
  emitMessage(deltaTime: number, message: number[]) {
    (this.handlers['message'] || []).forEach((cb) => cb(deltaTime, message));
  }
}

export class FakeOutput {
  private ports: string[];
  public sent: { port: number; message: number[] }[] = [];

  constructor(ports: string[] = ['monologue SOUND']) {
    this.ports = ports;
  }

  getPortCount() {
    return this.ports.length;
  }

  getPortName(i: number) {
    return this.ports[i];
  }

  openPort(_i: number) {
    // no-op
  }

  closePort() {
    // no-op
  }

  /** Simulate sending a MIDI message */
  sendMessage(message: number[]) {
    this.sent.push({ port: 0, message });
  }
}
