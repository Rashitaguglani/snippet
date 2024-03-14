import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from 'firebase/firestore'; 
import { Box, CircularProgress, Typography } from '@mui/material';

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [validLink, setValidLink] = useState(false); // New state to track if link is valid

  useEffect(() => {
    const fetchLinkDoc = async () => {
      try {
        const firestore = getFirestore(); // Get Firestore instance
        const linkDocRef = doc(firestore, 'links', shortCode); // Reference to the specific link document
        const linkDocSnap = await getDoc(linkDocRef); // Get the link document snapshot
    
        if (linkDocSnap.exists()) {
          const linkData = linkDocSnap.data(); // Get the data of the link document
          const longURL = linkData.longURL; // Extract the longURL from the link document data
          
          // Redirect to the longURL
          window.location.href = longURL;
          setValidLink(true); // Set validLink to true if link exists
        } else {
          console.error('Link document does not exist');
          setLoading(false); // Set loading to false if link does not exist
        }
      } catch (error) {
        console.error('Error fetching link document:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchLinkDoc(); // Call the fetchLinkDoc function when the component mounts
  }, [shortCode]);

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>REDIRECTING TO THE ORIGINAL LINK</Typography>
      </Box>
    );
  } else if (!validLink) {
    return (
      <Box mt={10} textAlign="center">
        <Typography>LINK IS INVALID</Typography>
      </Box>
    );
  } else {
    // This block should never be reached, but added for completeness
    return null;
  }
};

export default LinkRedirect;
