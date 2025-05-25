import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useStore } from '../store';
import axios from 'axios';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAIMode, selectedModel, apiKeys, selectedPrompt } = useStore();

  const validateApiKeys = () => {
    if (selectedModel === 'chatgpt' && !apiKeys.chatgpt) {
      throw new Error('ChatGPT API key is not set. Please add it in Settings.');
    }
    if (selectedModel === 'gemini' && !apiKeys.gemini) {
      throw new Error('Gemini API key is not set. Please add it in Settings.');
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setError(null);

    const userMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      validateApiKeys();
      let aiResponse: string;
      
      if (selectedModel === 'chatgpt') {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: selectedPrompt?.prompt || 'You are a helpful assistant.',
              },
              {
                role: 'user',
                content: message,
              },
            ],
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKeys.chatgpt}`,
              'Content-Type': 'application/json',
            },
          }
        );
        aiResponse = response.data.choices[0].message.content;
      } else {
        // Gemini API
        const modelVersion = selectedModel === 'gemini-1.5-flash' ? 'gemini-1.5-flash' : 'gemini-2.0-flash';
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelVersion}:generateContent?key=${apiKeys.gemini}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: selectedPrompt?.prompt || 'You are a helpful assistant.',
                  },
                  {
                    text: message,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        aiResponse = response.data.candidates[0].content.parts[0].text;
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Error getting AI response:', error);
      let errorMessage = 'Sorry, there was an error getting the AI response.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        errorMessage = `API Error: ${error.response.data.error?.message || error.response.statusText}`;
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        errorMessage = 'No response received from the API. Please check your internet connection.';
      } else if (error.message) {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }

      setError(errorMessage);
      const errorMessageObj: Message = {
        id: Date.now() + 1,
        text: errorMessage,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Chat</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isAIMode}
              onChange={(e) => useStore.setState({ isAIMode: e.target.checked })}
            />
          }
          label="AI Mode"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <List>
          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{msg.sender === 'user' ? 'U' : 'AI'}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={msg.text}
                  secondary={msg.timestamp.toLocaleTimeString()}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
          {isLoading && (
            <ListItem>
              <ListItemAvatar>
                <Avatar>AI</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} />
                    <Typography>AI is thinking...</Typography>
                  </Box>
                }
              />
            </ListItem>
          )}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={isLoading}
          />
          <IconButton 
            color="primary" 
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat; 