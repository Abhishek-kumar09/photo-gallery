import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgress, Container } from '@mui/material';


export default function TabOne() {
  const [photos, setPhotos] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [tooManyReqError, setTooManyReqError] = React.useState(false);

  const CURATED_PHOTOS_URL = "https://api.pexelsqw.com/v1/curated?per_page=49";

  const photoUrl = (pNum) => CURATED_PHOTOS_URL + `&page=${pNum || pageNumber}`;

  React.useEffect(() => {
    fetchResource(photoUrl()).then(photos => setPhotos(photos.photos));
    window.addEventListener("scroll", scrollEvent)
    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  async function fetchResource(url) {
    console.log({ p: process.env })
    return fetch(url,
      {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_PEXELS_API_KEY,
        }
      })
      .then(res => {
        if (res.ok) {
          if (tooManyReqError) {
            setTooManyReqError(false);
          }
          return res.json()
        }

        if (res.status == 429) {
          setTooManyReqError(true);
        }
      })
      .then(json => json)
  }

  function scrollEvent() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollRatio = winScroll / height;
    if (scrollRatio > 0.95) {
      if (!loading) {
        setLoading(true);
        fetchResource(photoUrl(pageNumber + 1)).then(newPhotos => {
          setPhotos([...photos, ...newPhotos.photos]);
          setLoading(false);
          setPageNumber(pageNumber + 1);
        })
      }
    }

    console.log("scrolled", winScroll / height);
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
