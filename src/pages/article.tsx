import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Article } from '../models/Article';
import ArticleService from '../services/ArticleService';
import AppDataTable from '../components/AppDatatable';
import { Edit } from '@mui/icons-material';

const columns: { label: string }[] = [
  { label: 'Image' },
  { label: 'Title' },
  { label: 'Link' },
  { label: 'Writer' },
  { label: 'Editor' },
  { label: 'Status' },
  { label: 'Action' },
];

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

  const renderCell = (article: Article, column: string) => {
    const columnRenderers: Record<string, JSX.Element | null> = {
      Image: <img
        src={article.image}
        alt={article.title}
        loading="eager"
        decoding="async"
        className="w-24 rounded object-contain"
      />,
      Title: <p className="w-56 truncate ...">{article.title}</p>,
      Link: <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className='underline underline-offset-2 text-indigo-800'
      >
        Source
      </a>,
      Writer: <p className='capitalize'>{article.writer ?? '--'}</p>,
      Editor: <p className='capitalize'>{article.editor ?? '--'}</p>,
      Status: <p>{article.status}</p>,
      Action: <Edit className='cursor-pointer'/>,
    };

    return columnRenderers[column] ?? null;
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h5" gutterBottom>
        Article Management
      </Typography>
      <AppDataTable
        columns={columns}
        rows={articleList}
        renderCell={renderCell}
      />
    </Box>
  );
}