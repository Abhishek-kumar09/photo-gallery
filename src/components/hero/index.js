import { Container, TextField, Typography } from "@mui/material";

export default function HeroComponent() {
  return (
    <header className="App-header" style={{
      backgroundImage: `url("https://images.pexels.com/photos/8775535/pexels-photo-8775535.jpeg?auto=compress&cs=tinysrgb&fit=crop&fp-y=0.5&h=500&sharp=10&w=1400")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
    }}>
      {/* <img src="https://images.pexels.com/photos/8775535/pexels-photo-8775535.jpeg?auto=compress&cs=tinysrgb&fit=crop&fp-y=0.5&h=500&sharp=10&w=1400"></img> */}
      <Container>
        <Typography variant="h3">
          The best free stock photos, royalty free images & videos shared by creators.
        </Typography>
        <TextField fullWidth />
      </Container>
    </header>
  )
}