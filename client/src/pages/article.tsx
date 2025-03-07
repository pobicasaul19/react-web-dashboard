import { Box, Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AppCard from '../components/AppCard';
import { useEffect, useState } from 'react';
import { Article } from '../models/Article';
import ArticleService from '../services/ArticleService';


export function ArticlePage() {
  const [articleList, setArticleList] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await ArticleService.getArticles();
        setArticleList(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticle();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box>
        <Chip size="medium" label="Articles" />
      </Box>
      <Grid container spacing={2} columns={12}>
        {articleList.map((item, i) => (
          <Grid key={i} size={{ xs: 12, md: 4 }}>
            <AppCard
              image={item.image}
              variant={item.status}
              title={item.title}
              description={item.content}
              author={item.editor ?? item.writer ?? ''}
              date={item.date}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}