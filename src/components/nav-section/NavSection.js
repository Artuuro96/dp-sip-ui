import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { alpha } from '@mui/material/styles';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import SvgColor from '../svg-color';


const fIcon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { name, path, icon, info } = item;
  
  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'white',
          bgcolor: 'white',
          fontWeight: 'fontWeightBold',
          backgroundColor: alpha('#919EAB', 0.70),
        },
      }}
      
    >
      <StyledNavItemIcon>{fIcon(icon)}</StyledNavItemIcon>

      <ListItemText sx={{ color: 'white' }} disableTypography primary={name} />

      {info && info}
    </StyledNavItem>
  );
}
