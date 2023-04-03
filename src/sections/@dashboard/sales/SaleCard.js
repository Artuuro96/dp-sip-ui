/* eslint-disable react/prop-types */

import { Accordion, AccordionDetails, AccordionSummary, Card, CardHeader, CardContent, CardActions, Button, List, ListItem, ListItemText, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

export default function SaleCard({ title, content }){
  const [isHover, setIsHover] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleShowCredit = () => {
    if(content.credit?._id) {
      return (
        <p>
          <Accordion
            expanded={isExpanded}
            onChange={handleToggleExpand}
            style={{
              marginTop: 10,
              borderLeft: '5px solid #3366FF',
              boxShadow: isHover ? '0px 0px 12px 0px rgba(0, 0, 0, 1)' : '0px 0px 6px 0px rgba(0, 0, 0, 0.2)',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle1">Información de crédito</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
              <Grid item container direction="column" xs={12} spacing={2}>
                <Grid item>
                  <Typography variant="h6" gutterBottom>
                    Crédito
                  </Typography>
                </Grid>
                <Grid item container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Número de crédito:
                  </Typography>
                  <Typography variant="body2">
                    {content.credit._id}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Estado del crédito:
                  </Typography>
                  <Typography variant="body2">
                    {content.credit.status}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Fecha de inicio:
                  </Typography>
                  <Typography variant="body2">
                    {new Date(content.credit.startDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Fecha fin:
                  </Typography>
                  <Typography variant="body2">
                    {new Date(content.credit.endDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Estado del credito:
                  </Typography>
                  <Typography variant="body2">
                    {content.credit.status}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Deuda total:
                  </Typography>
                  <Typography variant="body2">
                    {content.credit.totalDebt}
                  </Typography>
                </Grid>
                </Grid>
              </Grid>
              </Typography>
            </AccordionDetails>
          </Accordion>
          
        </p>
      )
    }
    return <></>
  }

  return (
    <Card
        sx={{
          marginTop: 3,
          borderRadius: 4,
          boxShadow: (theme) => `0px 0px 12px 0px ${theme.palette.grey[300]}`,
          backgroundColor: (theme) => theme.palette.background.paper,
          transition: 'all .3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: (theme) => `0px 0px 24px 0px ${theme.palette.grey[500]}`,
          },
        }}
      >
        <CardHeader
          title={`Terreno: ${title}`}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.common.white,
            borderRadius: '4px 4px 0 0',
            padding: 2,
          }}
        />
        <CardContent sx={{ padding: 2 }}>
          <List disablePadding>
            <ListItem key={content.customer?.name} sx={{ py: 1 }}>
              <ListItemText primary="Cliente:" />
              <Typography variant="body2">{content.customer?.name}</Typography>
            </ListItem>
            <ListItem key={content.contract?.paymentType} sx={{ py: 1 }}>
              <ListItemText primary="Tipo de Pago:" />
              <Typography variant="body2">
                {content.contract?.paymentType === 'CREDIT' ? 'CREDITO' : 'PAGO COMPLETO'}
              </Typography>
            </ListItem>
          </List>
          {handleShowCredit()}
        </CardContent>
      </Card>
    )
}
