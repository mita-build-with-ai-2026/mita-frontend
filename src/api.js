// MITA API INTEGRATION AND SIMULATION FALLBACK LAYER
// Aligned with context.md, hotfix-context.md, and openapi.yaml

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// In-Memory/LocalStorage states for fallback simulation
const STORAGE_PREFIX = 'mita_sim_';
const getStored = (key, defaultValue) => {
  try {
    const val = localStorage.getItem(STORAGE_PREFIX + key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};
const setStored = (key, value) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {}
};

// Initial currated properties dataset (Santa Cruz - Focus: Industria/Productivo)
const INITIAL_PROPERTIES = [
  {
    id: 'prop-1',
    titulo: 'Local Comercial de Alto Tránsito - Zona Norte',
    descripcion: 'Excelente local comercial en plena avenida transitada de la Zona Norte. Ideal para negocios de comida rápida, cafeterías o showrooms. Cuenta con vitrina de vidrio templado, baño privado y pisos de porcelanato de alto tráfico.',
    tipoPropiedad: 'LOCAL_COMERCIAL',
    tipoUsoEspacio: 'COMERCIAL',
    ciudad: 'Santa Cruz de la Sierra',
    zona: 'Zona Norte',
    precio: 800,
    moneda: 'USD',
    precioBs: 5568,
    cantidadHabitaciones: 0,
    cantidadBanos: 1,
    areaM2: 55,
    tieneGaraje: false,
    estaAmoblada: false,
    aceptaMascotas: false,
    expensasIncluidas: true,
    montoExpensas: 0,
    comodidades: ['Aire Acondicionado', 'Vitrina', 'Mezanine'],
    aptoPara: ['Cafetería', 'Showroom', 'Tienda comercial', 'Farmacia'],
    caracteristicasOperativas: {
      sobreAvenida: true,
      altoTransito: true,
      seguridad: true,
      energiaTrifasica: false,
      parqueoClientes: false,
      banos: 1
    },
    requisitosFaltantes: ['Metros cuadrados exactos en plano', 'Condiciones de garantía', 'Parqueo exclusivo'],
    nombreContacto: 'Mario Justiniano',
    telefonoContacto: '59178012345',
    urlFuente: 'https://facebook.com/marketplace/item/1029384812',
    urlImagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop',
    textoBusqueda: 'alquilo local zona norte 800$ ideal negocio avenida transitada bano privado consultas whatsapp',
    estado: 'ACTIVO'
  },
  {
    id: 'prop-2',
    titulo: 'Depósito/Galpón Industrial con Acceso Camión',
    descripcion: 'Espacioso galpón / depósito logístico en Zona Norte, a pocos metros del 4to Anillo. Cuenta con portón metálico de doble altura para ingreso de camiones de alto tonelaje, área de oficinas y seguridad perimetral.',
    tipoPropiedad: 'GALPON',
    tipoUsoEspacio: 'LOGISTICO',
    ciudad: 'Santa Cruz de la Sierra',
    zona: 'Zona Norte',
    precio: 1500,
    moneda: 'USD',
    precioBs: 10440,
    cantidadHabitaciones: 2,
    cantidadBanos: 2,
    areaM2: 250,
    tieneGaraje: true,
    estaAmoblada: false,
    aceptaMascotas: false,
    expensasIncluidas: true,
    montoExpensas: 0,
    comodidades: ['Oficina Administrativa', 'Portón de Seguridad', 'Patio de Maniobras'],
    aptoPara: ['Almacenamiento', 'Distribución Logística', 'Taller Mecánico ligero'],
    caracteristicasOperativas: {
      sobreAvenida: false,
      altoTransito: false,
      seguridad: true,
      energiaTrifasica: true,
      parqueoClientes: true,
      banos: 2,
      accesoCamion: true
    },
    requisitosFaltantes: ['Permiso de actividad industrial', 'Condiciones de alcantarillado', 'Seguro contra incendios'],
    nombreContacto: 'Patricia Vargas - Inmobiliaria Santa Cruz',
    telefonoContacto: '59170944882',
    urlFuente: 'https://inmueblesbolivia.com/galpon-norte-250',
    urlImagen: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
    textoBusqueda: 'alquiler galpon deposito zona norte 250 m2 acceso camion porton alto oficinas seguridad',
    estado: 'ACTIVO'
  },
  {
    id: 'prop-3',
    titulo: 'Oficina Ejecutiva en Equipetrol',
    descripcion: 'Moderna oficina en el corazón empresarial de Equipetrol, ideal para startups o consultoras. Edificio inteligente con salas de reuniones de uso común, comedor de personal, seguridad 24/7 y parqueo subterráneo.',
    tipoPropiedad: 'OFICINA',
    tipoUsoEspacio: 'OFICINA',
    ciudad: 'Santa Cruz de la Sierra',
    zona: 'Equipetrol',
    precio: 650,
    moneda: 'USD',
    precioBs: 4524,
    cantidadHabitaciones: 2,
    cantidadBanos: 1,
    areaM2: 45,
    tieneGaraje: true,
    estaAmoblada: false,
    aceptaMascotas: false,
    expensasIncluidas: false,
    montoExpensas: 80,
    comodidades: ['Ascensor', 'Seguridad 24h', 'Fibra Óptica', 'Sala de Juntas'],
    aptoPara: ['Startup', 'Consultoría', 'Agencia de marketing', 'Coworking privado'],
    caracteristicasOperativas: {
      sobreAvenida: true,
      altoTransito: true,
      seguridad: true,
      energiaTrifasica: false,
      parqueoClientes: true,
      banos: 1
    },
    requisitosFaltantes: ['Monto exacto de expensas variable', 'Límite de horarios de ingreso al edificio'],
    nombreContacto: 'Carlos Roca',
    telefonoContacto: '59172155663',
    urlFuente: 'https://infocasas.com.bo/oficina-equipetrol-moderna',
    urlImagen: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop',
    textoBusqueda: 'alquilo oficina equipetrol equipada centro empresarial seguridad parqueo startup',
    estado: 'ACTIVO'
  },
  {
    id: 'prop-4',
    titulo: 'Taller Productivo / Galpón - Doble Vía La Guardia',
    descripcion: 'Espacio multifuncional ideal para carpinterías, talleres mecánicos o pequeñas industrias operativas. Sin problemas de ruidos molestos. Cuenta con energía trifásica instalada, oficina de control y techado de calaminas de alta resistencia.',
    tipoPropiedad: 'TALLER',
    tipoUsoEspacio: 'INDUSTRIAL',
    ciudad: 'Santa Cruz de la Sierra',
    zona: 'Doble Via La Guardia',
    precio: 900,
    moneda: 'USD',
    precioBs: 6264,
    cantidadHabitaciones: 1,
    cantidadBanos: 1,
    areaM2: 180,
    tieneGaraje: true,
    estaAmoblada: false,
    aceptaMascotas: false,
    expensasIncluidas: true,
    montoExpensas: 0,
    comodidades: ['Energía Trifásica', 'Oficina de Control', 'Portón Corredizo'],
    aptoPara: ['Carpintería', 'Taller Mecánico', 'Metalúrgica menor', 'Almacén de materiales'],
    caracteristicasOperativas: {
      sobreAvenida: false,
      altoTransito: false,
      seguridad: false,
      energiaTrifasica: true,
      parqueoClientes: true,
      banos: 1
    },
    requisitosFaltantes: ['Permiso municipal para ruidos molestos', 'Instalación contra incendios'],
    nombreContacto: 'Erick Claros',
    telefonoContacto: '59167812998',
    urlFuente: 'https://whatsapp-group-chat.com/share/item-taller',
    urlImagen: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop',
    textoBusqueda: 'alquiler taller galpon doble via la guardia energia trifasica carpinteria mecanica industrial',
    estado: 'ACTIVO'
  },
  {
    id: 'prop-5',
    titulo: 'Departamento Ejecutivo Amplio - Equipetrol',
    descripcion: 'Espectacular departamento residencial de 2 dormitorios en Equipetrol Norte. Ideal para profesionales, ejecutivos o familias pequeñas. Balcón con churrasquera propia, cocina equipada e instalaciones de primera calidad.',
    tipoPropiedad: 'DEPARTAMENTO',
    tipoUsoEspacio: 'RESIDENCIAL',
    ciudad: 'Santa Cruz de la Sierra',
    zona: 'Equipetrol',
    precio: 700,
    moneda: 'USD',
    precioBs: 4872,
    cantidadHabitaciones: 2,
    cantidadBanos: 2,
    areaM2: 85,
    tieneGaraje: true,
    estaAmoblada: true,
    aceptaMascotas: true,
    expensasIncluidas: false,
    montoExpensas: 100,
    comodidades: ['Piscina', 'Churrasquera', 'Amoblado Completo', 'Garaje Subterráneo'],
    aptoPara: ['Vivienda familiar', 'Ejecutivos de empresas'],
    caracteristicasOperativas: {
      sobreAvenida: false,
      seguridad: true,
      parqueoClientes: false,
      banos: 2
    },
    requisitosFaltantes: ['Detalle exacto de reglamento de mascotas', 'Restricciones de uso comercial'],
    nombreContacto: 'Fabiana Suárez',
    telefonoContacto: '59177344991',
    urlFuente: 'https://infocasas.com.bo/dpto-equipetrol-2dorm',
    urlImagen: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop',
    textoBusqueda: 'alquiler dpto departamento equipetrol 2 dormitorios amoblado piscina mascota ejecutivo',
    estado: 'ACTIVO'
  }
];

// Helper to check if backend is online
let isSimulationMode = false;

export const checkBackend = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, { method: 'GET', signal: AbortSignal.timeout(1500) });
    isSimulationMode = !res.ok;
  } catch (err) {
    isSimulationMode = true;
  }
  console.log(`Mita API client initialized in: ${isSimulationMode ? 'SIMULATION MODE (Fallback)' : 'PRODUCTION MODE (Backend)'}`);
  return getClientMode();
};

