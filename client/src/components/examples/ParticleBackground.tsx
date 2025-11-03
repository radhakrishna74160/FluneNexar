import { ParticleBackground } from '../ParticleBackground';

export default function ParticleBackgroundExample() {
  return (
    <div className="relative h-screen bg-background">
      <ParticleBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-foreground">Particle background preview</p>
      </div>
    </div>
  );
}
