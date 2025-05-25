import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { useStore } from '../store';

const businessTypes = [
  {
    id: 'retail',
    name: 'Retail',
    description: 'Manage your retail business with AI-powered customer service',
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Handle restaurant reservations and customer inquiries',
  },
  {
    id: 'service',
    name: 'Service Business',
    description: 'Manage appointments and service requests',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Handle online store inquiries and orders',
  },
];

const Dashboard: React.FC = () => {
  const { businessType, setBusinessType } = useStore();
  const navigate = useNavigate();

  const handleBusinessSelect = (type: string) => {
    setBusinessType(type);
    navigate('/chat');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Your Business Type
      </Typography>
      <Grid container spacing={3}>
        {businessTypes.map((type) => (
          <Grid item xs={12} sm={6} md={3} key={type.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {type.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {type.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleBusinessSelect(type.id)}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard; 