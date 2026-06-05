import cryptoRandomString from 'crypto-random-string';
import { useState, useEffect } from 'react';

function getQueryValue(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function setQueryValue(key, value) {
  const queryStringParams = new URLSearchParams(window.location.search);
  queryStringParams.set(key, value);
  history.replaceState(null, null, '?' + queryStringParams.toString());
}

function stringifyUuid(bytes) {
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0'));

  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-');
}

function generateUuidV7() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const timestamp = Date.now();

  bytes[0] = Math.floor(timestamp / 0x10000000000) & 0xff;
  bytes[1] = Math.floor(timestamp / 0x100000000) & 0xff;
  bytes[2] = Math.floor(timestamp / 0x1000000) & 0xff;
  bytes[3] = Math.floor(timestamp / 0x10000) & 0xff;
  bytes[4] = Math.floor(timestamp / 0x100) & 0xff;
  bytes[5] = timestamp & 0xff;
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return stringifyUuid(bytes);
}

export const App = () => {
  const [length, setLength] = useState(getQueryValue('l') || '64');
  const [type, setType] = useState(getQueryValue('t') || 'alphanumeric');
  const [password, setPassword] = useState(cryptoRandomString({ length: Number(length), type }));
  const [uuidV4, setUuidV4] = useState(() => crypto.randomUUID());
  const [uuidV7, setUuidV7] = useState(generateUuidV7);

  useEffect(() => {
    setQueryValue('l', length);
    setQueryValue('t', type);

    setPassword(cryptoRandomString({ length: Number(length), type }));
  }, [length, type]);

  const onTypeChanged = (e) => {
    if (e.target.value) {
      setType(e.target.name);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <form>
            <label>
              Length: <input type="number" value={Number(length)} onChange={(e) => setLength(e.target.value)} />
            </label>
            <fieldset>
              <legend>Type</legend>
              <label>
                <input type="radio" name="hex" checked={type === 'hex'} onChange={onTypeChanged} /> Hex
                <br />
              </label>
              <label>
                <input type="radio" name="base64" checked={type === 'base64'} onChange={onTypeChanged} /> Base64
                <br />
              </label>
              <label>
                <input type="radio" name="url-safe" checked={type === 'url-safe'} onChange={onTypeChanged} /> URL Safe
                <br />
              </label>
              <label>
                <input type="radio" name="numeric" checked={type === 'numeric'} onChange={onTypeChanged} /> Numeric
                <br />
              </label>
              <label>
                <input
                  type="radio"
                  name="distinguishable"
                  checked={type === 'distinguishable'}
                  onChange={onTypeChanged}
                />{' '}
                Distinguishable
                <br />
              </label>
              <label>
                <input
                  type="radio"
                  name="ascii-printable"
                  checked={type === 'ascii-printable'}
                  onChange={onTypeChanged}
                />{' '}
                ASCII Printable
                <br />
              </label>
              <label>
                <input type="radio" name="alphanumeric" checked={type === 'alphanumeric'} onChange={onTypeChanged} />{' '}
                Alphanumeric
              </label>
            </fieldset>
          </form>
        </div>
        <div style={{ flex: 1, marginLeft: 20, height: '100%' }}>
          <fieldset style={{ height: '100%' }}>
            <legend>Generated Password</legend>
            <textarea value={password} readOnly style={{ height: 124, width: '100%' }} />
            <button onClick={() => window.navigator.clipboard.writeText(password)}>Copy</button>
            <button onClick={() => setPassword(cryptoRandomString({ length: Number(length), type }))}>
              Regenerate
            </button>
          </fieldset>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <fieldset>
          <legend>UUID</legend>
          <div>
            v4: <button onClick={() => window.navigator.clipboard.writeText(uuidV4)}>Copy</button>{' '}
            <button onClick={() => setUuidV4(crypto.randomUUID())}>Regenerate</button>{' '}
            <span style={{ fontFamily: 'monospace' }}>{uuidV4}</span>
          </div>
          <div>
            v7: <button onClick={() => window.navigator.clipboard.writeText(uuidV7)}>Copy</button>{' '}
            <button onClick={() => setUuidV7(generateUuidV7())}>Regenerate</button>{' '}
            <span style={{ fontFamily: 'monospace' }}>{uuidV7}</span>
          </div>
        </fieldset>
      </div>
    </div>
  );
};
