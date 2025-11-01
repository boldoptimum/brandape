import React from 'react';

const BrandApeLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 160 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Simple logo: two overlapping shapes */}
    <path d="M6 2L12 12L6 22L0 12L6 2Z" fill="currentColor" fillOpacity="0.7"/>
    <path d="M14 2L20 12L14 22L8 12L14 2Z" fill="currentColor"/>
    <text x="30" y="18" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="800" fill="currentColor">
      BrandApe
    </text>
  </svg>
);

export default BrandApeLogo;