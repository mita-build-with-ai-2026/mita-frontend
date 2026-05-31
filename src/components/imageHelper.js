// Smart image extraction and fallback logic for Mita properties.
// Avoids displaying bank logos or placeholder watermarks by resolving to premium Unsplash photos deterministically.

const COMMERCIAL_IMAGES = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop', // Boutique storefront
  'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=800&auto=format&fit=crop', // Modern store interior
  'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800&auto=format&fit=crop', // Retail shop window
  'https://images.unsplash.com/photo-1582037917204-dd40d7e63ef2?q=80&w=800&auto=format&fit=crop', // Commercial space
];

const OFFICE_IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', // Modern corporate office
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop', // Collaborative workspace
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop', // Stylish lobby
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop', // Tech board room
];

const WAREHOUSE_IMAGES = [
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', // Logistics center
  'https://images.unsplash.com/photo-1565891741441-64926e441838?q=80&w=800&auto=format&fit=crop', // Factory floor
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', // High ceiling warehouse
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop', // Industrial depot
];

const LAND_IMAGES = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop', // Field land
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop', // Grass field under blue sky
  'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?q=80&w=800&auto=format&fit=crop', // Outdoor plot
];

const RESIDENTIAL_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', // Premium villa facade
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop', // Bright dining/living space
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop', // Apartment building
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop', // Luxury condo interior
];

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop';

const getDeterministicIndex = (str, length) => {
  if (!str) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % length;
};

export const getPropertyImage = (property) => {
  if (!property) return FALLBACK_IMAGE;

  const url = property.urlImagen;
  
  // Check if image is missing or is an invalid bank/watermark placeholder logo
  const isInvalid = !url || 
    url.trim() === '' ||
    url.includes('logo-infocasas') ||
    url.includes('e-bisa') ||
    url.includes('grupobisa') ||
    url.includes('ft-1.svg') ||
    url.includes('ft-2.svg') ||
    url.includes('ft-3.svg') ||
    url.includes('ft-4.svg') ||
    url.includes('ft-5.svg') ||
    url.includes('/logo') ||
    url.includes('/icon') ||
    url.toLowerCase().endsWith('.svg');

  if (!isInvalid) {
    return url;
  }

  // Resolve to premium category image deterministically based on property ID or title
  const type = (property.tipoPropiedad || '').toUpperCase();
  const seed = property.id || property.titulo || '';

  if (type === 'LOCAL_COMERCIAL') {
    const idx = getDeterministicIndex(seed, COMMERCIAL_IMAGES.length);
    return COMMERCIAL_IMAGES[idx];
  }

  if (type === 'OFICINA') {
    const idx = getDeterministicIndex(seed, OFFICE_IMAGES.length);
    return OFFICE_IMAGES[idx];
  }

  if (type === 'DEPOSITO' || type === 'GALPON' || type === 'LOGISTICO' || type === 'INDUSTRIAL') {
    const idx = getDeterministicIndex(seed, WAREHOUSE_IMAGES.length);
    return WAREHOUSE_IMAGES[idx];
  }

  if (type === 'TERRENO') {
    const idx = getDeterministicIndex(seed, LAND_IMAGES.length);
    return LAND_IMAGES[idx];
  }

  if (type === 'CASA' || type === 'DEPARTAMENTO' || type === 'RESIDENCIAL') {
    const idx = getDeterministicIndex(seed, RESIDENTIAL_IMAGES.length);
    return RESIDENTIAL_IMAGES[idx];
  }

  // Fallback to general residential/commercial mix
  const allImages = [...RESIDENTIAL_IMAGES, ...COMMERCIAL_IMAGES];
  const idx = getDeterministicIndex(seed, allImages.length);
  return allImages[idx];
};

export const getPropertyImages = (property) => {
  const mainImage = getPropertyImage(property);
  if (!property) return Array(5).fill(mainImage);
  
  const type = (property.tipoPropiedad || '').toUpperCase();
  
  let sourceArray = [];
  if (type === 'LOCAL_COMERCIAL') {
    sourceArray = COMMERCIAL_IMAGES;
  } else if (type === 'OFICINA') {
    sourceArray = OFFICE_IMAGES;
  } else if (type === 'DEPOSITO' || type === 'GALPON' || type === 'LOGISTICO' || type === 'INDUSTRIAL') {
    sourceArray = WAREHOUSE_IMAGES;
  } else if (type === 'TERRENO') {
    sourceArray = LAND_IMAGES;
  } else {
    sourceArray = RESIDENTIAL_IMAGES;
  }

  const list = [mainImage];
  for (let img of sourceArray) {
    if (list.length >= 5) break;
    if (img !== mainImage) {
      list.push(img);
    }
  }
  
  const fallbackSource = [...RESIDENTIAL_IMAGES, ...COMMERCIAL_IMAGES, ...OFFICE_IMAGES];
  for (let img of fallbackSource) {
    if (list.length >= 5) break;
    if (!list.includes(img)) {
      list.push(img);
    }
  }

  return list;
};
