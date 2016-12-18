import React from "react";
import ReactDOM from "react-dom";

import Movies from "./movies";

const app = document.getElementById('moviesApp');
ReactDOM.render(<Movies apiServer={apiServer}/>, app);
