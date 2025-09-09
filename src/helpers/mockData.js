export const mockDriversData = {
  2024: [
    {
      position: "1",
      points: "575",
      wins: "19",
      Driver: {
        driverId: "max_verstappen",
        givenName: "Max",
        familyName: "Verstappen",
        nationality: "Dutch",
        permanentNumber: "33",
        dateOfBirth: "1997-09-30",
        url: "http://en.wikipedia.org/wiki/Max_Verstappen",
      },
      Constructors: [
        {
          constructorId: "red_bull",
          name: "Red Bull Racing",
          nationality: "Austrian",
          url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
        },
      ],
    },
    {
      position: "2",
      points: "285",
      wins: "2",
      Driver: {
        driverId: "perez",
        givenName: "Sergio",
        familyName: "Perez",
        nationality: "Mexican",
        permanentNumber: "11",
        dateOfBirth: "1990-01-26",
        url: "http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez",
      },
      Constructors: [
        {
          constructorId: "red_bull",
          name: "Red Bull Racing",
          nationality: "Austrian",
          url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
        },
      ],
    },
    {
      position: "3",
      points: "234",
      wins: "0",
      Driver: {
        driverId: "hamilton",
        givenName: "Lewis",
        familyName: "Hamilton",
        nationality: "British",
        permanentNumber: "44",
        dateOfBirth: "1985-01-07",
        url: "http://en.wikipedia.org/wiki/Lewis_Hamilton",
      },
      Constructors: [
        {
          constructorId: "mercedes",
          name: "Mercedes",
          nationality: "German",
          url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
        },
      ],
    },
    {
      position: "4",
      points: "206",
      wins: "1",
      Driver: {
        driverId: "sainz",
        givenName: "Carlos",
        familyName: "Sainz",
        nationality: "Spanish",
        permanentNumber: "55",
        dateOfBirth: "1994-09-01",
        url: "http://en.wikipedia.org/wiki/Carlos_Sainz_Jr.",
      },
      Constructors: [
        {
          constructorId: "ferrari",
          name: "Ferrari",
          nationality: "Italian",
          url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
        },
      ],
    },
    {
      position: "5",
      points: "200",
      wins: "0",
      Driver: {
        driverId: "alonso",
        givenName: "Fernando",
        familyName: "Alonso",
        nationality: "Spanish",
        permanentNumber: "14",
        dateOfBirth: "1981-07-29",
        url: "http://en.wikipedia.org/wiki/Fernando_Alonso",
      },
      Constructors: [
        {
          constructorId: "aston_martin",
          name: "Aston Martin",
          nationality: "British",
          url: "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One",
        },
      ],
    },
  ],
};

export const mockConstructorsData = {
  2024: [
    {
      position: "1",
      points: "860",
      wins: "21",
      Constructor: {
        constructorId: "red_bull",
        name: "Red Bull Racing",
        nationality: "Austrian",
        url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
      },
    },
    {
      position: "2",
      points: "409",
      wins: "1",
      Constructor: {
        constructorId: "mercedes",
        name: "Mercedes",
        nationality: "German",
        url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
      },
    },
  ],
};

export const mockRacesData = {
  2024: [
    {
      round: "1",
      raceName: "Bahrain Grand Prix",
      date: "2023-03-05",
      Circuit: {
        circuitId: "bahrain",
        circuitName: "Bahrain International Circuit",
        Location: {
          locality: "Sakhir",
          country: "Bahrain",
        },
      },
      Results: [
        {
          position: "1",
          Driver: {
            driverId: "max_verstappen",
            givenName: "Max",
            familyName: "Verstappen",
          },
          Constructor: {
            name: "Red Bull Racing",
          },
        },
      ],
    },
  ],
};

