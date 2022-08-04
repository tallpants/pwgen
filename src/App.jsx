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

export const App = () => {
  const [length, setLength] = useState(getQueryValue('l') || '64');
  const [type, setType] = useState(getQueryValue('t') || 'alphanumeric');
  const [password, setPassword] = useState(cryptoRandomString({ length: Number(length), type }));

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
            Generate Again
          </button>
        </fieldset>
      </div>
    </div>
  );
};
