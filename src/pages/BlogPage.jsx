import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import { verify } from '../common/verify';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import Loader from '../components/common/Loader';


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null)

  useEffect(() => {
    setLoading(true)
    const res = verify();
    setResponse(res)
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!response) {
    return (
      <>
        <Loader loading={loading}/>
      </>
    )
  }

  if(response.status === 201) {
    return (
      <>
        <Helmet>
          <title> Dashboard: Blog | Minimal UI </title>
        </Helmet>
  
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Blog
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Post
            </Button>
          </Stack>
  
          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <BlogPostsSearch posts={POSTS} />
            <BlogPostsSort options={SORT_OPTIONS} />
          </Stack>
  
          <Grid container spacing={3}>
            {POSTS.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
  
}
