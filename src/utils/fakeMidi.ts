export type MessageHandler = (deltaTime: number, message: number[]) => void;

export class FakeInput {
  private handlers: Record<string, MessageHandler[]> = {};
  private ports: string[];

  constructor(ports: string[] = ['monologue KBD/KNOB']) {
    this.ports = ports;
  }

  getPortCount(): number {
    return this.ports.length;
  }

  getPortName(i: number): string {
    return this.ports[i];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openPort(_i: number): void {
    // no-op for tests
  }

  closePort(): void {
    // no-op for tests
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ignoreTypes(_sysex = false, _timing = false, _activeSense = false): void {
    // no-op
  }

  on(event: 'message', cb: MessageHandler): void {
    this.handlers[event] ??= [];
    this.handlers[event].push(cb);
  }

  /** Simulate a MIDI message arriving */
  emitMessage(deltaTime: number, message: number[]): void {
    (this.handlers['message'] || []).forEach((cb) => cb(deltaTime, message));
  }
}

export class FakeOutput {
  private ports: string[];
  public sent: { port: number; message: number[] }[] = [];

  constructor(ports: string[] = ['monologue SOUND']) {
    this.ports = ports;
  }

  getPortCount(): number {
    return this.ports.length;
  }

  getPortName(i: number): string {
    return this.ports[i];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openPort(_i: number): void {
    // no-op
  }

  closePort(): void {
    // no-op
  }

  /** Simulate sending a MIDI message */
  sendMessage(message: number[]): void {
    this.sent.push({ port: 0, message });
  }
}
