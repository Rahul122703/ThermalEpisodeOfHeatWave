import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setRegion,
  setSeason,
  setDate,
} from "../../../features/filter/filterSlice";

import {
  fetchWestWinterPredict,
  fetchWestPremonsoonPredict,
  fetchWestMonsoonPredict,
  fetchWestPostmonsoonPredict,
} from "../../../thunks/westThunks";

import {
  fetchNorthMonsoonPredict,
  fetchNorthPostmonsoonPredict,
} from "../../../thunks/northThunks";

export default function FilterPanel() {
  const dispatch = useDispatch();

  const {
    regions,
    seasons,
    dates,
    selectedRegion,
    selectedSeason,
    selectedDate,
  } = useSelector((state) => state.filter);

  /*
    REGION → ALLOWED SEASONS
  */
  const REGION_SEASONS = {
    West: ["Premonsoon", "Monsoon", "Postmonsoon", "Winter"],
    North: ["Monsoon", "Postmonsoon"],
  };

  /*
    REGION + SEASON → API THUNK
  */
  const PREDICTION_MAP = {
    West: {
      Winter: fetchWestWinterPredict,
      Premonsoon: fetchWestPremonsoonPredict,
      Monsoon: fetchWestMonsoonPredict,
      Postmonsoon: fetchWestPostmonsoonPredict,
    },

    North: {
      Monsoon: fetchNorthMonsoonPredict,
      Postmonsoon: fetchNorthPostmonsoonPredict,
    },
  };

  const allowedSeasons = REGION_SEASONS[selectedRegion] || [];

  /*
    FETCH DATA WHEN REGION OR SEASON CHANGES
  */
  useEffect(() => {
    const thunk = PREDICTION_MAP[selectedRegion]?.[selectedSeason];

    if (thunk) {
      dispatch(thunk());
    }
  }, [selectedRegion, selectedSeason, dispatch]);

  /*
    AUTO RESET SEASON IF INVALID FOR REGION
  */
  useEffect(() => {
    if (!allowedSeasons.includes(selectedSeason)) {
      dispatch(setSeason(allowedSeasons[0]));
    }
  }, [selectedRegion]);

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 bg-gray-50 rounded-md shadow-md">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Max Temperature</h3>
        <p className="text-sm text-gray-500 mt-1">
          Adjust filters to refine forecast results
        </p>
      </div>

      {/* REGION */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Select Region
        </label>

        <select
          value={selectedRegion}
          onChange={(e) => dispatch(setRegion(e.target.value))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* SEASON */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Select Season
        </label>

        <select
          value={selectedSeason}
          onChange={(e) => dispatch(setSeason(e.target.value))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          {allowedSeasons.map((season) => (
            <option key={season}>{season}</option>
          ))}
        </select>
      </div>

      {/* DATE */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-700">
          Select Forecast Date
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
          {dates.map((date) => {
            const active = selectedDate === date;

            return (
              <button
                key={date}
                onClick={() => dispatch(setDate(date))}
                className={`text-sm font-medium rounded-lg px-3 py-2 border ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                {date}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
