import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import * as React from 'react';

export default function CustomizedSearchBase({
  placeholder,
  value,
  onSubmit
}) {
  const [searchText, setSearchText] = React.useState("");
  
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={searchText}
        onChange={(e)=>setSearchText(e.target.value)}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={(e) => {
        e.preventDefault();
        onSubmit(searchText);
      }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}