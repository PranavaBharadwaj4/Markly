import React from "react";
import scrollbar from "smooth-scrollbar";

var options = {
  damping: 0.07,
};

function Scrollbar() {
  React.useEffect(() => {
    scrollbar.init(document.body, options);
  }, []);

  return null;
}

export default Scrollbar;
