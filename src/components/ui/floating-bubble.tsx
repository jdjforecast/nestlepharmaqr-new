"use client";

import { HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";

interface FloatingBubbleProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  productName: string;
  delay?: number;
  href?: string;
  size?: "sm" | "md" | "lg";
}

export function FloatingBubble({
  imageUrl,
  productName,
  delay = 0,
  href,
  size = "md",
  className = "",
  ...props
}: FloatingBubbleProps) {
  const sizeClasses = {
    sm: "w-20 h-20 sm:w-24 sm:h-24",
    md: "w-28 h-28 sm:w-32 sm:h-32",
    lg: "w-32 h-32 sm:w-40 sm:h-40",
  };

  const bubbleContent = (
    <div
      className={`
        relative group
        ${sizeClasses[size]}
        rounded-bubble
        bg-white/80 backdrop-blur-sm
        shadow-bubble hover:shadow-bubble-hover
        transition-all duration-300
        animate-float
        cursor-pointer
        touch-manipulation
        ${className}
      `}
      style={{ 
        animationDelay: `${delay}ms`,
      }}
      {...props}
    >
      {/* Producto */}
      <div className="absolute inset-2 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={productName}
          width={size === "sm" ? 60 : size === "md" ? 80 : 100}
          height={size === "sm" ? 60 : size === "md" ? 80 : 100}
          className="object-contain group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          priority={delay < 1000}
        />
      </div>

      {/* Burbuja decorativa - Ocultada en móviles */}
      <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-bubble-light opacity-80 animate-pulse-soft hidden sm:block" />
      
      {/* Tooltip con nombre del producto - Visible solo en desktop */}
      <div className="
        absolute -bottom-8 left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        bg-white px-3 py-1 rounded-full shadow-card
        text-xs sm:text-sm text-primary-dark whitespace-nowrap
        hidden sm:block
      ">
        {productName}
      </div>

      {/* Nombre del producto para móviles */}
      <div className="
        absolute -bottom-6 left-1/2 -translate-x-1/2 w-full
        text-center text-xs text-primary-dark
        truncate px-2
        sm:hidden
      ">
        {productName}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block touch-manipulation">
        {bubbleContent}
      </Link>
    );
  }

  return bubbleContent;
} 