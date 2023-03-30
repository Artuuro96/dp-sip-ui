/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid';
import { Autocomplete, FormControl, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState, useEffect  } from 'react';

import { isNil } from 'lodash';
import { PromerClient } from '../../../api/PromerClient';

export default function ContractForm(props) {
  const [defaultLimitResults] = useState(20);
  const [landsResult, setLandsResult] = useState([]);
  
  const [loadingLands, setLoadingLands] = useState(false)

  const [customersResult, setCustomersResult] = useState([]);
  
  const [loadingCustomers, setLoadingCustomers] = useState(false)

  const {landToSell,customerToSell, paymentType, setLandToSell, setCustomerToSell, setPaymentType } = props;

  const paymentTypes = [
    { value: 'FULLPAYMENT', label: 'PAGO COMPLETO' },
    { value: 'CREDIT', label: 'CREDITO' },
  ];
  

  useEffect(() => {
    getLands();
    getCustomers();
  }, []);




  const getLands = async() => {
    const search = {
      limit: defaultLimitResults,
      skip: 1
    }
    const promerClient = new PromerClient();
    try {
      const res = await promerClient.findAllLands(search);
      const landWithName = res.data.result.map(land =>  ({label: land.name, land }))
      setLandsResult(landWithName);
    } catch (error) {
      console.error(error);
    }
  }
  const searchLands = async(event) => {
    const landsName = landsResult.map(land=>land.label.toLowerCase())
    const condition = event.target.value ? new RegExp(event.target.value.toLowerCase()) : new RegExp(event.target.value) ;
    const result = landsName.filter(name=> condition.test(name));
    if (result.length === 0 && event.target.value !== '' && event.target.value !== 0) {
      setLoadingLands(true);
      console.log("Estoy buscando")
      const search = {
        limit: defaultLimitResults,
        skip: 1,
        keyValue: event.target.value
      }
      const promerClient = new PromerClient();
      try {
        const res = await promerClient.findAllLands(search);
        const landWithName = res.data.result.map(land =>  ({label: land.name, land }))
        setLandsResult(landWithName);
        setLoadingLands(false);
      } catch (error) {
        console.error(error);
      }
    }
  }
  const getCustomers  = async() => {
    const search = {
      limit: defaultLimitResults,
      skip: 1
    }
    const promerClient = new PromerClient();
    try {
      const res = await promerClient.findCustomers(search);
      const customersWithName = res.map(customer =>  ({label: customer.name, customer }))
      setCustomersResult(customersWithName);
    } catch (error) {
      console.error(error);
    }
  }

  const searchCustomers = async(event) => {
    const customersName = customersResult.map(customer=>customer.label.toLowerCase())
    const condition = event.target.value ? new RegExp(event.target.value.toLowerCase()) : new RegExp(event.target.value) ;
    const result = customersName.filter(name=> condition.test(name));
    if (result.length === 0 && event.target.value !== '' && event.target.value !== 0) {
      setLoadingCustomers(true);
      console.log("Estoy buscando")
      const search = {
        limit: defaultLimitResults,
        skip: 1,
        keyValue: event.target.value
      }
      const promerClient = new PromerClient();
      try {
        const res = await promerClient.findAllcustomers(search);
        const customersWithName = res.map(customer =>  ({label: customer.name, customer }))
        setCustomersResult(customersWithName);
        setLoadingCustomers(false);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const setLand = (event, value) => {
    if(!isNil(value)) {
      const result =  landsResult.find(land => land.label === value.label);
    setLandToSell(result.land)
    } else {
      setLandToSell({})
    }
  }

  const setCustomer = (event, value) => {
    if(!isNil(value)) {
      const result =  customersResult.find(customer => customer.label === value.label);
    console.log(result)
    setCustomerToSell(result.customer)
    } else {
      setCustomerToSell({})
    }
  }

  const renderLandArea = () => {
    if(!isNil(landToSell.name))
      return (
        <><Grid item xs={12} sm={6}>
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
          </Grid></>
      )
    return <></>
  }

  const renderCustomerArea = () => {
    if(!isNil(customerToSell.name))
    return (
      <>
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
        </>
    )
    return <></>
  }

  const handlePaymentType = (event) =>{
    setPaymentType(event.target.value)
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Creación de contrato
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={setLand}
            onInputChange={searchLands}
            options={landsResult}
            sx={{ width: 300 }}
            loading={loadingLands}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Terreno" />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={setCustomer}
            onInputChange={searchCustomers}
            options={customersResult}
            sx={{ width: 300 }}
            loading={loadingCustomers}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Cliente" />}
          />
        </Grid>
        {renderLandArea()}
        {renderCustomerArea()}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="paymentType-label">Tipo de pago</InputLabel>
            <Select
              labelId="paymentType-label"
              id="paymentType"
              name="paymentType"
              label="Tipo de pago"
              value={paymentType}
              onChange={handlePaymentType}
            >
              {paymentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}