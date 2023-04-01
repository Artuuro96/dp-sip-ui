import { 
  Container, 
  Typography, 
  Grid,
  Stack,
  Button,
  Pagination,
  PaginationItem,
  Link
} from '@mui/material';
import { useState, useEffect } from 'react';
import NewSaleDg from '../sections/@dashboard/sales/NewSaleDg';
import SaleCard from '../sections/@dashboard/sales/SaleCard';
import SaleCardListHeader from '../sections/@dashboard/sales/SaleListHeader';
import Iconify from '../components/iconify/Iconify';
import { PromerClient } from '../api/PromerClient';
import Loader from '../components/common/Loader';


export default function SalePage() {
  const [loading, setLoading] = useState(false);
  const [pageResult, setPageResult] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [totalContract, setTotalContract] = useState(0);
  const [defaultLimitResults, setDefaultLimitResults] = useState(2);

  const [openSaleDg, setOpenSaleDg] = useState(false);

  useEffect(() => {
    findAllContracts();
  }, []);

  const findAllContracts = async () => {
    const promerClient = new PromerClient();
    try {
      const res = await promerClient.findAllContracts({
        limit: defaultLimitResults,
        skip: actualPage
      });
      setPageResult(res.data.result);
      setActualPage(res.data.page)
      setPages(res.data.pages)
      setTotalContract(res.data.total)
    } catch (error) {
      console.error(error);
    }
  }

  
  const handleSaleDg = (show) => {
    setOpenSaleDg(show)
  }

  const handlePagePageChange = async (event, value) => {
    const promerClient = new PromerClient();
    console.log(value)
    setLoading(true);
    try {
      const res = await promerClient.findAllContracts({
        limit: defaultLimitResults,
        skip: value
      });
      console.log("======>", res.data.result)
      setPageResult(res.data.result);
      setActualPage(value)
      setPages(res.data.pages)
      setTotalContract(res.data.total)
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  if(loading) {
    return (
      <Loader />
    );
  }
  
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Ventas
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleSaleDg(true)}>
          Nueva Venta
        </Button>
      </Stack>
        <NewSaleDg handleSaleDg={handleSaleDg} openSaleDg={openSaleDg} />
        <SaleCardListHeader />
        {pageResult.map((content, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SaleCard 
              title={content?.contract?.landName} 
              content={content} 
            />
          </Grid>
        ))}
        <Stack spacing={2} marginTop={5} alignItems="center">
          <Pagination
            count={pages}
            page={actualPage}
            onChange={handlePagePageChange}
            color="primary"
            hideNextButton={actualPage === pages}
            hidePrevButton={actualPage === 1}
            disabled={defaultLimitResults === 0}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/?page=${item.page}`}
                {...item}
                disabled={actualPage === item.page} 
              />
            )}
          />
        </Stack>
    </Container>
  );
}
