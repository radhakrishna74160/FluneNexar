import { Button } from "@/components/ui/button";
import { SiGoogle } from "react-icons/si";

interface GoogleAuthButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function GoogleAuthButton({ onClick, isLoading }: GoogleAuthButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-gradient-primary hover:opacity-90 h-12"
      data-testid="button-google-signin"
    >
      <SiGoogle className="w-5 h-5 mr-2" />
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </Button>
  );
}
