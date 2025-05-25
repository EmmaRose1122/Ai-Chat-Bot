import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import { useStore } from '../store';

const Settings: React.FC = () => {
  const { apiKeys, setApiKey, selectedModel, setSelectedModel } = useStore();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                API Keys
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="ChatGPT API Key"
                  type="password"
                  value={apiKeys.chatgpt}
                  onChange={(e) => setApiKey('chatgpt', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Gemini API Key"
                  type="password"
                  value={apiKeys.gemini}
                  onChange={(e) => setApiKey('gemini', e.target.value)}
                  fullWidth
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                AI Model
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select Model</InputLabel>
                <Select
                  value={selectedModel}
                  onChange={(e: SelectChangeEvent) => setSelectedModel(e.target.value)}
                  label="Select Model"
                >
                  <MenuItem value="chatgpt">ChatGPT (GPT-3.5 Turbo)</MenuItem>
                  <MenuItem value="gemini-1.5-flash">Gemini 1.5 Flash</MenuItem>
                  <MenuItem value="gemini-2.0-flash">Gemini 2.0 Flash</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 