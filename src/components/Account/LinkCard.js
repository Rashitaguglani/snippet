import { memo } from "react";
import { Box, Typography, Button, IconButton } from '@mui/material';
import { BarChart as ChartIcon, Delete as DeleteIcon, FileCopy as CopyIcon } from  '@mui/icons-material';
import format from 'date-fns/format';

const LinkCard = ({id, createdAt, name, longURL, shortCode, totalClicks, deleteLink, copyLink}) => {
  const shortUrl = `${window.location.host}/${shortCode}`;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      border="1px solid #e0e0e0"
      borderRadius="8px"
      padding="20px"
      marginBottom="20px"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
    >
      <Box flex="1">
        <Typography color="textSecondary" variant="overline">Created at {format(createdAt, 'd MMM, HH:mm')}</Typography>
        <Box my={2}>
          <Typography variant="h5">{name}</Typography>
          <Typography>{longURL}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box mr={3}><Typography color="primary">{shortUrl}</Typography></Box>
          <Box mx={2}>
            <Button onClick={() => copyLink(shortUrl)} color="secondary" size="small" variant="outlined" startIcon={<CopyIcon />}>Copy</Button>
            <Button onClick={() => deleteLink(id)} color="secondary" size="small" variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
          </Box>
        </Box>
      </Box>
      <Box flex="1" textAlign="center">
        <IconButton>
          <ChartIcon />
        </IconButton>
        <Typography variant="h6" color="primary">{totalClicks}</Typography>
        <Typography variant="overline">Total Clicks</Typography>
      </Box>
    </Box>
  );
};

export default memo(LinkCard);
