import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { DialogActions, DialogContent, Dialog } from '@mui/material';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
import CreateContract from './CreateContract';
import PaymentForm from './PaymentForm';
import Review from './ReviewForm';
import { PromerClient } from '../../../api/PromerClient';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Creacion de venta', 'Creacion de credito', 'Confirmacion'];



export default function NewSaleDg({openSaleDg, handleSaleDg }) {
  const [landToSell, setLandToSell] = useState('');
  const [customerToSell, setCustomerToSell] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const [contractCreated, setContractCreated] = useState({});
  const [creditCreated, setCreditCreated] = useState({});

  const [creditToCreate, setCreditToCreate] = useState({});

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CreateContract 
        landToSell={landToSell}
        setLandToSell={setLandToSell}
        customerToSell={customerToSell}
        setCustomerToSell={setCustomerToSell}
        paymentType={paymentType}
        setPaymentType={setPaymentType} />;
      case 1:
        return <PaymentForm
        landToSell={landToSell}
        customerToSell={customerToSell}
        paymentType={paymentType}
        contractCreated={contractCreated}
        creditToCreate={creditToCreate}
        setCreditToCreate={setCreditToCreate}
        />;
      case 2:
        return <Review 
        landToSell={landToSell}
        customerToSell={customerToSell}
        contractCreated={contractCreated}
        creditCreated={creditCreated}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

  const createContract = async () => {
    const promerClient = new PromerClient();
    try {
      const contract = {
        landId: landToSell._id,
        customerId: customerToSell._id,
        paymentType,
      }
      const res = await promerClient.createContract(contract);
      if (!isEmpty(res._id)) {
        setContractCreated(res);
        console.log(res)
        if(res.paymentType === "FULLPAYMENT") {
          setActiveStep(activeStep + 2);
        } else {
          setActiveStep(activeStep + 1);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const createCredit = async () => {
    const promerClient = new PromerClient();
    try {
      const credit = {
        contractId: contractCreated._id,
        customerId: contractCreated.customerId,
        landId: contractCreated.landId,
        startDate: creditToCreate.startDate,
        endDate: creditToCreate.endDate,
        status: 'ASSIGNED',
        termType: creditToCreate.termType,
        termQuantity: Number(creditToCreate.termQuantity),
        paymentDay:  Number(creditToCreate.paymentDay),
        totalDebt:  Number(landToSell.price),
        interestRate:  Number(creditToCreate.interestRate),
      }
      const res = await promerClient.createCredit(credit);
      if (!isEmpty(res._id)) {
        setCreditCreated(res);
        console.log(res)
        setActiveStep(2);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleNext = async () => {
    if(activeStep === 0) {
       await createContract()
       return
    }
    if(activeStep === 1) {
      await createCredit()
   }
  };

  const cleanAtClose = () => {
    setTimeout(() => {
      setLandToSell('');
      setCustomerToSell('');
      setPaymentType('');
      setContractCreated({});
      setCreditCreated({});
      setCreditToCreate({});
      setActiveStep(0);
    }, 500);
  }

  const handleValidateNext = () => {
    console.log(creditToCreate, activeStep)
    if((!isEmpty(landToSell) && !isEmpty(customerToSell) && paymentType !== '') && activeStep === 0)
      return false;
    if(creditToCreate.created && activeStep === 1) 
      return false;
    return true
  }

  const handleNextShowButton = () => {
    if(activeStep !== 2)
      return (
        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }} disabled={handleValidateNext()} >
            {'Siguiente'}
        </Button>
      )
    return <></>
  }

  return (
    <Dialog fullWidth="md" maxWidth="md" open={openSaleDg} onClose={() => handleSaleDg(false)}>
      <DialogContent>
        <Container component="main" maxWidth="md">
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h4" gutterBottom>
            Nueva Venta
          </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {handleNextShowButton()}
                  
                </Box>
              </>
            }
          </Paper>
          <Copyright />
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {handleSaleDg(false); cleanAtClose()}}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
