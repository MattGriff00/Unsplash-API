import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
    accessKey: "6o8mioMqSuOC7vaBJNlnHaCEkMTt7GVCjFwDdQdHHX8",
  });


export default function SearchPhotos() {

//These are the hook functions that manage the state of the component

const [query, setQuery] = useState("");
const [pics, setPics] = useState([]);

//This is the API function that calls for the actual images

const searchPhotos = async (e) => {
    e.preventDefault();
//This makes the query for the package from the API
    unsplash.search.photos(query)
//This command gets the converts the response into JSON object & then we set the pics to the results of that JSON object 
    .then(toJson).then((json) => {setPics(json.results);});
  };

  return (
    <>
      <form className="form" onSubmit={searchPhotos}> 
        <label className="label" htmlFor="query"> 
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {pics.map((pic) => <div className="card" key={pic.id}>
            <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="50%"
                height="50%"
            ></img>
        </div> )}
      </div>
    </>
  );
}