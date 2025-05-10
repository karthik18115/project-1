import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const PharmacyOverview = () => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Pharmacy Overview
    </Typography>
    <Typography>
      Welcome to the pharmacy dashboard. Manage prescription queue and dispense medications.
    </Typography>
  </Container>
);

export default PharmacyOverview; 