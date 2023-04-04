import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { alpha } from '@mui/material/styles';
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
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
  const { title, path, icon, info } = item;
  
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
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText sx={{ color: 'white' }} disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
