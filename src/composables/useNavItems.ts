export interface MenuItem {
  title: string;
  hasDropdown: boolean;
  items?: MenuItem[];
  route: string;
}

export const menuItems: MenuItem[] = [
  { title: 'Inicio', hasDropdown: false, route: '/' },
  {
    title: 'Servicios',
    hasDropdown: true,
    route: '/services',
    items: [
      { title: 'Xelhua',   hasDropdown: false, route: '/services/xelhua'   },
      { title: 'Nez',      hasDropdown: false, route: '/services/nez'      },
      { title: 'MictlanX', hasDropdown: false, route: '/services/mictlanx' },
    ],
  },
  {
    title: 'Observatorios',
    hasDropdown: true,
    route: '/observatory',
    items: [
      { title: 'Azomalli', hasDropdown: false, route: '/observatories/azomalli' },
      { title: 'IMA',      hasDropdown: false, route: '/observatories/ima'      },
      { title: 'Kawak',    hasDropdown: false, route: '/observatories/kawak'    },
      { title: 'Kaexla',   hasDropdown: false, route: '/observatories/kaexla'   },
      { title: 'Alerta',   hasDropdown: false, route: '/observatories/alerta'   },
    ],
  },
  {
    title: 'Recursos',
    hasDropdown: true,
    route: '/resources',
    items: [
      { title: 'Artículos científicos', hasDropdown: false, route: '/resources/articles' },
      { title: 'Reportes técnicos',     hasDropdown: false, route: '/resources/reports'  },
      { title: 'Guías',                 hasDropdown: false, route: '/resources/guides'  },
    ],
  },
  { title: 'Contacto', hasDropdown: false, route: '/contact' },
];
