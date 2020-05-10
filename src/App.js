import React from "react";
import { Huit, HuitBoard } from "./games/Huit";
import Lobby from "./lobby/react";
import { ThemeProvider, Box } from "theme-ui";
import theme from "./theme";
import SvgBg from "./components/Tartan/svgbg";
import SvgTile from "./components/Tartan/svgtile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playerID: null, in: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ playerID: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ in: true });
    event.preventDefault();
  }

  render() {
    const svg = SvgTile({
      palette: "R#CD072B Y#F2B409 B#5C442B BF#3D312B W#FFFFFF",
      threadcount: "R40 W40 B40 BF40 Y40 B40",
    });
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ position: "relative", minHeight: "100vh" }}>
          <SvgBg
            svg={svg}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: "-999",
            }}
          />
          <Lobby
            gameServer={`${window.location.protocol}//${window.location.hostname}:8000`}
            lobbyServer={`${window.location.protocol}//${window.location.hostname}:8000`}
            gameComponents={[{ game: Huit, board: HuitBoard }]}
            debug={false}
          />
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
