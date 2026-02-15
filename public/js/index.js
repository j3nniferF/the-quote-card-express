"use strict";

async function getRandomImage() {
  const accessKey = "";
  const endpoint = "https://api.unsplash.com/photos/random";

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Unsplash error: ${response.status}`);
    }

    const data = await response.json();
    const photoUrl = data.urls.regular;

    const imgDiv = document.querySelector(".background-img");
    imgDiv.style.backgroundImage = `url("${photoUrl}")`;
  } catch (error) {
    console.error(error);
  }
}

getRandomImage();
