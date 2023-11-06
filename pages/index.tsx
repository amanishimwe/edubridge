import MapBox from "@/components/dashboard/MapBox";
import { SearchForm } from "@/components/dashboard/SearchForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

import proj4 from "proj4";
import { randomBytes } from "crypto";

import axios from "axios";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const utmProjection =
  "+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";

export default function index() {
  const [Prediction, setPrediction] = React.useState("0%");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [getCordinates, setCordinates] = React.useState({
    lat: 0.3798415973127457,
    long: 32.55041095455265,
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("data2", data);

    // region: regionData.title,
    // district: districtName,
    // schoolType,
    // totalEnrollment,
    // coordinates: { lat, long },

    // setPrediction(randomBytes(1)[0] > 128 ? "20%" : "80%");

    setCordinates({
      lat: data?.coordinates?.lat,
      long: data?.coordinates?.long,
    });
    setIsLoading(false);

    return await axios
      .post("https://edubridge-9a1e95c37687.herokuapp.com/predict", [
        {
          Regions: data?.region,
          District: data?.district,
          "Type of school": data?.schoolType,
          "Total Enrollment": data?.totalEnrollment,
        },
      ])
      .then((res) => {
        const data = JSON.parse(res.data?.prediction);
        setPrediction(`${Number(data[0].toFixed(2))}%`);
        console.log("213", data)
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  // console.log({
  //   lat: getCordinates?.lat,
  //   long: getCordinates?.long,
  // })

  const coordinates = [getCordinates?.lat, getCordinates?.long];

  return (
    <div className="flex fixed h-screen">
      <div className="bg-white fixed w-[30%] h-full flex justify-end items-center ">
        <div>
          <SearchForm onSubmit={onSubmit} setCordinates={setCordinates} />
        </div>
      </div>
      <div className="w-[60%] py-6 px-4 right-0 fixed h-full space-y-2">
        <div className=" w-full h-fit border-b-2 pb-4   space-y-1">
          {isError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Unable to make the request, try again later
              </AlertDescription>
            </Alert>
          )}
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Predication
          </h4>

          {isLoading ? (
            <Skeleton className="h-20 w-28" />
          ) : (
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {Prediction}
            </h1>
          )}
        </div>
        <div className=" space-y-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Location
          </h4>
          {isLoading ? (
            <Skeleton className=" md:h-96 lg:h-[60vh] rounded-md w-[100%]" />
          ) : (
            <div className=" md:h-96 lg:h-[60vh] rounded-md bg-gray-200 w-[100%] ">
              <MapBox
                key={`${getCordinates.lat}-${getCordinates.long}`}
                coordinates={{
                  lat: getCordinates.lat,
                  long: getCordinates.long,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
