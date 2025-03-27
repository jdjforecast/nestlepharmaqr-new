"use client";

interface PharmaSummitLogoProps {
  className?: string;
}

export function PharmaSummitLogo({ className = "" }: PharmaSummitLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="text-2xl font-bold bg-gradient-primary text-transparent bg-clip-text">
        PORTAL
      </div>
      <div className="text-3xl font-black bg-gradient-primary text-transparent bg-clip-text tracking-wider">
        PHARMA
      </div>
      <div className="text-xl font-semibold text-primary-dark">
        SUMMIT
      </div>
    </div>
  );
} 