import { Fragment, useState } from "react";
import axios from "axios";

const PhotosUploader = ({addedPhotos, setAddedPhotos}) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setPhotoLink("");
    setAddedPhotos((prev) => [...prev, filename]);
  };

  const uploadPhoto = async (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (const file of files) {
      console.log(file);
      data.append("photos", file);
    }
    const { data: filenames } = await axios.post("/upload", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    setAddedPhotos((prev) => [...prev, ...filenames]);
  };
  return (
    <Fragment>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          placeholder="Add using a link ...jpg"
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:4000/uploads/" + link}
              />
            </div>
          ))}
        <label className="flex h-32 cursor-pointer items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </Fragment>
  );
};

export default PhotosUploader;
