interface BoutiqueTileProps {
  boutique: {
    name: string;
    monogram?: string;
    style: 'monogram' | 'typography' | 'image';
    background?: string;
    textColor?: string;
  };
  size?: 'sm' | 'md' | 'lg' | 'featured';
  featured?: boolean;
}

export function BoutiqueTile({ boutique, size = 'md', featured = false }: BoutiqueTileProps) {
  const sizes = {
    sm: {
      container: 'w-20 h-20',
      monogram: 'text-2xl',
      typography: 'text-[10px]',
      padding: 'p-4',
    },
    md: {
      container: 'w-32 h-32',
      monogram: 'text-5xl',
      typography: 'text-xs',
      padding: 'p-6',
    },
    lg: {
      container: 'w-40 h-40',
      monogram: 'text-6xl',
      typography: 'text-sm',
      padding: 'p-8',
    },
    featured: {
      container: 'w-64 h-64',
      monogram: 'text-8xl',
      typography: 'text-lg',
      padding: 'p-14',
    },
  };

  const config = sizes[size];
  const bg = boutique.background || 'bg-porcelain-warm';
  const text = boutique.textColor || 'text-charcoal';

  return (
    <div
      className={`${config.container} ${bg} ${config.padding} border border-charcoal/15 flex items-center justify-center group cursor-pointer`}
      style={{ 
        borderWidth: '0.5px',
        borderRadius: featured ? '2px' : '1px',
        transition: 'all 180ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transition: 'transform 180ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {boutique.style === 'monogram' && boutique.monogram && (
          <div 
            className={`heading-serif ${config.monogram} ${text} font-light tracking-tighter leading-none`}
            style={{
              transition: 'color 180ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {boutique.monogram}
          </div>
        )}
        {boutique.style === 'typography' && (
          <div 
            className={`heading-serif ${config.typography} ${text} font-light tracking-[0.25em] uppercase text-center leading-tight`}
            style={{
              transition: 'color 180ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {boutique.name}
          </div>
        )}
      </div>

      {/* Hover Effect - Subtle Border Darkening */}
      <div 
        className="absolute inset-0 border border-charcoal/0 group-hover:border-charcoal/40 pointer-events-none"
        style={{ 
          borderWidth: '0.5px',
          borderRadius: featured ? '2px' : '1px',
          transition: 'border-color 180ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
    </div>
  );
}

// Boutique identity system
export const boutiqueIdentities = {
  'Boutique Alya': {
    name: 'Boutique Alya',
    monogram: 'A',
    style: 'monogram' as const,
    background: 'bg-[#F8F7F4]',
    textColor: 'text-charcoal',
  },
  'Boutique Noor': {
    name: 'Boutique Noor',
    monogram: 'N',
    style: 'monogram' as const,
    background: 'bg-[#F5F3EF]',
    textColor: 'text-charcoal',
  },
  'Boutique Reem': {
    name: 'Reem',
    style: 'typography' as const,
    background: 'bg-[#F7F4EF]',
    textColor: 'text-charcoal',
  },
  'Boutique Layla': {
    name: 'Boutique Layla',
    monogram: 'L',
    style: 'monogram' as const,
    background: 'bg-[#FAF8F4]',
    textColor: 'text-charcoal',
  },
  'Maison Zahra': {
    name: 'Maison Zahra',
    monogram: 'MZ',
    style: 'monogram' as const,
    background: 'bg-[#F6F4F0]',
    textColor: 'text-charcoal',
  },
  'Atelier Hessa': {
    name: 'Atelier Hessa',
    monogram: 'AH',
    style: 'monogram' as const,
    background: 'bg-[#F9F7F3]',
    textColor: 'text-charcoal',
  },
};