// Auto run health check
checkBackend();

export const getClientMode = () => isSimulationMode ? 'SIMULATION' : 'REAL';

// Base Request Wrapper
const request = async (path, options = {}) => {
  const token = localStorage.getItem('mita_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/* ==========================================================================
   MITA CORE API ENDPOINTS (Alined with openapi.yaml)
   ========================================================================== */

// 1. Health / Metadata
export const checkHealth = async () => {
  if (isSimulationMode) return { status: 'OK', mode: 'SIMULATION' };
  try {
    return await request('/api/health');
  } catch (e) {
    isSimulationMode = true;
    return { status: 'OK', mode: 'SIMULATION_FALLBACK' };
  }
};

export const getZones = async () => {
  if (isSimulationMode) {
    return {
      zones: ['Equipetrol', 'Zona Norte', 'Centro', 'Urubó', 'Doble Vía La Guardia', 'Av. Banzer', 'Sirari', 'Las Palmas', 'Av. Busch', 'Av. Beni', 'Av. Alemana']
    };
  }
  try {
    return await request('/api/metadata/zones');
  } catch (e) {
    isSimulationMode = true;
    return getZones();
  }
};

export const getSearchExamples = async () => {
  if (isSimulationMode) {
    return {
      examples: [
        'Busco un local comercial cerca de una avenida transitada, máximo 800 dólares, ideal para abrir una cafetería.',
        'Busco un depósito o galpón de al menos 200 m² en zona norte, con acceso para camión y seguridad.',
        'Necesito una oficina pequeña para una startup de 5 personas cerca de Equipetrol.',
        'Quiero un taller productivo con energía trifásica en Doble Vía La Guardia.',
        'Busco un departamento ejecutivo amoblado en Equipetrol que acepte mascota.'
      ]
    };
  }
  try {
    return await request('/api/metadata/search-examples');
  } catch (e) {
    isSimulationMode = true;
    return getSearchExamples();
  }
};

// 2. Auth Endpoints
export const loginAdmin = async (email, password) => {
  if (isSimulationMode) {
    if (email === 'admin@mita.ai' && password === 'admin123') {
      const mockToken = 'mock-jwt-token-mita-ai-2026';
      localStorage.setItem('mita_token', mockToken);
      const user = { id: 'admin-id', nombre: 'Organizador Build With AI', email, rol: 'ADMIN' };
      setStored('user', user);
      return { accessToken: mockToken, user };
    }
    throw new Error('Credenciales inválidas de demostración. Intenta con admin@mita.ai / admin123');
  }
  try {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('mita_token', data.accessToken);
    return data;
  } catch (e) {
    // If backend is off, allow simulation credentials instantly
    if (email === 'admin@mita.ai' && password === 'admin123') {
      isSimulationMode = true;
      return loginAdmin(email, password);
    }
    throw e;
  }
};

export const getCurrentUser = async () => {
  if (isSimulationMode) {
    const user = getStored('user');
    if (user) return { user };
    throw new Error('No autorizado');
  }
  try {
    return await request('/api/auth/me');
  } catch (e) {
    isSimulationMode = true;
    return getCurrentUser();
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem('mita_token');
  localStorage.removeItem(STORAGE_PREFIX + 'user');
};

// 3. Properties Management
export const getProperties = async (filters = {}) => {
  if (isSimulationMode) {
    let properties = getStored('properties', INITIAL_PROPERTIES);
    
    // Apply client-side filters
    if (filters.zone) {
      properties = properties.filter(p => p.zona.toLowerCase().includes(filters.zone.toLowerCase()));
    }
    if (filters.maxPrice) {
      properties = properties.filter(p => p.precio <= Number(filters.maxPrice));
    }
    if (filters.propertyType) {
      properties = properties.filter(p => p.tipoPropiedad === filters.propertyType);
    }
    if (filters.usageType) {
      properties = properties.filter(p => p.tipoUsoEspacio === filters.usageType);
    }
    if (filters.minAreaM2) {
      properties = properties.filter(p => p.areaM2 >= Number(filters.minAreaM2));
    }
    if (filters.hasGarage) {
      properties = properties.filter(p => p.tieneGaraje === true);
    }
    if (filters.petsAllowed) {
      properties = properties.filter(p => p.aceptaMascotas === true);
    }

    return { data: properties };
  }
  try {
    const query = new URLSearchParams(filters).toString();
    return await request(`/api/properties?${query}`);
  } catch (e) {
    isSimulationMode = true;
    return getProperties(filters);
  }
};

export const getPropertyById = async (id) => {
  if (isSimulationMode) {
    const properties = getStored('properties', INITIAL_PROPERTIES);
    const prop = properties.find(p => p.id === id);
    if (prop) return { property: prop };
    throw new Error('Propiedad no encontrada');
  }
  try {
    return await request(`/api/properties/${id}`);
  } catch (e) {
    isSimulationMode = true;
    return getPropertyById(id);
  }
};

export const createProperty = async (data) => {
  if (isSimulationMode) {
    const properties = getStored('properties', INITIAL_PROPERTIES);
    const newProp = {
      id: `prop-${Date.now()}`,
      ...data,
      precioBs: data.moneda === 'USD' ? data.precio * 6.96 : data.precio,
      estado: 'ACTIVO',
      requisitosFaltantes: data.requisitosFaltantes || ['Verificar servicios básicos', 'Garantía del contrato'],
      comodidades: data.comodidades || [],
      urlImagen: data.urlImagen || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop'
    };
    properties.unshift(newProp);
    setStored('properties', properties);
    return { property: newProp };
  }
  try {
    return await request('/api/properties', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  } catch (e) {
    isSimulationMode = true;
    return createProperty(data);
  }
};

export const updateProperty = async (id, data) => {
  if (isSimulationMode) {
    const properties = getStored('properties', INITIAL_PROPERTIES);
    const index = properties.findIndex(p => p.id === id);
    if (index !== -1) {
      properties[index] = { ...properties[index], ...data };
      setStored('properties', properties);
      return { property: properties[index] };
    }
    throw new Error('Propiedad no encontrada');
  }
  try {
    return await request(`/api/properties/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  } catch (e) {
    isSimulationMode = true;
    return updateProperty(id, data);
  }
};

// 4. Conversational AI Search (RAG scoring & criteria extraction)
export const aiSearch = async (query, limit = 10) => {
  if (isSimulationMode) {
    // Artificial intelligence simulator matching keywords and returning realistic JSON response
    const queryLower = query.toLowerCase();
    const properties = getStored('properties', INITIAL_PROPERTIES);

    // 1. Extract structural criteria
    let extractedType = null;
    let extractedUse = null;
    let extractedMaxPrice = null;
    let extractedZone = 'Cualquiera';

    if (queryLower.includes('local') || queryLower.includes('cafeteria') || queryLower.includes('tienda')) {
      extractedType = 'LOCAL_COMERCIAL';
      extractedUse = 'COMERCIAL';
    } else if (queryLower.includes('deposito') || queryLower.includes('galpon') || queryLower.includes('almacen')) {
      extractedType = 'GALPON';
      extractedUse = 'LOGISTICO';
    } else if (queryLower.includes('oficina') || queryLower.includes('startup') || queryLower.includes('consultorio')) {
      extractedType = 'OFICINA';
      extractedUse = 'OFICINA';
    } else if (queryLower.includes('taller') || queryLower.includes('mecanica') || queryLower.includes('carpinteria')) {
      extractedType = 'TALLER';
      extractedUse = 'INDUSTRIAL';
    } else if (queryLower.includes('departamento') || queryLower.includes('cuarto') || queryLower.includes('alquiler residencial')) {
      extractedType = 'DEPARTAMENTO';
      extractedUse = 'RESIDENCIAL';
    }

    if (queryLower.includes('norte')) extractedZone = 'Zona Norte';
    else if (queryLower.includes('equipetrol')) extractedZone = 'Equipetrol';
    else if (queryLower.includes('centro')) extractedZone = 'Centro';
    else if (queryLower.includes('la guardia')) extractedZone = 'Doble Vía La Guardia';

    const priceMatch = queryLower.match(/(?:maximo|máximo|hasta|\$)\s*(\d+)/) || queryLower.match(/(\d+)\s*(?:dolares|dólares|usd|\$)/);
    if (priceMatch) {
      extractedMaxPrice = Number(priceMatch[1]);
    }

    const criteria = {
      consultaCruda: query,
      tipoPropiedad: extractedType,
      tipoUsoEspacio: extractedUse,
      zonas: [extractedZone],
      precioMaximo: extractedMaxPrice,
      moneda: 'USD',
      aptoPara: extractedType === 'LOCAL_COMERCIAL' ? ['Cafetería', 'Showroom'] : [],
      caracteristicasOperativas: {
        sobreAvenida: queryLower.includes('avenida') || queryLower.includes('transito'),
        accesoCamion: queryLower.includes('camion') || queryLower.includes('camión'),
        energiaTrifasica: queryLower.includes('trifasica') || queryLower.includes('trifásica')
      },
      prioridades: ['Ubicación', 'Compatibilidad comercial', 'Presupuesto']
    };

    // 2. Score and rank properties
    const results = properties.map(property => {
      let score = 50; // baseline
      const reasons = [];
      const warnings = [];
      const missingInfo = [...property.requisitosFaltantes];

      // Property Type scoring
      if (extractedType && property.tipoPropiedad === extractedType) {
        score += 25;
        reasons.push(`Coincide exactamente con el tipo de espacio solicitado (${property.tipoPropiedad})`);
      } else if (extractedUse && property.tipoUsoEspacio === extractedUse) {
        score += 15;
        reasons.push(`El uso del espacio es compatible (${property.tipoUsoEspacio})`);
      } else if (extractedType) {
        score -= 20;
        warnings.push(`Tipo de espacio diferente (${property.tipoPropiedad} en lugar de ${extractedType})`);
      }

      // Zone scoring
      if (extractedZone !== 'Cualquiera' && property.zona.toLowerCase().includes(extractedZone.toLowerCase())) {
        score += 15;
        reasons.push(`Ubicado en la zona deseada (${property.zona})`);
      } else if (extractedZone !== 'Cualquiera') {
        score -= 10;
        warnings.push(`Se encuentra en ${property.zona}, no en ${extractedZone}`);
      }

      // Price scoring
      if (extractedMaxPrice) {
        if (property.precio <= extractedMaxPrice) {
          score += 10;
          reasons.push(`Dentro del presupuesto solicitado (Precio: $${property.precio})`);
        } else {
          score -= 25;
          warnings.push(`Supera el presupuesto por $${property.precio - extractedMaxPrice}`);
        }
      }

      // Context Keywords match
      if (queryLower.includes('cafeteria') && property.aptoPara.some(a => a.toLowerCase().includes('cafetería'))) {
        score += 10;
        reasons.push('Ideal y adaptado para el giro de cafetería');
      }
      if (queryLower.includes('camion') && property.caracteristicasOperativas.accesoCamion) {
        score += 10;
        reasons.push('Cuenta con accesibilidad certificada para camiones de carga');
      }
      if (queryLower.includes('trifasica') && property.caracteristicasOperativas.energiaTrifasica) {
        score += 10;
        reasons.push('Dispone de energía trifásica industrial de alta potencia');
      }

      // Cap scoring between 10 and 99
      const finalScore = Math.max(15, Math.min(98, score));

      let etiquetaCorta = 'Coincidencia Media';
      if (finalScore >= 90) etiquetaCorta = 'Excelente Opción';
      else if (finalScore >= 75) etiquetaCorta = 'Muy Buena Opción';
      else if (finalScore < 50) etiquetaCorta = 'Coincidencia Baja';

      return {
        property,
        puntajeCoincidencia: finalScore,
        similitudRag: finalScore / 100,
        resumen: `Este espacio en ${property.zona} tiene un ${finalScore}% de compatibilidad. ${
          finalScore >= 80 
            ? 'Es altamente compatible con tu necesidad operativa, logística y de presupuesto.' 
            : 'Cumple con algunos requisitos pero tiene limitaciones de costo, ubicación o capacidad técnica.'
        }`,
        reasons,
        advertencias: warnings,
        informacionFaltante: missingInfo,
        recomendacion: finalScore >= 90 ? 'Altamente recomendado para alquilar de forma inmediata.' : 'Considerar si es posible flexibilizar las condiciones secundarias.',
        etiquetaCorta
      };
    }).sort((a, b) => b.puntajeCoincidencia - a.puntajeCoincidencia);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    return {
      query,
      criteria,
      results: results.slice(0, limit)
    };
  }

  try {
    return await request('/api/ai/search', {
      method: 'POST',
      body: JSON.stringify({ query, limit })
    });
  } catch (e) {
    isSimulationMode = true;
    return aiSearch(query, limit);
  }
};

// 5. AI Compare Side-by-Side
export const aiCompare = async (query, propertyIds) => {
  if (isSimulationMode) {
    const properties = getStored('properties', INITIAL_PROPERTIES);
    const selectedProps = properties.filter(p => propertyIds.includes(p.id));

    if (selectedProps.length < 2) {
      throw new Error('Selecciona al menos 2 propiedades para comparar.');
    }

    const recommended = selectedProps[0]; // mock recommendation to first
    const other = selectedProps[1];

    const decisionSummary = `Basado en tu búsqueda conversacional ("${query}"), el Agente IA de Mita recomienda la propiedad **"${recommended.titulo}"** ubicada en **${recommended.zona}**.`;

    const comparisonTable = selectedProps.map(p => ({
      'Propiedad': p.titulo,
      'Precio Mensual': `$${p.precio} ${p.moneda}`,
      'Área Total': `${p.areaM2} m²`,
      'Zona': p.zona,
      'Tipo de Uso': p.tipoUsoEspacio,
      'Trifásica': p.caracteristicasOperativas.energiaTrifasica ? 'Sí' : 'No',
      'Acceso Camión': p.caracteristicasOperativas.accesoCamion ? 'Sí' : 'No',
      'Faltantes': p.requisitosFaltantes.length
    }));

    const tradeoffs = [
      `**${recommended.titulo}** ofrece mejor relación costo-beneficio para el giro del negocio.`,
      `**${other.titulo}** tiene una ubicación alternativa que puede convenir si se expande el presupuesto o si la prioridad del tamaño de m² varía.`
    ];

    const finalRecommendation = `Para avanzar rápido y mitigar riesgos en Santa Cruz, te sugerimos contactar a **${recommended.nombreContacto}** vía WhatsApp al **${recommended.telefonoContacto}** para programar una visita técnica a la brevedad.`;

    await new Promise(r => setTimeout(r, 1000));

    return {
      recommendedPropertyId: recommended.id,
      decisionSummary,
      comparisonTable,
      tradeoffs,
      finalRecommendation
    };
  }

  try {
    return await request('/api/ai/compare', {
      method: 'POST',
      body: JSON.stringify({ query, propertyIds })
    });
  } catch (e) {
    isSimulationMode = true;
    return aiCompare(query, propertyIds);
  }
};

// 6. AI Listing Enhancer
export const aiEnhanceListing = async (rawText) => {
  if (isSimulationMode) {
    // Normalization simulator
    const isNorte = rawText.toLowerCase().includes('norte');
    const isLocal = rawText.toLowerCase().includes('local');
    const isGalpon = rawText.toLowerCase().includes('galpon') || rawText.toLowerCase().includes('deposito');

    const titulo = isLocal 
      ? 'Excelente Local Comercial en Zona Norte' 
      : isGalpon 
        ? 'Gran Depósito/Galpón Logístico de Alto Impacto' 
        : 'Espacio Productivo Multifuncional';

    const descripcionLimpia = `Excelente oportunidad inmobiliaria en Santa Cruz de la Sierra. Se ofrece un espacio ideal para operaciones empresariales, ubicado en avenida o calle estratégica con alto flujo vehicular. Dispone de baño privado e instalaciones en excelente estado de conservación.`;

    const propertyDraft = {
      titulo,
      descripcion: descripcionLimpia,
      tipoPropiedad: isLocal ? 'LOCAL_COMERCIAL' : isGalpon ? 'GALPON' : 'OTRO',
      tipoUsoEspacio: isLocal ? 'COMERCIAL' : isGalpon ? 'LOGISTICO' : 'MIXTO',
      ciudad: 'Santa Cruz de la Sierra',
      zona: isNorte ? 'Zona Norte' : 'Zona Central',
      precio: 800,
      moneda: 'USD',
      cantidadBanos: 1,
      areaM2: 60,
      tieneGaraje: false,
      telefonoContacto: '59178012345'
    };

    const caracteristicas = [
      'Ubicación estratégica',
      'Pisos reforzados para alto tráfico',
      'Baño privado independiente',
      'Acceso sobre avenida principal'
    ];

    const informacionFaltante = [
      'Metros cuadrados exactos en plano catastral',
      'Monto y condiciones del depósito en garantía',
      'Permiso de uso de suelo comercial/gastronómico'
    ];

    const preguntasSugeridas = [
      '¿Cuenta con medidor de luz y agua independiente?',
      '¿Tiene parqueo exclusivo para clientes en el frontis?',
      '¿Qué rubros de actividad comercial están restringidos por el propietario?'
    ];

    const versionWhatsapp = `*¡NUEVO ESPACIO DISPONIBLE!*\n\n*${titulo}*\n*Ubicación:* ${propertyDraft.zona}, Santa Cruz.\n*Precio:* $${propertyDraft.precio} USD\n*Área:* 60 m²\n\n_${descripcionLimpia}_\n\n*Más información aquí:* wa.me/59178012345`;
    const versionFacebook = `¡OPORTUNIDAD COMERCIAL EN SANTA CRUZ!\n\nEstás buscando el espacio ideal para operar tu pyme o abrir tu sucursal? Te presentamos este excelente inmueble:\n\nZona: ${propertyDraft.zona}\nInversión: $${propertyDraft.precio} USD / mes\nTipo: Local Comercial adaptado\n\nBeneficios clave: ${caracteristicas.join(', ')}.\nFaltan detalles por confirmar: ${informacionFaltante.join(', ')}.\n\nEscríbenos directamente o comenta esta publicación para enviarte los requisitos completos de alquiler.`;

    await new Promise(r => setTimeout(r, 1200));

    return {
      titulo,
      descripcionLimpia,
      propertyDraft,
      caracteristicas,
      informacionFaltante,
      preguntasSugeridas,
      versionWhatsapp,
      versionFacebook
    };
  }

  try {
    return await request('/api/ai/enhance-listing', {
      method: 'POST',
      body: JSON.stringify({ rawText })
    });
  } catch (e) {
    isSimulationMode = true;
    return aiEnhanceListing(rawText);
  }
};

// 7. RAG Vector Reindexing
export const ragReindex = async () => {
  if (isSimulationMode) {
    await new Promise(r => setTimeout(r, 1500));
    return { status: 'SUCCESS', message: 'Reindexación completa. Embeddings vectoriales regenerados localmente en simulador.' };
  }
  try {
    return await request('/api/rag/reindex', { method: 'POST' });
  } catch (e) {
    isSimulationMode = true;
    return ragReindex();
  }
};

// 8. Leads Management
export const createLead = async (leadData) => {
  if (isSimulationMode) {
    const leads = getStored('leads', []);
    const newLead = {
      id: `lead-${Date.now()}`,
      propertyId: leadData.propertyId,
      nombreUsuario: leadData.nombreUsuario || 'Interesado Demo',
      telefonoUsuario: leadData.telefonoUsuario || '59170011223',
      mensaje: leadData.mensaje || 'Hola, me interesa este espacio en alquiler que vi en Mita.',
      creadoEn: new Date().toISOString(),
      origen: leadData.origen || 'WHATSAPP_CLICK'
    };
    leads.unshift(newLead);
    setStored('leads', leads);

    const messageEncoded = encodeURIComponent(`${newLead.mensaje}\n\n(Visto en Mita AI)`);
    const urlWhatsapp = `https://wa.me/${newLead.telefonoUsuario}?text=${messageEncoded}`;

    return {
      lead: {
        id: newLead.id,
        propertyId: newLead.propertyId,
        urlWhatsapp
      }
    };
  }

  try {
    return await request('/api/leads', {
      method: 'POST',
      body: JSON.stringify(leadData)
    });
  } catch (e) {
    isSimulationMode = true;
    return createLead(leadData);
  }
};

export const getLeads = async () => {
  if (isSimulationMode) {
    const leads = getStored('leads', []);
    const properties = getStored('properties', INITIAL_PROPERTIES);

    // Join with property info
    const enrichedLeads = leads.map(lead => {
      const prop = properties.find(p => p.id === lead.propertyId);
      return {
        ...lead,
        propertyTitulo: prop ? prop.titulo : 'Espacio no especificado',
        propertyZona: prop ? prop.zona : '',
        propertyPrecio: prop ? prop.precio : 0
      };
    });

    return { data: enrichedLeads };
  }

  try {
    return await request('/api/leads');
  } catch (e) {
    isSimulationMode = true;
    return getLeads();
  }
};

// 9. Scraper and Sources
export const getSources = async () => {
  if (isSimulationMode) {
    return {
      data: [
        { id: 1, nombre: 'Facebook Marketplace Santa Cruz', activo: true },
        { id: 2, nombre: 'Grupos Inmobiliarios WhatsApp', activo: true },
        { id: 3, nombre: 'Portales Locales (Infocasas/Inmuebles)', activo: false }
      ]
    };
  }
  try {
    return await request('/api/sources');
  } catch (e) {
    isSimulationMode = true;
    return getSources();
  }
};

export const getImports = async () => {
  if (isSimulationMode) {
    return {
      data: getStored('imports', [
        { id: 'imp-1', fuente: 'Facebook Marketplace', estado: 'COMPLETO', totalEncontrados: 25, totalImportados: 18, totalFallidos: 7, fecha: '2026-05-30T10:14:00Z' }
      ])
    };
  }
  try {
    return await request('/api/imports');
  } catch (e) {
    isSimulationMode = true;
    return getImports();
  }
};

export const runImport = async (sourceId, url, limit = 30) => {
  if (isSimulationMode) {
    const imports = getStored('imports', []);
    const newImp = {
      id: `imp-${Date.now()}`,
      fuente: sourceId === 1 ? 'Facebook Marketplace' : sourceId === 2 ? 'WhatsApp Groups' : 'Portales Locales',
      estado: 'COMPLETO',
      totalEncontrados: limit,
      totalImportados: Math.floor(limit * 0.8),
      totalFallidos: Math.floor(limit * 0.2),
      fecha: new Date().toISOString()
    };
    imports.unshift(newImp);
    setStored('imports', imports);

    await new Promise(r => setTimeout(r, 1500));
    return newImp;
  }

  try {
    return await request('/api/imports/run', {
      method: 'POST',
      body: JSON.stringify({ sourceId, url, limit })
    });
  } catch (e) {
    isSimulationMode = true;
    return runImport(sourceId, url, limit);
  }
};
