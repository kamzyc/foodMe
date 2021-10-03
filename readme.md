![Banner](https://github.com/kamzyc/foodme/blob/master/src/readme-files/banner.png)

# foodMe

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/kamzyc/foodMe?color=success)
![GitHub last commit](https://img.shields.io/github/last-commit/kamzyc/foodMe?color=orange)
![GitHub issues](https://img.shields.io/github/issues-raw/kamzyc/foodMe?color=red)
[![Netlify Status](https://api.netlify.com/api/v1/badges/eba3c020-2bf5-486b-b8b4-f86ae4533001/deploy-status)](https://food-me.netlify.app/)

# Introduction

**foodMe** is recipe search app, based on forkify API. It's my version, redone from Udemy course - **The Complete JavaScript Course 2021: From Zero to Expert!** It is my first bigger project, which also is first i commited to my Github page.

<p>&nbsp;</p>

# Preview

![Preview](https://github.com/kamzyc/foodme/blob/master/src/readme-files/preview.png)

<p>&nbsp;</p>

# Table of contents

-  [Introduction](#introduction)
-  [Preview](#preview)
-  [Installation](#installation)
-  [Development](#development)
-  [Features](#features)
-  [Styles](#styles)
-  [License](#license)
-  [Footer](#footer)

<p>&nbsp;</p>

# Installation

[(Back to top)](#table-of-contents)

To use this project on own risk, first clone this repo, with the commands:

```
git init
```

```
git clone https://github.com/kamzyc/foodMe.git
```

Next, install all dependencies, included in [package.json](https://github.com/kamzyc/foodMe/blob/master/package.json). To do so, use this command (of course, node.js need to be present):

```
npm install
```

<p>&nbsp;</p>

# Development

[(Back to top)](#table-of-contents)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![SASS](https://img.shields.io/badge/SCSS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

Project is using MVC architecture. Model is working on main state of data published on site, and manipulate all data. All views are used in displaying changes for user. Controller functions have job to communicate model with views and other way around.

Applied async/await concept for fetching data from **forkify API**. Main recipe and also search results are fetched from databes, with mentioned API.

For this project, used CSS preprocessor (SCSS) for styling website.

Additional packages used in this project:

-  [dotenv](https://www.npmjs.com/package/dotenv) - to hide API key and also API url
-  [fraction.js](https://www.npmjs.com/package/fraction.js) - for displaying fractions in more pleased way

<p>&nbsp;</p>

# Features

[(Back to top)](#table-of-contents)

-  Display recipe ingredients and link for full recipe
-  Search for recipies with big amount of keywords
-  Manipulate amount of servings with change in ingredients amount
-  Add favourite recipies to bookmarks
-  Save ingredients on shopping list
-  Use calendar feature for your meals plan
-  Saving all bookmarks, ingredients and calendar in local storage of browser
-  Create new recipe and send it to database

<p>&nbsp;</p>

# Styles

[(Back to top)](#table-of-contents)

Font used (from Google Fonts) - [Glory](https://fonts.google.com/specimen/Glory?query=glory)

Colors
