import { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
export function Slider({ toggleCelsius }) {
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    toggleCelsius(success);
  }, [success]);

  return (
    <div className="slider">
      <label> &#8451;</label>
      <FormControlLabel
        control={
          <Switch
            checked={success}
            onChange={(ev) => setSuccess(ev.target.checked)}
            color="primary"
            value="dynamic-class-name"
          />
        }
      />
      <label>&#8457; </label>
    </div>
  );
}
