import React from 'react';
import "../styles/globals.css";


//internal ports
import {PROVIDER} from "../context/context.js";
import toast , {Toaster} from "react-hot-toast";

const App = ({Component, pageProps}) => {
  return (
    <>
      <PROVIDER>
        <Component {...pageProps}/>
      </PROVIDER>
      <Toaster/>


<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/proper-min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/plugin/waypoint.min.js"></script>
<script src="assets/js/plugin/owl.carousel.min.js"></script>
<script src="assets/js/plugin/jquery.nice-select.min.js"></script>
<script src="assets/js/plugin/wow.min.js"></script>
<script src="assets/js/main.js"></script>
      
    </>
  )
}

export default App