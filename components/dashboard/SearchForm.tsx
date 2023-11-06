"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

const data = [
  {
    ID: 2021,
    Regions: "BUKEDI",
    District: "PALLISA",
    Longitude: 1.1702077816386993,
    Latitude: 33.70793772669458,
  },
  {
    ID: 2022,
    Regions: "BUKEDI",
    District: "PALLISA",
    Longitude: 1.1702077816386993,
    Latitude: 33.70793772669458,
  },
  {
    ID: 2023,
    Regions: "BUKEDI",
    District: "PALLISA",
    Longitude: 1.1702077816386993,
    Latitude: 33.70793772669458,
  },
  {
    ID: 2024,
    Regions: "BUKEDI",
    District: "PALLISA",
    Longitude: 1.1702077816386993,
    Latitude: 33.70793772669458,
  },
  {
    ID: 2025,
    Regions: "BUKEDI",
    District: "PALLISA",
    Longitude: 1.1702077816386993,
    Latitude: 33.70793772669458,
  },
  {
    ID: 1,
    Regions: "SOUTH BUGANDA",
    District: "MASAKA",
    Longitude: -0.3332572266220736,
    Latitude: 31.761135286075945,
  },
  {
    ID: 2,
    Regions: "SOUTH BUGANDA",
    District: "MASAKA",
    Longitude: -0.3332572266220736,
    Latitude: 31.761135286075945,
  },
  {
    ID: 3,
    Regions: "SOUTH BUGANDA",
    District: "MASAKA",
    Longitude: -0.3332572266220736,
    Latitude: 31.761135286075945,
  },
  {
    ID: 4,
    Regions: "SOUTH BUGANDA",
    District: "MASAKA",
    Longitude: -0.3332572266220736,
    Latitude: 31.761135286075945,
  },
  {
    ID: 5,
    Regions: "SOUTH BUGANDA",
    District: "MASAKA",
    Longitude: -0.3332572266220736,
    Latitude: 31.761135286075945,
  },
  {
    ID: 6,
    Regions: "SOUTH BUGANDA",
    District: "MASAKA",
    Longitude: -0.3332572266220736,
    Latitude: 31.761135286075945,
  },
  {
    ID: 176265,
    Regions: "ELGON",
    District: "SIRONKO",
    Longitude: 1.1784692269713208,
    Latitude: 34.27941318561599,
  },
  {
    ID: 176266,
    Regions: "ELGON",
    District: "SIRONKO",
    Longitude: 1.1784692269713208,
    Latitude: 34.27941318561599,
  },
  {
    ID: 176267,
    Regions: "ELGON",
    District: "SIRONKO",
    Longitude: 1.1784692269713208,
    Latitude: 34.27941318561599,
  },
  {
    ID: 176268,
    Regions: "ELGON",
    District: "SIRONKO",
    Longitude: 1.1784692269713208,
    Latitude: 34.27941318561599,
  },
  {
    ID: 176269,
    Regions: "ELGON",
    District: "SIRONKO",
    Longitude: 1.1784692269713208,
    Latitude: 34.27941318561599,
  },
  {
    ID: 176270,
    Regions: "ELGON",
    District: "SIRONKO",
    Longitude: 1.1784692269713208,
    Latitude: 34.27941318561599,
  },
];

// Define the validation schema using zod
const schema = z.object({
  region: z.string(),
  district: z.string().optional(),
  schoolType: z.string().optional(),
  totalEnrollment: z.number().optional(),
});

