/* eslint-disable react/prop-types */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';
import { getCreditStatus, getTermType, getPaymentType } from '../../../utils/parseEnums';
import { fCurrency } from '../../../utils/formatNumber';


export default function Review(props) {
  const {landToSell, customerToSell, beforeContractCreated, beforeCreditCreated} = props;
  console.log(props.beforeCreditCreated)

  const handleIsCredit = () => {
    if(beforeContractCreated.paymentType === 'CREDIT' )
      return (
        <>
          <Grid item container direction="column" xs={12} >
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Resumen Crédito
              </Typography>
              <List disablePadding>
                <ListItem key="paymentDay" sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Dia de pago:"  />
                  <Typography variant="body2">{beforeCreditCreated.paymentDay}</Typography>
                </ListItem>
                <ListItem key="startDate" sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Fecha de inicio:"  />
                  <Typography variant="body2">{beforeCreditCreated.startDate ? format(beforeCreditCreated.startDate, 'MM/dd/yyyy') : '' }</Typography>
                </ListItem>
                <ListItem key="endDate" sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Fecha fin:"  />
                  <Typography variant="body2">{beforeCreditCreated.endDate ? format(beforeCreditCreated.endDate, 'MM/dd/yyyy') : '' }</Typography>
                </ListItem>
                <ListItem key="termType" sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Tipo de pago:"  />
                  <Typography variant="body2">{getTermType(beforeCreditCreated.termType)?.text}</Typography>
                </ListItem>
                <ListItem key="termQuantity" sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Cantidad de pagos:"  />
                  <Typography variant="body2">{beforeCreditCreated.termQuantity}</Typography>
                </ListItem>
                <ListItem key="status" sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Estado del credito:"  />
                  <Typography variant="body2">{getCreditStatus(beforeCreditCreated.status)?.status}</Typography>
                </ListItem>
                <ListItem key="interestRate" sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Tasa de interés:"  />
                  <Typography variant="body2">{beforeCreditCreated.interestRate}</Typography>
                </ListItem>
                <ListItem key="totalDebt" sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Deuda total:"  />
                  <Typography variant="body2">{fCurrency(beforeCreditCreated.totalDebt)}</Typography>
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
        Resumen Contrato
      </Typography>
      <List disablePadding>
          <ListItem key={beforeContractCreated.paymentType} sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Tipo de Pago:"  />
            <Typography variant="body2">{getPaymentType(beforeContractCreated.paymentType).text}</Typography>
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
            <Typography variant="body2">{fCurrency(landToSell.price)}</Typography>
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