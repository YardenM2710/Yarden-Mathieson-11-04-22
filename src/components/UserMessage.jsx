import { Slide, Snackbar } from '@mui/material';

export default function UserMessage({ isMessageOn, message }) {
  function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
  }

  return (
    <>
      <Snackbar
        TransitionComponent={TransitionLeft}
        open={isMessageOn}
        message={message}
      />
    </>
  );
}
