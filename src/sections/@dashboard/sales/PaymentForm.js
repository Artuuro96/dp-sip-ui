/* eslint-disable react/prop-types */
import { useState, useEffect  } from 'react';
import {Grid, Typography, TextField, FormControlLabel, Checkbox, FormControl, MenuItem, InputLabel, Select} from '@mui/material/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro';


import { isNil, isNaN, isEmpty } from 'lodash';

export default function PaymentForm(props) {
  let endDateHelp = ''
  const {landToSell, customerToSell, paymentType, contractCreated, creditToCreate, setCreditToCreate} = props;
  const [startDate, setStartDate] = useState(creditToCreate.startDate ? creditToCreate.startDate : null);
  const [endDate, setEndDate] = useState(creditToCreate.endDate ? creditToCreate.endDate : null);

  const [termType, setTermType] = useState(creditToCreate.termType ? creditToCreate.termType : '');
  const [paymentDay, setPaymentDay] = useState(creditToCreate.paymentDay ? creditToCreate.paymentDay : '');
  const [termQuantity, setTermQuantity] = useState(creditToCreate.termQuantity ? creditToCreate.termQuantity : '');
  const [interestRate, setInterestRate] = useState(creditToCreate.interestRate ? creditToCreate.interestRate : '');

  const termTypes = [
    { value: 'MONTHLY', label: 'MENSUAL' },
    { value: 'WEEKLY', label: 'SEMANAL' },
  ];

  const handleStartDateChange = (date) => {
    const timestamp = Date.parse(date);

    if (isNaN(timestamp) === false)
      setStartDate(date);
  }; 

  const handleEndDateChange = (date) => {
    setEndDate(new Date(date));
  };

  const handlePaymentDay = (event) => {
    setPaymentDay(event.target.value)
  };

  const handleTermQuantity = (event) => {
    setTermQuantity(event.target.value)
  };

  const handleInterestRate = (event) => {
    setInterestRate(event.target.value)
  };

  const handleMaxDate = () => {
    if(!isNil(endDate)){
      return new Date(endDate)
    }
    return new Date("3000-01-01")
  }

  const handleMinDate = () => {
    if(!isNil(startDate)){
      return new Date(startDate)
    }
    return new Date("1900-01-01")
  }

  const handleTermTypes = (event) =>{
    setTermType(event.target.value)
  }

  const handleEndDateValue = () => {
    if(!isNaN(paymentDay) && !isNaN(termQuantity) && !isNil(startDate) && !isEmpty(paymentDay) && !isEmpty(termQuantity)) {
      let endDateToSet = null
      const dateToHandle = new Date(startDate)
      if (termType === 'MONTHLY') {
        if (Number(paymentDay) >= 0 && Number(paymentDay) <= 31){
          endDateToSet = new Date(dateToHandle.setMonth(dateToHandle.getMonth() + Number(termQuantity)))
          setEndDate(endDateToSet)
          endDateHelp = endDateToSet
          console.log("MONTHLYendDateToSet",endDateToSet)
        } else {
          endDateHelp = ''
          setEndDate('')
        }
          
      } else if( termType === 'WEEKLY') {
        if (Number(paymentDay) >= 0 && Number(paymentDay) <= 7){
          endDateToSet = new Date( dateToHandle.setDate(dateToHandle.getDate() + Number(termQuantity) * 7))
          setEndDate(endDateToSet)
          endDateHelp = endDateToSet
          console.log("WEEKLYendDateToSet",endDateToSet)
        } else {
          setEndDate('')
        }
      }
    } else {
      endDateHelp = ''
      setEndDate('')
    }
  }

  useEffect(() => {
    handleEndDateValue();
    handleCreditData();
  }, [startDate, termQuantity, paymentDay, termType, interestRate]);


  const renderCreateCredit = () => {
    if(paymentType === 'CREDIT') {
      return (
        <>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ mt: 2 }} fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns} style={{margin: 5}}>
                <DatePicker 
                  label= "Fecha inicio Credito" 
                  name="startDate" 
                  id="startDate"
                  value={startDate}
                  onChange={(date) => handleStartDateChange(date)}
                />
              </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl sx={{ mt: 2 }} fullWidth>
          <TextField
            label="Fecha fin Credito"
            name="endDate"
            id="endDate"
            disabled
            value={endDate ? format(endDate, 'MM/dd/yyyy') : ''}
          />
        </FormControl>
        </Grid>
        </>
      )
    } 
      return ( <>
      </> )
  }

  const handleCreditData = () => {
    let credit = {}
    if(!isNil(endDateHelp) && (endDateHelp) && !isNaN(interestRate) && !isEmpty(interestRate)) {
      credit = {
        startDate,
        endDate,
        termType,
        termQuantity,
        paymentDay,
        interestRate,
        created: true
      }
      setCreditToCreate(credit)
    } else {
      console.log("else")
      credit = {
        created: false
      }
      setCreditToCreate(credit)
    }
  }
  
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Contract Created
      </Typography>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="landToSell"
              name="landToSell"
              label="Terreno seleccionado"
              fullWidth
              disabled
              value={landToSell.name}
              variant="standard"
              />
          </Grid><Grid item xs={12} sm={6}>
            <TextField
              id="landToSellStatus"
              name="landToSellStatus"
              label="Estado del terreno"
              fullWidth
              disabled
              value={landToSell.status}
              variant="standard" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="customerToSell"
              name="customerToSell"
              label="Cliente Seleccionado"
              fullWidth
              disabled
              variant="standard"
              value={customerToSell.name}
            />
          </Grid>
        <Grid item xs={12} >
          <FormControl fullWidth margin="normal">
            <InputLabel id="paymentType-label">Tipo de pago</InputLabel>
            <Select
              labelId="paymentType-label"
              id="paymentType"
              name="paymentType"
              label="Tipo de credito"
              value={termType}
              onChange={handleTermTypes}
            >
              {termTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
              id="termQuantity"
              name="termQuantity"
              label="Cantidad de pagos"
              fullWidth
              type="number"
              value={termQuantity}
              variant="standard"
              onChange={handleTermQuantity}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="paymentDay"
              name="paymentDay"
              label="Dia de pago"
              fullWidth
              type="number"
              value={paymentDay}
              onChange={handlePaymentDay}
              variant="standard" />
          </Grid>
          {renderCreateCredit()}
          <Grid item xs={12} sm={6}>
            <TextField
              id="interestRate"
              name="interestRate"
              label="Tasa de Interés"
              fullWidth
              type="number"
              value={interestRate}
              onChange={handleInterestRate}
              variant="standard" />
          </Grid>
      </Grid>
    </>
  );
}