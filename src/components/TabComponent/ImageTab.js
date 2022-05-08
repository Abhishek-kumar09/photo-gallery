import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { fetchResource } from '../../utils/fetch';

export default function TabOne() {
  const [photos, setPhotos] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [tooManyReqError, setTooManyReqError] = React.useState(false);

  const CURATED_PHOTOS_URL = "https://api.pexels.com/v1/curated?per_page=49";

  const photoUrl = (pNum) => CURATED_PHOTOS_URL + `&page=${pNum || pageNumber}`;

  React.useEffect(() => {
    fetchResource(photoUrl(), setTooManyReqError).then(photos => setPhotos(photos.photos));
    window.addEventListener("scroll", handleAutoLoadOnScroll)
    return () => window.removeEventListener("scroll", handleAutoLoadOnScroll);
  }, []);

  function handleAutoLoadOnScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollRatio = winScroll / height;
    if (scrollRatio > 0.95) {
      if (!loading) {
        setLoading(true);
        fetchResource(photoUrl(pageNumber + 1), setTooManyReqError).then(newPhotos => {
          setPhotos([...photos, ...newPhotos.photos]);
          setLoading(false);
          setPageNumber(pageNumber + 1);
        })
      }
    }
  }

  if (!photos && tooManyReqError) {
    return <Typography variant='h6'>
      Too Many Request To Pexels Server: The Free API service Provided by Pexels has reached limit, try after some time
    </Typography>
  }

  if (!photos) {
    return <CircularProgress />
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        {photos.map(photo => {
          return (<Box >
            <img src={photo.src.medium} alt={photo.photographer} />
          </Box>)
        })}
      </div>
      {tooManyReqError && <Typography variant='h6'>
        Too Many Request: The Free API service Provided by Pexels has reached limit, try after some time
      </Typography>}
      {loading && <div>Loading More Photos, Just For You!</div>}
    </div>
  )
}
