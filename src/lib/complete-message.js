import React from "react";

let CompleteMessage = () => {
  return(<div>
           <p>Congratulations! (clap clap clap)<br/>
           You have completed the quiz.</p>
           <p><a href="?reload=true">Start again</a></p>
         </div>);
}

export default CompleteMessage;

