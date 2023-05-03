import { Provider } from "react-redux";
import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import store from "../src/store/reducers";
import { LocationContextProvider } from "../src/store/context/location-context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LocationContextProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </LocationContextProvider>
    </Provider>
  );
}

export default MyApp;
