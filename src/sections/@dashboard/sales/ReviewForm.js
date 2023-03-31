/* eslint-disable react/prop-types */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';


export default function Review(props) {
  const {landToSell, customerToSell, contractCreated, creditCreated} = props;

  const handleIsCredit = () => {
    if(contractCreated.paymentType === 'CREDIT' )
      return (
        <>
          <Grid item container direction="column" xs={12} >
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Resumen credito
              </Typography>
              <List disablePadding>
                <ListItem key={creditCreated.paymentDay} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Dia de pago:"  />
                  <Typography variant="body2">{creditCreated.paymentDay}</Typography>
                </ListItem>
                <ListItem key={creditCreated.startDate} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Fecha de inicio:"  />
                  <Typography variant="body2">{creditCreated.startDate}</Typography>
                </ListItem>
                <ListItem key={creditCreated.endDate} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Fecha fin:"  />
                  <Typography variant="body2">{creditCreated.endDate}</Typography>
                </ListItem>
                <ListItem key={creditCreated.termType} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Tipo de pago:"  />
                  <Typography variant="body2">{creditCreated.termType}</Typography>
                </ListItem>
                <ListItem key={creditCreated.termQuantity} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Cantidad de pagos:"  />
                  <Typography variant="body2">{creditCreated.termQuantity}</Typography>
                </ListItem>
                <ListItem key={creditCreated.status} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Estado del credito:"  />
                  <Typography variant="body2">{creditCreated.status}</Typography>
                </ListItem>
                <ListItem key={creditCreated.interestRate} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Tasa de interés:"  />
                  <Typography variant="body2">{creditCreated.interestRate}</Typography>
                </ListItem>
                <ListItem key={creditCreated.totalDebt} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Deuda total:"  />
                  <Typography variant="body2">{creditCreated.totalDebt}</Typography>
                </ListItem>
              </List>
          </Grid>
        </>
        
      )
    return <></> 
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Resumen de creacion de contrato
      </Typography>
      <List disablePadding>
          <ListItem key={contractCreated._id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Numero de Contrato:" />
            <Typography variant="body2">{contractCreated._id}</Typography>
          </ListItem>
          <ListItem key={contractCreated.paymentType} sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Tipo de Pago:"  />
            <Typography variant="body2">{contractCreated.paymentType}</Typography>
          </ListItem>
          <ListItem key={landToSell.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Nombre del terreno vendido:"  />
            <Typography variant="body2">{landToSell.name}</Typography>
          </ListItem>
          <ListItem key={landToSell.status} sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Status:"  />
            <Typography variant="body2">{landToSell.status}</Typography>
          </ListItem>
          <ListItem key={landToSell.price} sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Precio:"  />
            <Typography variant="body2">{landToSell.price}</Typography>
          </ListItem>
          <ListItem key={customerToSell.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Nombre Cliente:"  />
            <Typography variant="body2">{customerToSell.name}</Typography>
          </ListItem>
      </List>
      <Grid container spacing={2}>
        {handleIsCredit()}
        
      </Grid>
    </>
  );
}