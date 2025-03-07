import Button from '@mui/material/Button'

interface IAppButtonProps {
  label: string
  onClick: () => void | undefined;
  editor: boolean | undefined;
}

export default function AppButton({ label, onClick, editor }: IAppButtonProps) {
  return (
    <>
      {editor &&
        <Button
          type="submit"
          variant="outlined"
          color="info"
          size="large"
          disableElevation
          fullWidth
          onClick={onClick}
          sx={{
            my: 2,
            textTransform: 'none',
          }}
        >
          {label}
        </Button>
      }
    </>
  );
}
