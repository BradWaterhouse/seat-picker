import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './components/App/App';

const anchor = document.getElementById("app");

if (anchor) {
  ReactDOM.render(<App />, anchor);
}
