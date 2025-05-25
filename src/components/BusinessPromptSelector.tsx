import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import { useStore } from '../store';
import { businessPrompts } from '../data/businessPrompts';

const BusinessPromptSelector: React.FC = () => {
  const { selectedPrompt, setSelectedPrompt } = useStore();

  const handlePromptChange = (event: SelectChangeEvent<string>) => {
    const promptId = event.target.value;
    const prompt = businessPrompts.find((p) => p.id === promptId) || null;
    setSelectedPrompt(prompt);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Business Type
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel>Select Business Type</InputLabel>
                <Select
                  value={selectedPrompt?.id || ''}
                  onChange={handlePromptChange}
                  label="Select Business Type"
                >
                  {businessPrompts.map((prompt) => (
                    <MenuItem key={prompt.id} value={prompt.id}>
                      {prompt.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedPrompt && (
                <Box mt={2}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Selected Prompt:
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {selectedPrompt.prompt}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessPromptSelector; 