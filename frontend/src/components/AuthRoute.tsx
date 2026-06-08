import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { getMe } from "../services/auth.service";

export default function AuthRoute() {
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await getMe();
        setStatus("authenticated");
      } catch {
        setStatus("unauthenticated");
      }
    };

    verifyUser();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
