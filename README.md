# monologue-sysex-parser

Small TypeScript library to **decode Korg Monologue SYSEX dumps**, let apps inspect / manipulate parameters, and re-encode + send SYSEX back to the synth.  
Designed to be embedded in other apps (CLI, GUI, DAW helper, etc.) and later published to npm.

---

## Features

- Decode Monologue SYSEX dumps into a typed JS/TS structure  
- Modify parameters programmatically  
- Re-encode structure back into a valid Monologue SYSEX stream  
- Helpers for enumerating & opening MIDI ports  
- Test-friendly: supports a `FakeMidi` backend (useful for CI/no-hardware testing)  

---

## Installation (development)

```bash
git clone <repo>
cd monologue-sysex-parser
npm install
```


## Testing

We use Vitest and a fake MIDI backend so tests don't depend on hardware.

Run tests:

```npm test```

### Implementation notes

* The test environment sets `MIDI_FAKE=true` (via `vitest.setup.ts`) so `src/midi.ts` will create `FakeInput / FakeOutput`.
* `tests/FakeMidi.ts` includes:
    * `emitMessage(deltaTime, message)` to simulate incoming messages
    * `.sent` on `FakeOutput` to inspect outgoing messages

## Features
- [ ] decodeSysex(buffer) → MonologuePatch
- [ ] encodeSysex(patch) → Uint8Array
- [x] getInputPorts() / getOutputPorts()
- [ ] sendSysexToPort(portIndex, sysex)