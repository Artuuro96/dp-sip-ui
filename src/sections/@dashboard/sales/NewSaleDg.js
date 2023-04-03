import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Alert, DialogActions, DialogContent, Dialog, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { isEmpty, isNil } from 'lodash';
import CreateContract from './CreateContract';
import PaymentForm from './PaymentForm';
import Review from './ReviewForm';
import { PromerClient } from '../../../api/PromerClient';

const steps = ['Creacion de venta', 'Creacion de credito', 'Confirmacion'];



export default function NewSaleDg({openSaleDg, handleSaleDg }) {
  
  const [saleFinished, setSaleFinished] = useState(false)

  const [messageEnd, setMessageEnd] = useState('Error')
  const [openAlert, setOpenAlert] = useState(false)
  const [classAlert, setclassAlert] = useState('error')

  const [landToSell, setLandToSell] = useState('');
  const [customerToSell, setCustomerToSell] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const [contractCreated, setContractCreated] = useState({});
  const [creditCreated, setCreditCreated] = useState({});

  const [beforeContractCreated, setBeforeContractCreated] = useState({});
  const [beforeCreditCreated, setBeforeCreditCreated] = useState({});

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
        beforeContractCreated={beforeContractCreated}
        beforeCreditCreated={beforeCreditCreated}
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
        return res
      }
      return null
    } catch (error) {
      console.error(error);
      return null
    }
  }

  const createCredit = async (contract) => {
    const promerClient = new PromerClient();
    try {
      const credit = {
        contractId: contract._id,
        customerId: contract.customerId,
        landId: contract.landId,
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
        return res
      }
      return null
    } catch (error) {
      console.error(error);
      return null
    }
  }

  const setContractBeforeCreate = () => {
    const contract = {
      landId: landToSell._id,
      customerId: customerToSell._id,
      paymentType,
    }
    setBeforeContractCreated(contract);
  }

  const setCreditBeforCreate = () => {
    const credit = {
      customerId: customerToSell._id,
      landId: landToSell._id,
      startDate: creditToCreate.startDate,
      endDate: creditToCreate.endDate,
      status: 'ASSIGNED',
      termType: creditToCreate.termType,
      termQuantity: Number(creditToCreate.termQuantity),
      paymentDay:  Number(creditToCreate.paymentDay),
      totalDebt:  Number(landToSell.price),
      interestRate:  Number(creditToCreate.interestRate),
    }
    setBeforeCreditCreated(credit)
  }

  const handleNext = async () => {
    if(activeStep === 0) {
      setContractBeforeCreate()
      if(paymentType === "FULLPAYMENT") {
        setActiveStep(activeStep + 2);
      } else {
        setActiveStep(activeStep + 1);
      }
      return
    }
    if(activeStep === 1) {
      setCreditBeforCreate()
      setActiveStep(2);
   }
  };

  const handleBack = async () => {
    if(paymentType === 'CREDIT' && activeStep === 2)
      setActiveStep(activeStep - 1);
    if(activeStep === 1) 
      setActiveStep(0);
  };

  const handleCreateSale = async () => {
    const resContract = await createContract();
    if(paymentType === 'CREDIT' && !isNil(resContract._id)) {
      await createCredit(resContract);
    }
    if (resContract._id) {
      setOpenAlert(true);
      setMessageEnd('Creacion de contrato Exitosa');
      setclassAlert('success');
      setSaleFinished(true)
      setOpenAlert(true);
    }
      
  };

    const handleCloseAlert = () => {
      setOpenAlert(false);
    };

  const cleanAtClose = () => {
    setTimeout(() => {
      setLandToSell('');
      setCustomerToSell('');
      setPaymentType('');
      setContractCreated({});
      setCreditCreated({});
      setCreditToCreate({});
      setBeforeContractCreated({});
      setBeforeCreditCreated({});
      setActiveStep(0);
      setSaleFinished(false);
    }, 500);
  }

  const handleValidateNext = () => {
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

  const handleCreateContractCreditButton = () => {
    if(activeStep === 2 && !saleFinished) {
      if(handleValidateNext()) {
        return (
          <Button variant="contained" onClick={handleCreateSale} sx={{ mt: 3, ml: 1 }} >
              { 'Emitir venta' }
          </Button>
        )
      }
    }
    return <></>

  }

  const handleGoBackButton = () => {
    if(activeStep !== 0  && !saleFinished )
      return (
        <Button  onClick={handleBack} sx={{ mt: 3, ml: 1 }} >
            {'Regresar'}
        </Button>
      )
    return <></>
  }

  return (
    <Dialog fullWidth="md" maxWidth="md" open={openSaleDg} onClose={() => {handleSaleDg(false); cleanAtClose()} }>
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
                    {handleGoBackButton()}
                    {handleNextShowButton()}
                    {handleCreateContractCreditButton()}
                </Box>
              </>
            }
          </Paper>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {handleSaleDg(false); cleanAtClose()}}>Cerrar</Button>
      </DialogActions>
      <Snackbar open={openAlert} autoHideDuration={6000}>
        <Alert  onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} severity={classAlert} sx={{ width: '100%' }}>
          {messageEnd}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