export const mockDriverDetails = {
  max_verstappen: {
    2024: {
      driverStandings: {
        position: "1",
        points: "575",
        wins: "19",
        Driver: {
          driverId: "max_verstappen",
          givenName: "Max",
          familyName: "Verstappen",
          nationality: "Dutch",
          permanentNumber: "33",
          dateOfBirth: "1997-09-30",
          url: "http://en.wikipedia.org/wiki/Max_Verstappen",
        },
        Constructors: [
          {
            constructorId: "red_bull",
            name: "Red Bull Racing",
            nationality: "Austrian",
          },
        ],
      },
      races: [
        {
          round: "1",
          raceName: "Bahrain Grand Prix",
          date: "2023-03-05",
          Circuit: {
            circuitId: "bahrain",
            circuitName: "Bahrain International Circuit",
            Location: {
              locality: "Sakhir",
              country: "Bahrain",
            },
          },
          Results: [
            {
              position: "1",
              grid: "1",
              Constructor: {
                constructorId: "red_bull",
                name: "Red Bull Racing",
              },
            },
          ],
        },
        {
          round: "2",
          raceName: "Saudi Arabian Grand Prix",
          date: "2023-03-19",
          Circuit: {
            circuitId: "jeddah",
            circuitName: "Jeddah Corniche Circuit",
            Location: {
              locality: "Jeddah",
              country: "Saudi Arabia",
            },
          },
          Results: [
            {
              position: "2",
              grid: "15",
              Constructor: {
                constructorId: "red_bull",
                name: "Red Bull Racing",
              },
            },
          ],
        },
      ],
    },
  },
  perez: {
    2024: {
      driverStandings: {
        position: "2",
        points: "285",
        wins: "2",
        Driver: {
          driverId: "perez",
          givenName: "Sergio",
          familyName: "Perez",
          nationality: "Mexican",
          permanentNumber: "11",
          dateOfBirth: "1990-01-26",
          url: "http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez",
        },
        Constructors: [
          {
            constructorId: "red_bull",
            name: "Red Bull Racing",
            nationality: "Austrian",
          },
        ],
      },
      races: [
        {
          round: "1",
          raceName: "Bahrain Grand Prix",
          date: "2023-03-05",
          Circuit: {
            circuitId: "bahrain",
            circuitName: "Bahrain International Circuit",
            Location: {
              locality: "Sakhir",
              country: "Bahrain",
            },
          },
          Results: [
            {
              position: "2",
              grid: "2",
              Constructor: {
                constructorId: "red_bull",
                name: "Red Bull Racing",
              },
            },
          ],
        },
      ],
    },
  },
  hamilton: {
    2023: {
      driverStandings: {
        position: "3",
        points: "234",
        wins: "0",
        Driver: {
          driverId: "hamilton",
          givenName: "Lewis",
          familyName: "Hamilton",
          nationality: "British",
          permanentNumber: "44",
          dateOfBirth: "1985-01-07",
          url: "http://en.wikipedia.org/wiki/Lewis_Hamilton",
        },
        Constructors: [
          {
            constructorId: "mercedes",
            name: "Mercedes",
            nationality: "German",
          },
        ],
      },
      races: [
        {
          round: "1",
          raceName: "Bahrain Grand Prix",
          date: "2023-03-05",
          Circuit: {
            circuitId: "bahrain",
            circuitName: "Bahrain International Circuit",
            Location: {
              locality: "Sakhir",
              country: "Bahrain",
            },
          },
          Results: [
            {
              position: "5",
              grid: "7",
              Constructor: {
                constructorId: "mercedes",
                name: "Mercedes",
              },
            },
          ],
        },
      ],
    },
  },
};

export const getMockDrivers = (year) => {
  return mockDriversData[year] || mockDriversData[2024];
};

export const getMockConstructors = (year) => {
  return mockConstructorsData[year] || mockConstructorsData[2024];
};

export const getMockRaces = (year) => {
  return mockRacesData[year] || mockRacesData[2024];
};

export const getMockDriverDetails = (driverId, year) => {
  const driverData =
    mockDriverDetails[driverId]?.[year] ||
    mockDriverDetails[driverId]?.[2024] ||
    mockDriverDetails.max_verstappen[2024];

  return driverData;
};
