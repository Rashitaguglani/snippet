import {memo} from "react";
import {  Box, Typography, Button } from '@mui/material';
import {BarChart as ChartIcon} from  '@mui/icons-material';
import format from 'date-fns/format'

const LinkCard = ({id,
    createdAt ,
    name,
    longURL,
    shortCode,
    totalClicks, deleteLink, copyLink}) => {
     // console.log('link card renderd')
     const shortUrl = `${window.location.host}/${shortCode}`

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
            <Typography color="textSecondary" variant="overline"> Created at {format(createdAt, 'd MMM, HH:mm')}</Typography>
            <Box my={2}>
            <Typography variant = "h5"> {name}</Typography>
            <Typography>  {longURL}</Typography>
        
            </Box>
            <Box display="flex" alignItems="center">
        
        <Box mr={3}><Typography color="primary"> {shortUrl}</Typography></Box>
        <Box mx={2}>
        <Button onClick={()=> copyLink(shortUrl)}color="secondary" size="small" variant="outlined">Copy</Button>
        <Button onClick={()=>deleteLink(id)} color="secondary" size="small" variant="contained">Delete</Button>
        </Box>
        </Box>
        </Box>
        <Box>
          <Box>
            <Box display="flex" justifyContent="center">
                <Typography>{totalClicks}</Typography>
                <ChartIcon></ChartIcon>
            </Box>
            <Typography variant="overline">Total Clicks</Typography>
          </Box>
        </Box>
    </Box>
  )
}

export default memo(LinkCard)