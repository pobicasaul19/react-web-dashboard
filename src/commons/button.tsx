import Button from '@mui/material/Button'

interface IAppButtonProps {
  label: string
  onClick?: () => void;
  editor: boolean | undefined;
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  loading?: boolean
}

export default function AppButton({ label, onClick, editor, color, loading }: IAppButtonProps) {
  return (
    <>
      {editor &&
        <Button
          type="submit"
          variant='outlined'
          color={color}
          size="large"
          disableElevation
          fullWidth
          onClick={onClick}
          sx={{
            textTransform: 'none',
          }}
          loading={loading}
        >
          {label}
        </Button>
      }
    </>
  );
}
