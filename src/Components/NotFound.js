import React from "react";
import '../Css/NotFound.css';
const NotFound = () => {
  return (
    <div className="row">
      <div className="col-md-6 text-center not-found">
        <div class="card">
          <div class="card-body">
            <h3>Oops!</h3>
            <h2>404 Not Found</h2>
            Sorry, an error has occured, Requested page not found!
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
