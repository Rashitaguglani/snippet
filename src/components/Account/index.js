import { useState, Fragment , useEffect, useCallback} from 'react';
import Navbar from "./Navbar";
import { Grid, Box, Typography, Button, Divider, Snackbar } from '@mui/material';
import LinkCard from './LinkCard';
import ShortenURLModal from '../ShortenURLModal';
import { getFirestore, collection, addDoc , getDocs} from 'firebase/firestore'; // Import Firestore functions
import { auth } from '../../firebase'; // Import auth from your firebase config
import { nanoid } from 'nanoid';
import { serverTimestamp } from "firebase/firestore";
import { doc, deleteDoc } from 'firebase/firestore';
import copy from 'copy-to-clipboard';

//const dummyData = [
  //{ id: '1s2f3g45', createdAt: new Date(), name: 'My website', longURL: 'https://google.com', shortCode: 'abcd', totalClicks: 313 },
 // { id: '1s2f3g46', createdAt: new Date(), name: 'My website 2', longURL: 'https://example.com', shortCode: 'efgh', totalClicks: 215 }
//];

const Account = () => {
  const [newLinkToastr, setNewLinkToastr] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [links, setLinks] = useState([]);
  const userUid= auth.currentUser.uid

  const handleCreateShortenLink = async (name, longURL) => {
    try {
      const link = {
        name,
        longURL,
        createdAt: serverTimestamp(), // Use client-side timestamp for now
        shortCode: nanoid(6),
        totalClicks: 0,
      };
      const firestore = getFirestore(); // Get Firestore instance
      const userLinksCollectionRef = collection(firestore, 'users', userUid, 'links'); // Get reference to user's links collection
      const resp = await addDoc(userLinksCollectionRef, link); // Add document to the collection
      
      setLinks(links=>[...links,{...link, createdAt: new Date(), id: resp.id}])
      
      setOpenModal(false);
    } catch (error) {
      console.error('Error creating shorten link:', error);
    }
  };
  
  useEffect(() => {
    const fetchLinks = async () => {
      const firestore = getFirestore(); // Get Firestore instance
      const linksCollectionRef = collection(firestore, 'users', userUid, 'links'); // Get reference to user's links collection
      const snapshot = await getDocs(linksCollectionRef); // Retrieve documents from the collection
      const tempLinks=[]
      snapshot.forEach((doc) => tempLinks.push({...doc.data(), id:doc.id, createdAt: doc.data().createdAt.toDate()
      }));
      setLinks(tempLinks);
    };
  
    fetchLinks(); // Call the fetchLinks function to trigger the effect
  }, [userUid]); // Add userUid as a dependency

  const handleDeleteLink = useCallback(async (linkDocID) => {
    try {
      const userUid = auth.currentUser.uid; // Get the current user's UID
      const firestore = getFirestore(); // Get Firestore instance
      const linkDocRef = doc(firestore, 'users', userUid, 'links', linkDocID); // Get reference to the specific link document
      await deleteDoc(linkDocRef); // Delete the document
      setLinks(links.filter((link) => link.id !== linkDocID)); // Update the state to remove the deleted link
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  }, [links]); 

  //const dummyFunction=useCallback(()=>console.log('dummy function'),[])
  const handleCopyLink = useCallback((shortUrl) => {
    copy(shortUrl); // Use the copy function to copy the URL
    setNewLinkToastr(true);
  }, []);
  


  return (
    <div>
      <Snackbar open = {newLinkToastr} onClose={()=> setNewLinkToastr(false)}  autoHideDuration={2000}  message="Link copied to the clipboard"></Snackbar>

      {openModal && <ShortenURLModal createShortenLink={handleCreateShortenLink} handleClose={() => setOpenModal(false)}></ShortenURLModal>}
      <Navbar />
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Box>
              <Typography variant="h4" style={{ marginBottom: '20px' }}>
                LINKS
              </Typography>
              <Button onClick={() => setOpenModal(true)} variant="contained" color="secondary" style={{ marginBottom: '20px' }}>
                Create New
              </Button>
              {links.sort(
                (prevLink,nextLink)=> nextLink.createdAt - prevLink.createdAt
              ).map((link, idx) => (
                <Fragment key={link.id}>
                  <LinkCard {...link} 
                 // dummyFunction={dummyFunction}
                  deleteLink={handleDeleteLink} 
                  copyLink = {handleCopyLink}
                   />
                  {idx !== links.length - 1 && (
                    <Box my={4}>
                      <Divider />
                    </Box>
                  )}
                </Fragment>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Account;
