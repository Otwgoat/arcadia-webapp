import { ExclamationMark, XCircle } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { deleteFile, getFiles } from "../../../services/firebase";
import { useQuery } from "@tanstack/react-query";
import CustomButton from "../../CustomButton";
import { uploadFile } from "../../../services/firebase";
import { useMediaQuery } from "react-responsive";

const UpdateAnimalImages = ({ animal }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [files, setFiles] = useState();
  const [selectImagesError, setSelectImagesError] = useState();
  const [imagesLoading, setImagesLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({
    images: "",
  });
  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: () => getFiles("animals/" + animal.id),
  });
  const handleDelete = (imageUrl) => {
    try {
      deleteFile(imageUrl);
    } catch (error) {
      console.error("Error in deleteAnimalImage API call:", error);
      throw error;
    }
  };
  const handleButtonClick = () => {
    setSelectImagesError();
    const realFileInput = document.getElementById("animalImages");
    if (realFileInput) {
      realFileInput.click();
    } else {
      console.error("No file input found");
    }
  };
  const fileSelectedPlaceholder = (file) => {
    if (imagesLoading) {
      return (
        <>
          <p className={file.progress < 100 ? "loading" : "fileSelectedName"}>
            {file.name} : {file.progress ? file.progress : 0}%
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="fileSelectedName">{file.name}</p>
        </>
      );
    }
  };
  const handleSubmit = async (e) => {
    try {
      const uploadPromises = files.map((file) => {
        uploadFile(file, animal.id, setImagesLoading, setFiles, "animals");
      });
      await Promise.all(uploadPromises).then(() => {
        setImagesLoaded(true);
        setSuccessMessage("Images ajoutées avec succès");
        setSubmitSuccess(true);
      });
    } catch (error) {
      setErrors({
        images:
          "Erreur lors de l'ajout des images, veuillez réssayer ultérieurement.",
      });
    }
  };

  return (
    <div className="listContainer">
      {images && images.length > 0 && (
        <p className="infoMessage">
          L'image marquée "!" est la photo principale de l'animal.
        </p>
      )}
      {images &&
        images.map((image) => (
          <div key={image.name} className="listItem imageListItem">
            <div className="listItemContent imageListItemContent">
              <div className="listItemContentHeader">
                {isDesktop ? (
                  <p className="subh1">{image.name}</p>
                ) : (
                  <h3>{image.name}</h3>
                )}
                {image.isPrincipal === "true" ? (
                  <ExclamationMark
                    size={30}
                    weight="regular"
                    color="#fdf5e9"
                    id="exclamation"
                  />
                ) : (
                  ""
                )}
                <XCircle
                  size={20}
                  weight="regular"
                  color="#cf322a"
                  className="deleteIcon"
                  onClick={() => handleDelete(image.url)}
                />
              </div>
              <img
                className="dashboardImage"
                src={image.url}
                alt={image.name}
                width={390}
                height={400}
              />
            </div>
          </div>
        ))}
      {images && images.length === 0 && <p>Aucune image pour cet animal</p>}
      <form>
        <label htmlFor="animalImages" className="formLabel">
          Ajouter des images
        </label>
        <input
          type="file"
          name="animalImages"
          id="animalImages"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
        <CustomButton
          id="selectImagesButton"
          type="button"
          title="Sélectionner des images"
          buttonClassName={
            isDesktop ? "mediumDesktopButton" : "mediumMobileButton"
          }
          onClick={handleButtonClick}
        />
        {selectImagesError && (
          <p className="errorMessage">{selectImagesError}</p>
        )}
        {files && files.length > 0 && (
          <div className="filesSelectedList">
            {files &&
              files.map((image, index) => (
                <div key={index}>{fileSelectedPlaceholder(image)}</div>
              ))}
          </div>
        )}
        {errors.images && <p className="errorMessage">{errors.images}</p>}
        {files && files.length > 0 && (
          <CustomButton
            id="submitImages"
            type="submit"
            title="Valider les images"
            buttonClassName={
              isDesktop ? "mediumDesktopButton" : "mediumMobileButton"
            }
            successMessage={successMessage}
            submitSuccess={submitSuccess}
            onClick={handleSubmit}
          />
        )}
      </form>
    </div>
  );
};

export default UpdateAnimalImages;
