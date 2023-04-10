// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    name: 'Panel de Datos',
    path: '/panel',
    icon: icon('ic_dashboard'),
  },
  {
    name: 'Usuarios',
    path: '/usuarios',
    icon: icon('ic_user'),
  },
  {
    name: 'Terrenos',
    path: '/terrenos',
    icon: icon('ic_land'),
  },
  {
    name: 'clientes',
    path: '/clientes',
    icon: icon('ic_customer'),
  },
  {
    name: 'ventas',
    path: '/ventas',
    icon: icon('ic_sale'),
  },
  {
    name: 'reportes',
    path: '/reportes',
    icon: icon('ic_report'),
  },
];

export default navConfig;
