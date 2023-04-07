export const getCreditStatus = (status) => {
  const creditStatusInfo = {};
  switch(status) {
    case 'FINISHED': 
      creditStatusInfo.color = 'primary';
      creditStatusInfo.status = 'FINALIZADO';
      break;
    case 'ASSIGNED':
      creditStatusInfo.color = 'success';
      creditStatusInfo.status = 'ASIGNADO';
      break;
    case 'CREATED':
      creditStatusInfo.color = 'info';
      creditStatusInfo.status = 'CREADO';
      break;
    case 'CANCELADO':
      creditStatusInfo.color = 'error';
      creditStatusInfo.status = 'CANCELADO';
      break;
    default:
      creditStatusInfo.status = '';
      break;
  }
  return creditStatusInfo;
}

export const getTermType = (termType) => {
  const termTypeInfo = {};
  switch(termType) {
    case 'MONTHLY': 
      termTypeInfo.text = 'MENSUAL';
      break;
    case 'WEEKLY':
      termTypeInfo.text = 'SEMANAL';
      break;
    default:
      termTypeInfo.text = '';
      break;
  }
  return termTypeInfo;
}

export const getPaymentType = (paymentType) => {
  const paymentTypeInfo = {};
  switch(paymentType) {
    case 'CREDIT': 
      paymentTypeInfo.text = 'CREDITO';
      break;
    case 'FULLPAYMENT':
      paymentTypeInfo.text = 'CONTADO';
      break;
    default:
      paymentTypeInfo.text = '';
      break;
  }
  return paymentTypeInfo;
}