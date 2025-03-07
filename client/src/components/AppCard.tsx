import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import AppButton from '../commons/button';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme).palette.background.paper,
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 12,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

interface IAppCard {
  image: string,
  title: string,
  label?: string,
  variant: string | undefined,
  description: string | undefined,
  editor: string | undefined,
  writer: string | undefined,
  date: string | undefined
  status: string | undefined
  editable: boolean | undefined,
}

function AppCard({
  date,
  image,
  label,
  title,
  editor,
  status,
  writer,
  variant,
  editable,
  description,
}: IAppCard) {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <SyledCard
      variant="outlined"
      tabIndex={0}
      sx={expanded ? { height: '100%' } : { height: 'auto' }}
    >
      <CardMedia
        component="img"
        alt={title}
        image={image}
        className='aspect-[16/9] object-contain border-b'
      />
      <SyledCardContent>
        <Typography
          gutterBottom
          variant='caption'
          component="span"
          sx={variant === 'Published' ? { color: 'blue' } : variant === 'Company' ? { color: 'black' } : { color: 'green' }}
        >
          {variant}
        </Typography>
        <Typography variant="caption">{date}</Typography>
        <Typography className='flex flex-col capitalize truncate ... w-60' gutterBottom variant="h6" component='p'>
          {title}
          <Typography variant='subtitle1' component='span' sx={status === 'active' ? { color: 'green' } : { color: 'red' }}>
            {status}
          </Typography>
        </Typography>
        {variant === 'Company'
          ? null
          : (
            <Box>
              <Typography sx={{ display: 'flex', textTransform: 'capitalize' }} gutterBottom variant='subtitle2' component="p">
                Editor: {editor ? editor : 'No valid editor'}
              </Typography>
              <Typography sx={{ display: 'flex', textTransform: 'capitalize' }} gutterBottom variant='subtitle2' component="p">
                Writer: {writer ? writer : 'No valid writer'}
              </Typography>
            </Box>
          )}
        {!description
          ? null
          : <Typography variant="body2" color="text.secondary" gutterBottom>
            {expanded
              ? description
              : description?.substring(0, 100) + (description && description.length > 100
                ? '...'
                : '')}
          </Typography>
        }
        {description && description.length > 100 && (
          <Typography component='span' variant='caption' sx={{ cursor: 'pointer' }} onClick={handleToggleExpand}>
            {expanded ? 'Show Less' : 'Read More'}
          </Typography>
        )}
        {editable && <Box sx={{ maxWidth: 200 }}><AppButton editor={true} label={`Edit ${label}`} color='success' /></Box>}
      </SyledCardContent>
    </SyledCard>
  )
}

export default AppCard;