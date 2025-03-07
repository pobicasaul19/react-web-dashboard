import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState, Suspense, lazy } from 'react';
import { Article } from '../models/Article';
import { Company } from '../models/Company';
import ArticleService from '../services/ArticleService';
import CompanyService from '../services/CompanyService';
import { SkeletonCard } from '../components/SkeletonCard';

const AppCard = lazy(() => import('../components/AppCard'));

export function HomePage() {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [companyList, setCompanyList] = useState<Company[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          ArticleService.getArticles(),
          CompanyService.getCompanies()
        ]);
        const [articles, companies] = response;
        setArticleList(articles);
        setCompanyList(companies);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        All Categories
      </Typography>
      <Grid container spacing={2} columns={12}>
        {companyList.slice(0, 2).map((item, i) => (
          <Grid key={i} size={{ xs: 12, md: 6 }}>
            <Suspense fallback={<SkeletonCard />}>
              <AppCard
                image={item.logo}
                title={item.name}
                variant={'Company'}
                status={item.status}
                date={undefined}
                editor={undefined}
                writer={undefined}
                description={undefined}
                editable={undefined}
              />
            </Suspense>
          </Grid>
        ))}

        {articleList.map((item, i) => (
          <Grid key={i} size={{ xs: 12, md: 4 }}>
            <Suspense fallback={<SkeletonCard />}>
              <AppCard
                image={item.image}
                variant={item.status}
                title={item.title}
                description={item.content}
                writer={item.writer}
                editor={item.editor}
                date={item.date}
                status={undefined}
                editable={undefined}
              />
            </Suspense>
          </Grid>
        ))}
      </Grid>
    </>
  );
}