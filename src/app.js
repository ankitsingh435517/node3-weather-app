const express = require("express");
const path = require("path");
const hbs = require("hbs");

const getWeatherForecast = require("./utils/getWeatherForecast");

const app = express();

const PORT = process.env.PORT || 3000;

// configuring static files and views path
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting static path directory to express
app.use(express.static(publicDirectoryPath));

// setting view engine and views path directory to express
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ankit",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ankit",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ankit",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404NotFound", {
    error: "Help page not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address query not found",
    });
  }

  const lattitude = 37.8267;
  const longitude = -122.4233;

  getWeatherForecast(lattitude, longitude, (error, { current } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    const {
      weather_descriptions: weather,
      temperature,
      feelslike,
      humidity,
    } = current;

    const forecast = `${weather[0]}. It is ${temperature} degrees out but feels like ${feelslike} degrees out.Humidity is ${humidity}`;

    res.send({
      forecast,
      location: req.query.address,
    });
  });
});

app.get("*", (req, res) => {
  res.render("404NotFound", {
    error: "The page you were looking for does not exist!",
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
