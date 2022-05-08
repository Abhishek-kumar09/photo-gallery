import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { fetchResource } from '../../utils/fetch';

export default function VideoTab() {
  const [videos, setVideos] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [tooManyReqError, setTooManyReqError] = React.useState(false);

  const POPULAR_VIDEOS_URL = "https://api.pexelss.com/videos/popular?per_page=10";

  const videoUrl = (pNum) => POPULAR_VIDEOS_URL + `&page=${pNum || pageNumber}`;

  React.useEffect(() => {
    fetchResource(videoUrl(), tooManyReqError,setTooManyReqError).then(videos => setVideos(videos.videos));
    // window.addEventListener("scroll", scrollEvent)
    // return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  function scrollEvent() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollRatio = winScroll / height;
    if (scrollRatio > 0.95) {
      if (!loading) {
        setLoading(true);
        fetchResource(videoUrl(pageNumber + 1), tooManyReqError, setTooManyReqError).then(newVideos => {
          setVideos([...videos, ...newVideos.videos]);
          setLoading(false);
          setPageNumber(pageNumber + 1);
        })
      }
    }
  }

  if (!videos && tooManyReqError) {
    return <Typography variant='h6'>
      Too Many Request To Pexels Server: The Free API service Provided by Pexels has reached limit, try after some time
    </Typography>
  }

  if (!videos) {
    return <CircularProgress />
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        {videos.map(video => {
          console.log({video})
          return (<Box >
            <video muted preload='none' loop autoPlay>
              <source src={video.video_files[3].link} type="video/mp4" />
            </video>
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
