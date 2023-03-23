
import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import { useState } from 'react';

export default function SaleCard({ title, content }){
  const [isHover, setIsHover] = useState(false);

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
      <CardHeader title={title} />
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardActions>
        <Button>Ver más</Button>
      </CardActions>
    </Card>
    )
}
