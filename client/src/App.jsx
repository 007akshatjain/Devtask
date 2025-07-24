import { Button, Typography, Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Welcome to DevTasks
      </Typography>
      <Button variant="contained" color="secondary">
        Get Started
      </Button>
    </Container>
  );
}

export default App;
