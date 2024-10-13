import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import AuthRedirect from "@/context/AuthRedirect";
import toast from "react-hot-toast";


export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/users/login", {
        email,
        password,
      });

      const { accessToken } = response.data;
      // console.log("Login successful, accessToken:", accessToken);
      toast.success(`Login successful`);//toast

      await login(accessToken); 

      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      toast.error(`Login Failed: ${error.response?.data.message}`);//toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthRedirect>
    <div className="pt-36 px-2">
      <Card className="mx-auto max-w-sm" style={{ boxShadow: "0px 0px 60px grey" }}>
        <CardHeader>
          <CardTitle className="text-3xl">Log In</CardTitle>
          <CardDescription>Enter your information to log into your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                placeholder="me@example.com"
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
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </AuthRedirect>
  );
}
