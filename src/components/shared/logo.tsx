import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logos/nestle-logo.png"
        alt="Nestlé Logo"
        width={80}
        height={32}
        className="object-contain"
      />
      <div className="h-8 w-px bg-border" />
      <span className="text-lg font-semibold">Pharma Summit</span>
    </div>
  );
} 