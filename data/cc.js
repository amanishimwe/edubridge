const csvtojson = require("csvtojson");
const fs = require("fs");
const path = require("path");

const csvFilePath = path.join(__dirname, "final_dataset.csv");

const csvData = `ID,Regions,District,Longitude,Latitude,Year,Total Boys Enrollment,Total Girls Enrollment,Total Enrollment,Type of school, Number of Male teachers,Number of female teachers, Number of teacher's who provide special needs education,Total Number of Teachers,Number of Absent Teachers
2021,BUKEDI,PALLISA,604311.8401035076,132523.88988086526,2013,71.0,780.0,851.0,Mixed day,9.0,7.0,1.0,16.0,
2022,BUKEDI,PALLISA,604311.8401035076,132523.88988086526,2013,71.0,780.0,851.0,Mixed day,7.0,3.0,,10.0,
2023,BUKEDI,PALLISA,604311.8401035076,132523.88988086526,2013,71.0,780.0,851.0,Mixed day,7.0,8.0,2.0,15.0,
2024,BUKEDI,PALLISA,604311.8401035076,132523.88988086526,2013,71.0,780.0,851.0,Mixed day,10.0,7.0,0.0,17.0,
2025,BUKEDI,PALLISA,604311.8401035076,132523.88988086526,2013,71.0,780.0,851.0,Mixed day,9.0,6.0,1.0,15.0,
1,SOUTH BUGANDA,MASAKA,372569.06009659095,-54007.26347453323,2013,220.0,224.0,444.0,Mixed day,3.0,7.0,,10.0,
2,SOUTH BUGANDA,MASAKA,372569.06009659095,-54007.26347453323,2013,220.0,224.0,444.0,Mixed day,1.0,10.0,0.0,11.0,
3,SOUTH BUGANDA,MASAKA,372569.06009659095,-54007.26347453323,2013,220.0,224.0,444.0,Mixed day,2.0,7.0,,9.0,
4,SOUTH BUGANDA,MASAKA,372569.06009659095,-54007.26347453323,2013,220.0,224.0,444.0,Mixed day,3.0,5.0,,8.0,
5,SOUTH BUGANDA,MASAKA,372569.06009659095,-54007.26347453323,2013,220.0,224.0,444.0,Mixed day,7.0,3.0,,10.0,
6,SOUTH BUGANDA,MASAKA,372569.06009659095,-54007.26347453323,2013,220.0,224.0,444.0,Mixed day,3.0,5.0,0.0,8.0,
176265,ELGON,SIRONKO,646640.2519944146,129830.9936369828,2014,385.0,411.0,796.0,Mixed day,4.0,5.0,2.0,9.0,
176266,ELGON,SIRONKO,646640.2519944146,129830.9936369828,2014,385.0,411.0,796.0,Mixed day,9.0,3.0,1.0,12.0,
176267,ELGON,SIRONKO,646640.2519944146,129830.9936369828,2014,385.0,411.0,796.0,Mixed day,8.0,1.0,,9.0,
176268,ELGON,SIRONKO,646640.2519944146,129830.9936369828,2014,385.0,411.0,796.0,Mixed day,5.0,3.0,,8.0,
176269,ELGON,SIRONKO,646640.2519944146,129830.9936369828,2014,385.0,411.0,796.0,Girls boarding,9.0,9.0,1.0,18.0,
176270,ELGON,SIRONKO,646640.2519944146,129830.9936369828,2014,385.0,411.0,796.0,Mixed day,4.0,5.0,,9.0,
`;

csvtojson()
  .fromString(csvFilePath)
  .then((jsonObj) => {
    const filteredData = jsonObj.map(
      ({ ID, Regions, District, Longitude, Latitude }) => ({
        ID,
        Regions,
        District,
        Longitude,
        Latitude,
      })
    );

    fs.writeFile(
      "output.json",
      JSON.stringify(filteredData, null, 2),
      (err) => {
        if (err) throw err;
        console.log("Data written to file");
      }
    );
  });

csvtojson();
