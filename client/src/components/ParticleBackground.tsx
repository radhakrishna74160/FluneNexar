import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import type { Engine } from "tsparticles-engine";

export function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "stars",
        background: {
          color: "transparent",
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#4d7cfe", "#9d6eff", "#00d4ff"],
          },
          opacity: {
            value: { min: 0.1, max: 0.6 },
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
