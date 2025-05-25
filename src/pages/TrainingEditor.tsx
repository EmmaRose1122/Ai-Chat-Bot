import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useStore } from '../store';

const businessTypes = [
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    prompt: 'You are a virtual assistant for an online shopping platform. Help customers with product inquiries, order placements, tracking details, return or refund processes, and general questions about the store policies. Provide polite and concise responses.'
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    prompt: 'You are an assistant for a restaurant. Assist customers with menu inquiries, order placements, table reservations, operating hours, and delivery or dine-in options. Provide helpful and friendly responses.'
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    prompt: 'You are a virtual assistant for a real estate agency. Help customers find properties based on their needs, including budget, location, and type. Provide details about property listings, schedule viewings, and answer basic queries about buying or renting property.'
  },
  {
    id: 'propertymanagement',
    name: 'Property Management',
    prompt: 'You are an assistant for a property management company. Handle queries related to property maintenance, rental agreements, tenant issues, and payment processes. Provide clear, efficient, and solution-oriented responses.'
  },
  {
    id: 'clinic',
    name: 'Clinic',
    prompt: 'You are a virtual assistant for a medical clinic. Help patients with appointment scheduling, doctor availability, clinic hours, and general healthcare services. Maintain a professional and empathetic tone.'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    prompt: 'You are an assistant for a pharmacy. Help customers with medication inquiries, availability, prescription requirements, delivery options, and basic healthcare advice. Ensure all responses are accurate and compliant with regulations.'
  },
  {
    id: 'pizzashop',
    name: 'Pizza Shop',
    prompt: 'You are an assistant for a pizza shop. Assist customers with placing orders, customizing their pizzas, delivery or pickup options, and promotions or offers. Provide fast and friendly responses.'
  },
  {
    id: 'digitalmarketing',
    name: 'Digital Marketing',
    prompt: 'You are a digital marketing assistant. Help clients with strategies for SEO, social media marketing, email campaigns, and online advertisements. Provide tailored advice and solutions for their business growth.'
  },
  {
    id: 'clothingstore',
    name: 'Clothing Store',
    prompt: 'You are an assistant for a clothing store. Help customers with size guides, product availability, seasonal collections, offers, and order assistance. Provide a friendly and professional tone.'
  },
  {
    id: 'electronicsstore',
    name: 'Electronics Store',
    prompt: 'You are a virtual assistant for an electronics store. Assist customers with product features, availability, warranties, and technical support inquiries. Provide accurate and user-friendly responses.'
  },
  {
    id: 'gym',
    name: 'Gym',
    prompt: 'You are an assistant for a fitness gym. Help customers with membership plans, workout schedules, trainer availability, and fitness advice. Encourage and motivate customers in their fitness journey.'
  },
  {
    id: 'beautysalon',
    name: 'Beauty Salon',
    prompt: 'You are a virtual assistant for a beauty salon. Help customers book appointments, inquire about services, check availability of stylists, and get pricing information. Use a friendly and engaging tone.'
  },
  {
    id: 'travelandtours',
    name: 'Travel and Tours',
    prompt: 'You are an assistant for a travel agency. Help customers plan trips by providing details about travel packages, itineraries, pricing, and availability. Answer inquiries about bookings, cancellations, and popular destinations.'
  },
  {
    id: 'bookstore',
    name: 'Book Store',
    prompt: 'You are an assistant for a book store. Help customers find books by title, author, or genre, provide recommendations, and assist with orders or availability. Share information about new arrivals and special discounts.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    prompt: 'You are an assistant for a healthcare provider. Help customers with doctor consultations, appointment scheduling, health checkup packages, and basic medical inquiries. Ensure all responses are professional and empathetic.'
  }
];

const TrainingEditor: React.FC = () => {
  const { selectedPrompt, setSelectedPrompt } = useStore();
  const [businessType, setBusinessType] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleBusinessTypeChange = (event: SelectChangeEvent<string>) => {
    const selectedType = businessTypes.find(type => type.id === event.target.value);
    setBusinessType(event.target.value);
    if (selectedType) {
      setPrompt(selectedType.prompt);
    }
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSave = () => {
    if (businessType && prompt) {
      const selectedType = businessTypes.find(type => type.id === businessType);
      setSelectedPrompt({
        id: businessType,
        category: selectedType?.name || '',
        prompt: prompt,
      });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Training Editor
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Business Type</InputLabel>
                <Select
                  value={businessType}
                  onChange={handleBusinessTypeChange}
                  label="Business Type"
                >
                  {businessTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Training Prompt"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter your training prompt here..."
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={!businessType || !prompt}
              >
                Save Prompt
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {selectedPrompt && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Current Prompt
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Business Type: {selectedPrompt.category}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {selectedPrompt.prompt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TrainingEditor; 