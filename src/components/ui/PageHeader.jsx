import React from "react";

export default function PageHeader({
  title,
  subtitle,
  className = "",
  children,
  gradient = "from-violet-600 to-blue-500",
  ...props
}) {
  return (
    <section
      className={`w-full bg-gradient-to-r ${gradient} py-6 sm:py-8 md:py-10 lg:py-16 flex flex-col items-center text-center relative overflow-hidden ${className}`}
      {...props}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-2 sm:mb-4 animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-violet-100 mb-4 sm:mb-6 md:mb-8 max-w-2xl animate-fade-in delay-100 mx-auto">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {/* Burbujas decorativas */}
      <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-yellow-300 opacity-20 rounded-full blur-3xl animate-pulse" />
    </section>
  );
} 