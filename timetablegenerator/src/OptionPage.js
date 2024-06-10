import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

function OptionPage() {
  const navigate = useNavigate();

  const handleCapRoundClick = () => {
    // Navigate to the CAP Round form (currently commented out)
    // navigate('/cap-round');
    alert('CAP Round form will be implemented here');
  };

  const handleSpotRoundClick = () => {
    // Navigate to the Spot Round form (currently commented out)
    // navigate('/spot-round');
    alert('Spot Round form will be implemented here');
  };

  return (
     <Container sx={{ mt: 16 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins' }} >
          Choose Your Round
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleCapRoundClick} sx={{ mt: 2,fontFamily: 'Poppins',bgcolor: 'orange',
           borderRadius: '20px', '&:hover': {bgcolor: 'darkblue',},  
         }} >
          CAP Round
        </Button>
        <Button variant="contained" color="primary" onClick={handleSpotRoundClick} sx={{ mt: 2,fontFamily: 'Poppins',bgcolor: 'orange',
           borderRadius: '20px', '&:hover': {bgcolor: 'darkblue',},
         }}>
          Spot Round
        </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default OptionPage;
