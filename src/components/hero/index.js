import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { fetchResource } from "../../utils/fetch";
import CustomizedSearchBase from "../searchBox";

const Header = styled('header')({
  backgroundImage: `url("https://images.pexels.com/photos/8775535/pexels-photo-8775535.jpeg?auto=compress&cs=tinysrgb&fit=crop&fp-y=0.5&h=500&sharp=10&w=1400")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
  height: "100%",
  '&:before': {
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "20vh",
    content: "no-open-quote"
  }
});

export default function HeroComponent() {
  const [queriedPhotos, setQueriedPhotos] = useState(null);

  function onSubmit(query) {
    const BASE_URL = `https://api.pexels.com/v1/search?query=${query}&per_page=1`
    fetchResource(BASE_URL).then(({photos}) => {
      setQueriedPhotos(photos[0]?.src?.medium)
    })    
  }

  return (
    <Header className="App-header">
      <Container style={{ zIndex: 2, padding: "24px" }}  >
        <Typography variant="h3" fontWeight={600}>
          The best free stock photos, royalty free images & videos shared by creators.
        </Typography>
        <CustomizedSearchBase onSubmit={onSubmit} placeholder="Search for Free Photos and videos" />
        <Typography variant="caption" textAlign={"left"} display="block" p={"8px 0px"}>
          Suggested: mothers day, landscape, forest, flowers, nature mother more
        </Typography>
        {
          queriedPhotos ? (
            <img
              src={queriedPhotos}
              style={{width: "inherit", maxHeight: "50vh" }}
            />
          ) : null
        }
      </Container>
    </Header>
  )
}