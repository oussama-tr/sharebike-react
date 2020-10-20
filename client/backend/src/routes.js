import React from "react";

const Dashboard = React.lazy(() => import("./views/Pages/Dashboard/Dashboard"));

const showEvents = React.lazy(() => import("./views/Events/Events"));
const eventForm = React.lazy(() => import("./views/Events/eventForm"));
const updateEvent = React.lazy(() => import("./views/Events/updateEvents"));
const detailsEvent = React.lazy(() => import("./views/Events/detailsEvent"));
const archivedEvents = React.lazy(() =>
  import("./views/Events/archivedEvents")
);

const Stations = React.lazy(() => import("./views/Station/Stations"));
const StationForm = React.lazy(() => import("./views/Station/StationForm"));
const MapStation = React.lazy(() => import("./views/Station/MapStation"));
const UpdateStations = React.lazy(() => import("./views/Station/UpdateStations"));
const DetailsStation = React.lazy(() => import("./views/Station/DetailsStation"));
const ArchivedStations = React.lazy(() =>
  import("./views/Station/ArchivedStations")
);

const Bikes = React.lazy(() => import("./views/Bike/Bikes"));
const BikesMap = React.lazy(() => import("./views/Bike/BikesMap"));
const BikeForm = React.lazy(() => import("./views/Bike/BikeForm"));
const UpdateBike = React.lazy(() => import("./views/Bike/UpdateBike"));
const DetailsBike = React.lazy(() => import("./views/Bike/DetailsBike"));
const ArchivedBikes = React.lazy(() =>
  import("./views/Bike/ArchivedBikes")
);


const Users = React.lazy(() => import("./views/Pages/Users/Users"));
const User = React.lazy(() => import("./views/Pages/Users/User"));

const showSlider = React.lazy(() => import("./views/Slider/showSlider"));
const addSlider = React.lazy(() => import("./views/Slider/addSlider"));
const updateSlider = React.lazy(() => import("./views/Slider/updateSlider"));
const detailsSlider = React.lazy(() => import("./views/Slider/detailsSlider"));
const inactiveSlider = React.lazy(() =>
  import("./views/Slider/inactiveSlider")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },

  { path: "/events", exact: true, name: "Evénements", component: showEvents },
  { path: "/events/show", exact: true, name: "", component: showEvents },
  { path: "/events/add", exact: true, name: "Ajouter", component: eventForm },
  {
    path: "/events/update/:id",
    exact: true,
    name: "Modifier",
    component: updateEvent
  },
  {
    path: "/events/details/:id",
    exact: true,
    name: "Details",
    component: detailsEvent
  },
  {
    path: "/events/archived",
    exact: true,
    name: "Archived",
    component: archivedEvents
  },

  { path: "/stations", exact: true, name: "Stations", component: Stations },
  { path: "/stations/show", exact: true, name: "", component: Stations },
  { path: "/stations/add", exact: true, name: "Ajouter", component: StationForm },
  { path: "/stations/Map", exact: true, name: "Map", component: MapStation },
  {
    path: "/stations/update/:id",
    exact: true,
    name: "Modifier",
    component: UpdateStations
  },
  {
    path: "/stations/details/:id",
    exact: true,
    name: "Details",
    component: DetailsStation
  },
  {
    path: "/stations/archived",
    exact: true,
    name: "Archived",
    component: ArchivedStations
  },

  { path: "/bikes", exact: true, name: "Bikes", component: Bikes },
  { path: "/bikes/show", exact: true, name: "", component: Bikes },
  { path: "/bikes/Map", exact: true, name: "", component: BikesMap },
  { path: "/bikes/add", exact: true, name: "Ajouter", component: BikeForm },
  {
    path: "/bikes/update/:id",
    exact: true,
    name: "Modifier",
    component: UpdateBike
  },
  {
    path: "/bikes/details/:id",
    exact: true,
    name: "Details",
    component: DetailsBike
  },
  {
    path: "/bikes/archived",
    exact: true,
    name: "Archived",
    component: ArchivedBikes
  },

  { path: "/slider", exact: true, name: "Slider", component: showSlider },
  {
    path: "/slider/ajouter",
    exact: true,
    name: "ajouter",
    component: addSlider
  },
  {
    path: "/slider/update/:id",
    exact: true,
    name: "Modifier",
    component: updateSlider
  },
  {
    path: "/slider/details/:id",
    exact: true,
    name: "Details",
    component: detailsSlider
  },
  {
    path: "/slider/archived",
    exact: true,
    name: "Inactif",
    component: inactiveSlider
  }
];

export default routes;
