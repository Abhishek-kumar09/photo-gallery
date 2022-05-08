import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgress, Container } from '@mui/material';
import TabOne from "./ImageTab"
import VideoTab from './VideoTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            variant='fullWidth'

          >
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Videos" {...a11yProps(1)} />
            <Tab label="Discover" {...a11yProps(2)} />
          </Tabs>
        </Container>
      </Box>
      <TabPanel value={value} index={0}>
        <TabOne />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VideoTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabOne />
      </TabPanel>
    </Box>
  );
}
