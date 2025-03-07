import Grid from '@mui/material/Grid2';
import AppButton from '../commons/button';
import { Box, Typography } from '@mui/material';
import { Company } from '../models/Company';
import CompanyService from '../services/CompanyService';
import { SkeletonCard } from '../components/SkeletonCard';
import { useEffect, useState, Suspense, lazy } from 'react';

const AppCard = lazy(() => import('../components/AppCard'));

export function CompanyPage() {
  const [companyList, setCompanyList] = useState<Company[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await CompanyService.getCompanies();
        setCompanyList(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticle();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h5" gutterBottom>
        Company Management
      </Typography>
      <Box sx={{ maxWidth: 300 }}>
        <AppButton editor={true} label='Create new company' color='info'/>
      </Box>
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
                editable={true}
                label='Company'
              />
            </Suspense>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}