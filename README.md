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
git clone https://github.com/julzelements/monologue-sysex-parser
cd monologue-sysex-parser
npm install
```


## Testing

We use Vitest and a fake MIDI backend so tests don't depend on hardware.

Run tests:

```npm test```

### Implementation notes

* Tests against a real connected monologue: `realIO.test.ts`
* Tests against a mocked monologue: `fakeIO.test.ts`

## Features
- [ ] decodeSysex(buffer) → MonologuePatch
- [ ] encodeSysex(patch) → Uint8Array
- [x] getInputPorts() / getOutputPorts()
- [ ] sendSysexToPort(portIndex, sysex)