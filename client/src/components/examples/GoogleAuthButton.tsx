import { GoogleAuthButton } from '../GoogleAuthButton';
import { useState } from 'react';

export default function GoogleAuthButtonExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    console.log('Google sign in clicked');
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <div className="w-full max-w-sm">
        <GoogleAuthButton onClick={handleClick} isLoading={isLoading} />
      </div>
    </div>
  );
}
