import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import LoadingSpinner from "./../../shared/components/UIElememnts/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElememnts/ErrorModal";

export default function UserPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState(null);
  const { userId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      const data = await sendRequest(
        `http://localhost:5000/api/places/user/${userId}`
      );

      setLoadedPlaces(data.places);
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </>
  );
}
