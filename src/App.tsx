import React from 'react';
import { Container, Typography } from '@mui/material';
import TagsBrowser from './TagsBrowser';

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>StackOverflow Tags Browser</Typography>
      <TagsBrowser />
    </Container>
  );
}

export default App;