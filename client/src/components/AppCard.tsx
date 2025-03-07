import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

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

const Author = ({ author }: { author: string | undefined }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <Typography sx={{ textTransform: 'capitalize' }} variant="caption">
          {author}
        </Typography>
      </Box>
    </Box>
  );
}

interface IAppCard {
  image: string,
  variant: string | undefined,
  title: string,
  description: string | undefined,
  author: string | undefined,
  date: string | undefined
}

function AppCard({ image, variant, title, description, author, date }: IAppCard) {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <SyledCard
      variant="outlined"
      tabIndex={0}
      sx={expanded ? { height: '100%' } : { height: '32rem' }}
    >
      <CardMedia
        component="img"
        alt={title}
        image={image}
        sx={{
          aspectRatio: '16 / 9',
          borderBottom: '1px solid',
          borderColor: 'divider',
          objectFit: 'contain'
        }}
      />
      <SyledCardContent>
        <Typography
          gutterBottom
          variant='caption'
          component="span"
          sx={variant === 'Published' ? { color: 'blue' } : variant === 'Company' ? { color: 'black' } : { color: 'green' }}
        >
          {variant} <br />
          <Typography variant="caption">{date}</Typography>
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {title} <br />
          {author ? <Author author={author} /> : null}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {!description
            ? null
            : expanded
              ? description
              : description?.substring(0, 100) + (description && description.length > 100
                ? '...'
                : '')
          }
        </Typography>
        {description && description.length > 100 && (
          <Typography component='span' variant='caption' sx={{ cursor: 'pointer' }} onClick={handleToggleExpand}>
            {expanded ? 'Show Less' : 'Read More'}
          </Typography>
        )}
      </SyledCardContent>
    </SyledCard>
  )
}

export default AppCard;