export function SearchForm({ onSubmit, setCordinates }) {
  const [Regions, setRegions] = useState([]);
  const [regionData, setRegionData] = useState({
    title: "",
    coordinates: [
      {
        lat: 0,
        long: 0,
      },
    ],
  });

  /**
   * region: "",
      district: "",
      schoolType: "",
      totalEnrollment: "",
      coordinates: {
        lat: 0,
        long: 0,
      },
   */

  const [districtName, setDistrictName] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [totalEnrollment, setTotalEnrollment] = useState("");

  useEffect(() => {
    const uniqueRegions = [...new Set(data.map((item) => item.Regions))];
    setRegions(uniqueRegions);
  }, []);

  const onHandleSubmit = (data) => {
    data.preventDefault();
    console.log("data1", data);
    const [lat, long] = regionData.coordinates[0];

    // setCordinates({
    //   lat,
    //   long,
    // });

    return onSubmit({
      region: regionData.title,
      district: districtName,
      schoolType,
      totalEnrollment,
      coordinates: { lat, long },
    });
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <Card className="border-none border-transparent w-full">
        <CardHeader>
          <CardTitle>Find Predictions</CardTitle>
          <CardDescription>
            Fill in the form below to find predictions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="area">Region</Label>
              <Select
                onValueChange={(d) =>
                  setRegionData({
                    title: d,
                    coordinates: Array.from(
                      new Set(
                        data
                          .filter((item) => item.Regions === d)
                          .map((item) => [item.Longitude, item.Latitude])
                      )
                    ),
                  })
                }
              >
                <SelectTrigger
                  className="line-clamp-1 h-14 w-[160px] truncate"
                  id="area"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {Regions.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="security-level">District</Label>
              <Select
                onValueChange={(d) => {
                  setDistrictName(d);
                }}
                defaultValue="2"
              >
                <SelectTrigger
                  id="security-level"
                  className="line-clamp-1 h-14 w-[160px] truncate"
                >
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    ...new Set(
                      data
                        .filter((item) => item.Regions === regionData.title)
                        .map((item) => item.District)
                    ),
                  ].map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="security-level">Type Of School</Label>
            <Select
              onValueChange={(d) => {
                setSchoolType(d);
              }}
              defaultValue="2"
            >
              <SelectTrigger
                id="security-level"
                className="line-clamp-1 h-14  truncate"
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[200px] ">
                  <SelectItem value="Day">DAY</SelectItem>
                  <SelectItem value="Boarding">BOARDING</SelectItem>
                  <SelectItem value="Both">DAY & BOARDING</SelectItem>
                  <SelectItem value="Boys boarding">BOYS BOARDING</SelectItem>
                  <SelectItem value="Girls boarding">GIRLS BOARDING</SelectItem>
                  <SelectItem value="Boys day">BOYS DAY</SelectItem>
                  <SelectItem value="Girls day">GIRLS DAY</SelectItem>

                  <SelectItem value="Boys day and boarding">
                    BOYS DAY & BOARDING
                  </SelectItem>
                  <SelectItem value="Boys dayboarding">
                    BOYS DAYBOARDING
                  </SelectItem>
                  <SelectItem value="Girls dayboarding">
                    GIRLS DAY & BOARDING
                  </SelectItem>
                  <SelectItem value="BOTH">GIRLS DAY & BOARDING</SelectItem>

                  <SelectItem value="Mixed boarding">MIXED BOARDING</SelectItem>
                  <SelectItem value="Mixed day">MIXED DAY</SelectItem>
                  <SelectItem value="Mixed day &boarding">
                    MIXED DAY & BOARDING
                  </SelectItem>
                  <SelectItem value="Mixed dayGirls dayBoys day">
                    MIXED DAY & BOARDING (BOYS & GIRLS)
                  </SelectItem>
                  <SelectItem value="Government">GOVERNMENT</SelectItem>
                  <SelectItem value="Private">PRIVATE</SelectItem>
                  <SelectItem value="Community">COMMUNITY</SelectItem>
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">Total Enrollment</Label>
            <Input
              onChange={(e) => setTotalEnrollment(e.target.value)}
              className="h-14"
              id="subject"
              type="number"
            />
          </div>
        </CardContent>
        <CardFooter className=" justify-end space-x-2">
          <Button className=" bg-blue-700 rounded-full">
            Predict
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
