import { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AuthRedirect from "@/context/AuthRedirect";
import toast from "react-hot-toast";


export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        username,
        email,
        password,
      });
      // console.log('Registration successful:', response.data);
      toast.success("Registration successful");//toast
      setTimeout(() => {
        navigate('/login');
      }, 1000); 
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      toast.error(`Registration failed: ${error.response?.data.message}`);//toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthRedirect>
    <div className="pt-36 px-2">
      <Card className="mx-auto max-w-sm" style={{ boxShadow: "0px 0px 60px grey" }}>
        <CardHeader>
          <CardTitle className="text-3xl">Register</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Username</Label>
              <Input
                id="user-name"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
         
        </CardContent>
      </Card>
    </div>
    </AuthRedirect>
  );
}
