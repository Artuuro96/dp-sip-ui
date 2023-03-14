// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Panel de Datos',
    path: '/panel',
    icon: icon('ic_dashboard'),
  },
  {
    title: 'Usuarios',
    path: '/usuarios',
    icon: icon('ic_user'),
  },
  {
    title: 'Terrenos',
    path: '/terrenos',
    icon: icon('ic_land'),
  },
  {
    title: 'clientes',
    path: '/clientes',
    icon: icon('ic_customer'),
  },
  {
    title: 'ventas',
    path: '/ventas',
    icon: icon('ic_sale'),
  },
  {
    title: 'reportes',
    path: '/reportes',
    icon: icon('ic_report'),
  },
];

export default navConfig;
