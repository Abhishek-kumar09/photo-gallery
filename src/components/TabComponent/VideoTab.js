import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { fetchResource } from '../../utils/fetch';

export default function VideoTab() {
  const [videos, setVideos] = React.useState(null);
  const [tooManyReqError, setTooManyReqError] = React.useState(false);

  const POPULAR_VIDEOS_URL = "https://api.pexels.com/videos/popular?per_page=15";

  const videoUrl = (pNum) => POPULAR_VIDEOS_URL + `&page=${pNum || 1}`;

  React.useEffect(() => {
    fetchResource(videoUrl(), tooManyReqError,setTooManyReqError).then(videos => setVideos(videos.videos));
  }, []);

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
          return (<Box >
            <video muted preload='none' loop autoPlay style={{maxWidth: "30vw"}}>
              <source src={video.video_files[3].link} type="video/mp4" />
            </video>
          </Box>)
        })}
      </div>
      {tooManyReqError && <Typography variant='h6'>
        Too Many Request: The Free API service Provided by Pexels has reached limit, try after some time
      </Typography>}
    </div>
  )
}
