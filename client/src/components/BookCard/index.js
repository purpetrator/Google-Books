import React from "react";

function BookCard(props) {
  return (
    <div className="card mb-3" style={{ maxWidth: "640px" }}>
      <div className="row no-gutters">
        <div className="col-md-3">
          {props.image ? (
            <img src={props.image} className="card-img" />
          ) : (
            <p>Loading Image...</p>
          )}
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <h6 className="card-title">{props.subtitle}</h6>

            <p className="card-text">{props.description}</p>
            <p className="card-text">
              <small className="text-muted">{props.authors}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
