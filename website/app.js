/* Global Variables */
// Personal API Key for OpenWeatherMap API

// TODO: Integrating OpenWeatherMap API
const apiKey = "appid=5ff9367881db1860471c4f6e82e63475&units=imperial";
let result = {};

// TODO: Return Endpoint Data
// TODO: GET Route II: Client Side
const getData = async (url = "") => {
  // if (!response.ok) {
  // } else {
  try {
    const response = await fetch(url);
    const data = await response.json();
    result.temp = data.main.temp;
  } catch (error) {
    result = {};
    result.date = newDate;
    console.log("get error", error);
    alert("Please enter valid zip code :(");
  }
  // }
};

//TODO: POST Route II : Client Side
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("post error", error);
  }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
result.date = newDate;
// TODO: Naming HTML Inputs and Buttons For Interaction
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const generate = document.querySelector("#generate");
let userInput = {};

//TODO: Dynamic UI
const retrieveData = async () => {
  const request = await fetch("/test");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML = `Temperature: ${
      Math.round(allData.temp) || "___"
    } degrees`;
    document.getElementById("content").innerHTML = `Feeling: ${
      allData.content ?? "no feeling"
    }`;
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
  } catch (error) {
    console.log("retrieve from server", error);
  }
};

generate.addEventListener("click", async () => {
  result.content = feelings.value;
  let zipCode = zip.value;
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&${apiKey}`;
  try {
    await getData(baseURL);
    postData("/all", result);
    retrieveData();
  } catch (error) {
    result = {};
    console.log(error);
  }
});
