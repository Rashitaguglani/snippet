import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { Box, CircularProgress, Typography } from '@mui/material';

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [validLink, setValidLink] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0); // Local state to store totalClicks

  useEffect(() => {
    const fetchLinkDoc = async () => {
      try {
        const firestore = getFirestore();
        const linkDocRef = doc(firestore, 'links', shortCode);
        const linkDocSnap = await getDoc(linkDocRef);

        if (linkDocSnap.exists()) {
          const linkData = linkDocSnap.data();
          const longURL = linkData.longURL;
          const linkID = linkData.linkID;
          const userUid = linkData.userUid;

          // Read the current totalClicks value
          const totalClicksRef = doc(firestore, 'users', userUid, 'links', linkID);
          const totalClicksSnap = await getDoc(totalClicksRef);
          let currentTotalClicks = totalClicksSnap.exists() ? totalClicksSnap.data().totalClicks : 0;

          // Increment total clicks
          const newTotalClicks = currentTotalClicks + 1;

          // Update total clicks
          await updateDoc(totalClicksRef, {
            totalClicks: newTotalClicks
          });

          // Update local state to trigger UI re-render
          setTotalClicks(newTotalClicks);

          // Redirect to the longURL
          window.location.href = longURL;
          setValidLink(true);
        } else {
          console.error('Link document does not exist');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching link document:', error);
        setLoading(false);
      }
    };

    fetchLinkDoc();
  }, [shortCode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (validLink) {
        setLoading(false);
      }
    }, 3000); // Set loading to false after 3 seconds if the link is valid
    return () => clearTimeout(timer);
  }, [validLink]);

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
    return (
      <Box mt={10} textAlign="center">
        <Typography>Total Clicks: {totalClicks}</Typography>
      </Box>
    );
  }
};

export default LinkRedirect;
