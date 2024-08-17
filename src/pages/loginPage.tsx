import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { TextField, Button, Stack } from "@mui/material";

const LoginPage: React.FC = () => {
  const { authenticate } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authenticate(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} maxWidth={400} margin="auto" mt={5}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginPage;
