import React from 'react';

import Combine from '@/containers/Combine';

import useUpgrade from '@/hooks/upgrade';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { newVersionAvailable, onUpdate } = useUpgrade();
  return (
    <>
      <Combine />

      <Snackbar
        open={newVersionAvailable}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message! {` `}
          <Button onClick={onUpdate} color="warning" variant="contained">
            Refresh
          </Button>
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
