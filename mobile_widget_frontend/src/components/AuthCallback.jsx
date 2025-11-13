import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSupabase } from "../utils/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = getSupabase();
      if (!supabase) {
        // eslint-disable-next-line no-console
        console.error("Supabase not configured. Ensure env vars are set.");
        navigate("/");
        return;
      }

      try {
        const { data, error } = await supabase.auth.getSessionFromUrl();
        if (error) {
          // eslint-disable-next-line no-console
          console.error("Auth callback error:", error);
          navigate("/auth/error");
          return;
        }
        if (data?.session) {
          navigate("/"); // redirect to home or dashboard
        } else {
          navigate("/");
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Unexpected auth callback error:", e);
        navigate("/auth/error");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <div className="main"><div className="card">Processing authentication...</div></div>;
}
