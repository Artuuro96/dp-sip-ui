/* eslint-disable react/prop-types */

import { Card, CardHeader, CardContent, CardActions, Button, List, ListItem, ListItemText, Typography, Grid } from '@mui/material';
import { useState } from 'react';

export default function SaleCard({ title, content }){
  const [isHover, setIsHover] = useState(false);
  const paymentTypes = [
    { value: 'FULLPAYMENT', label: 'PAGO COMPLETO' },
    { value: 'CREDIT', label: 'CREDITO' },
  ];
  const statusOptions = [
    { value: 'DISPONIBLE', label: 'DISPONIBLE' },
    { value: 'VENDIDO', label: 'VENDIDO' },
    { value: 'LIQUIDADO', label: 'LIQUIDADO' },
    { value: 'APARTADO', label: 'APARTADO' },
    { value: 'REUBICAR', label: 'REUBICAR' },
    { value: 'SRMIGUEL', label: 'SRMIGUEL' },
    { value: 'INVADIDO', label: 'INVADIDO' },
    { value: 'AFECTADO', label: 'AFECTADO' },
    { value: 'BAJA', label: 'BAJA' },
  ];

  const handleShowCredit = () => {
    if(content.credit?._id) {
      return (
        <p>
          <Grid item container direction="column" xs={12} >
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Credito
              </Typography>
              <List disablePadding>
                <ListItem key={content.credit._id} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Numero de credito:"  />
                  <Typography variant="body2">{content.credit._id}</Typography>
                </ListItem>
                <ListItem key={content.credit.startDate} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Fecha de inicio:"  />
                  <Typography variant="body2">{content.credit.startDate.split('T')[0]}</Typography>
                </ListItem>
                <ListItem key={content.credit.endDate} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Fecha fin:"  />
                  <Typography variant="body2">{content.credit.endDate.split('T')[0]}</Typography>
                </ListItem>
                <ListItem key={content.credit.status} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Estado del credito:"  />
                  <Typography variant="body2">{content.credit.status}</Typography>
                </ListItem>
                <ListItem key={content.credit.totalDebt} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Deuda total:"  />
                  <Typography variant="body2">{content.credit.totalDebt}</Typography>
                </ListItem>
              </List>
          </Grid>
        </p>
      )
    }
    return <></>
  }

  return (
    <Card  
      style={{
        marginTop: 10,
        borderLeft: '5px solid #3366FF',
        boxShadow: isHover ? '0px 0px 12px 0px rgba(0, 0, 0, 1)' : '0px 0px 6px 0px rgba(0, 0, 0, 0.2)',
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CardHeader title={`Terreno: ${title}`} />
      <CardContent>
        <List disablePadding>
            <ListItem key={content.customer?.name} sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Cliente:" />
              <Typography variant="body2">{content.customer?.name}</Typography>
            </ListItem>
            <ListItem key={content.contract?.paymentType} sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Tipo de Pago:" />
              <Typography variant="body2">{ content.contract?.paymentType === 'CREDIT' ?  'CREDITO' : 'PAGO COMPLETO' }</Typography>
            </ListItem>
        </List>
        <p>{handleShowCredit()}</p>
      </CardContent>
    </Card>
    )
}
