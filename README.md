# Google Sheets API - JavaScript Quickstart

https://github.com/coding-to-music/sheets-javascript-webpack

https://sheets-javascript-webpack.herokuapp.com

- Home - Products - Google Workspace for Developers
- Google Sheets for Developers
- Sheets API - Guides

https://developers.google.com/sheets/api/quickstart/js

https://github.com/googleworkspace/browser-samples/blob/master/sheets/quickstart/index.html

## Complete the steps described in the rest of this page to create a simple JavaScript web application that makes requests to the Google Sheets API.

# How to share variables across HTML, CSS, and JavaScript using Webpack

and

https://www.freecodecamp.org/news/how-to-share-variables-across-html-css-and-javascript-using-webpack/

By Adrien Zaganelli https://www.freecodecamp.org/news/author/adri_zag/

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/sheets-javascript-webpack.git
git push -u origin main
```

## Heroku

```java
heroku create sheets-javascript-webpack
```

## Heroku MongoDB Environment Variables

```java
heroku config:set

heroku config:set PUBLIC_URL="https://sheets-javascript-webpack.herokuapp.com"
```

## Push to Heroku

```java
git push heroku

# or

npm run deploy
```

## Notice about getting set up on Google Cloud Platform

```java
Hello freeCodeCamp
Google Sheets API Quickstart

{
  "error": "idpiframe_initialization_failed",
  "details": "Not a valid origin for the client: https://sheets-javascript-webpack.herokuapp.com has not been registered for client ID <YOUR_CLIENT_ID>. Please go to https://console.developers.google.com/ and register this origin for your project's client ID."
}
```

## Get your Google API client ID

- To enable Sign In With Google on your website, you first need to set up your Google API client ID. To do so, complete the following steps:

## Open the Credentials page of the Google APIs console.

- Create or select a Google APIs project. If you already have a project for the Sign In With Google button or Google One Tap, use the existing project and the web client ID.

- If your project doesn't have a Web application-type client ID, click `Create credentials > OAuth client ID` to create one. Be sure to include your site's domain in the `Authorized JavaScript origins` box. Please note that Google One Tap can only be displayed in HTTPS domains. When you perform local tests or development, you must add both `http://localhost` and `http://localhost:<port_number>` to the Authorized JavaScript origins box.

https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid

```java
GOOGLE_API_KEY=""
GOOGLE_CLIENT_ID=""

heroku config:set GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
heroku config:set GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
```

## Update npm packages to latest compatible version

```java
npm install -g npm-check-updates
```

Output:

```java
added 266 packages, and audited 267 packages in 9s

29 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Run it again

```java
ncu -u
```

Output:

```java
Upgrading /mnt/volume_nyc1_01/sheets-javascript-webpack/package.json
[====================] 10/10 100%

 express              ^4.16.4  →  ^4.17.3
 css-loader            ^3.2.1  →   ^6.7.1
 html-webpack-plugin   ^3.2.0  →   ^5.5.0
 node-sass            ^4.13.0  →   ^7.0.1
 sass-loader           ^8.0.0  →  ^12.6.0
 style-loader          ^1.0.1  →   ^3.3.1
 webpack              ^4.41.2  →  ^5.71.0
 webpack-cli          ^3.3.10  →   ^4.9.2

Run npm install to install new versions.
```

```java
npm install
```

Output:

```
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142

added 372 packages, and audited 427 packages in 11s

45 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Run it again:

```java
tmc@docker-ubuntu-s-1vcpu-1gb-nyc1-01:/mnt/volume_nyc1_01/sheets-javascript-webpack$ ncu -u
```

Output:

```java
Upgrading /mnt/volume_nyc1_01/sheets-javascript-webpack/package.json
[====================] 10/10 100%

 express  ^4.17.1  →  ^4.17.3

Run npm install to install new versions.
```

Install:

```java
tmc@docker-ubuntu-s-1vcpu-1gb-nyc1-01:/mnt/volume_nyc1_01/sheets-javascript-webpack$ npm install
```

Output:

```java
up to date, audited 427 packages in 1s

45 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Run it again:

```java
tmc@docker-ubuntu-s-1vcpu-1gb-nyc1-01:/mnt/volume_nyc1_01/sheets-javascript-webpack$ ncu -u
```

Success!!

```java
Upgrading /mnt/volume_nyc1_01/sheets-javascript-webpack/package.json
[====================] 10/10 100%

All dependencies match the latest package versions :)
```

## Prerequisites

To run this quickstart, you need the following prerequisites:

- Python 2.4 or greater (to provide a web server)
- A Google Cloud Platform project with the API enabled. To create a project and enable an API, refer to Create a project and enable the API
  Note: For this quickstart, you are enabling the "Google Sheets API".
- Authorization credentials for a desktop application. To learn how to create credentials for a desktop application, refer to Create credentials.
- A Google account

## Step 1: Set up the sample

To set up the sample:

- In your working directory, create a file named index.html.
- Include the following code in index.html:

sheets/quickstart/index.html

View on GitHub
https://github.com/googleworkspace/browser-samples/blob/master/sheets/quickstart/index.html

```java
<!DOCTYPE html>
<html>
  <head>
    <title>Google Sheets API Quickstart</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <p>Google Sheets API Quickstart</p>

    <!--Add buttons to initiate auth sequence and sign out-->
    <button id="authorize_button" style="display: none;">Authorize</button>
    <button id="signout_button" style="display: none;">Sign Out</button>

    <pre id="content" style="white-space: pre-wrap;"></pre>

    <script type="text/javascript">
      // Client ID and API key from the Developer Console
      var CLIENT_ID = '<YOUR_CLIENT_ID>';
      var API_KEY = '<YOUR_API_KEY>';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listMajors();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
      function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
          range: 'Class Data!A2:E',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            appendPre('Name, Major:');
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              // Print columns A and E, which correspond to indices 0 and 4.
              appendPre(row[0] + ', ' + row[4]);
            }
          } else {
            appendPre('No data found.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      }

    </script>

    <script async defer src="https://apis.google.com/js/api.js"
      onload="this.onload=function(){};handleClientLoad()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()">
    </script>

  </body>
</html>
```

In the code, replace <YOUR_CLIENT_ID> with the client ID you created as a Prerequisite for this quickstart.

In the code, replace <YOUR_API_KEY> with the API key you created as a Prerequisite for this quickstart.

## Step 2: Run the sample

To run the sample:

Start the web server using the following command from your working directory:

- Python 3.x

```java
python --version
```

Output:

```java
Python 3.8.10
```

```java
python -m http.server 8000

python -m http.server 5400

```

In your browser, navigate to http://localhost:8000.

(optional). If this is your first time running the sample, the sample opens an OAuth consent screen prompting you to authorize the app to access your data on your behalf:

If you are not already signed in to your Google account, you are prompted to sign in. If you are signed in to multiple Google accounts, you are asked to select one account to use for authorization.

Click Accept. The app is authorized to access your data.

- Note: After the initial user authorization, you can call gapi.auth.authorize with immediate:true to obtain an auth token without user interaction.
  The sample executes.

If you have problems, refer to the Troubleshoot the sample section.

## Troubleshoot the sample

This section describes some common issues that you can encounter while attempting to run this quickstart.

## Error: origin_mismatch

This error occurs during the authorization flow if the host and port used to serve the web page doesn't match an allowed JavaScript origin on your Google Developers Console project. Make sure you set an authorized JavaScript origin and that the URL in your browser matches the origin's URL.

`idpiframe_initialization_failed: Failed to read the 'localStorage' property from 'Window'`

- This error occurs when 3rd party cookies and data storage aren't enabled in your browser. These options are required by the Google Sign-in library. For further information, refer to 3rd party cookies and data storage.

- Note: In your own app, you should prompt users to enable 3rd party cookies and data storage or add an exception for accounts.google.com.

  `idpiframe_initialization_failed: Not a valid origin for the client`

  This error occurs when the domain registered as a Prerequisite doesn't match the domain being used to host the web page. Ensure that the origin you registered as a Prerequisite matches the URL in the browser.

## This app isn't verified

If the OAuth consent screen displays the warning "This app isn't verified," your app is requesting scopes that provide access to sensitive user data. If your application uses sensitive scopes, your your app must go through the verification process to remove that warning and other limitations. During the development phase you can continue past this warning by clicking Advanced > Go to {Project Name} (unsafe).

## Further reading

For further information on the APIs used in this quickstart, refer to the Google API Client Library for JavaScript section of GitHub.

DECEMBER 20, 2019
/
#WEBPACK

# How to share variables across HTML, CSS, and JavaScript using Webpack

https://www.freecodecamp.org/news/how-to-share-variables-across-html-css-and-javascript-using-webpack/

By Adrien Zaganelli https://www.freecodecamp.org/news/author/adri_zag/

# How to share variables across HTML, CSS, and JavaScript using Webpack

Earlier this week, I read an article explaining how CSS-in-JS slows down the rendering of some React apps and how static CSS is faster. But CSS-in-JS is very popular because, among other features, you can style dynamically using JavaScript variables.

In this tutorial, I will show you how to recreate this perk in any of your web projects thanks to Webpack (and I assume you know how to use it). To start, we want Webpack to bundle our source files into a static dist/ folder .

You can check out the source code here.

1. Set up our app
   The boring part
   Create a folder for this tutorial, open your terminal, and init a project:

```java
npm init -y
```

First things first, if it’s not already done, install node.js and Webpack:

```java
npm install webpack webpack-cli --save-dev
```

Let’s create a script in our package.json that tells Webpack to use our config file:

```java
"scripts": {
"build": "webpack --config webpack.config.js"
}
```

At the root of your folder, create a globals.js file, where our shared variables will be stored:

```java
module.exports = {
myTitle: 'Hello freeCodeCamp!',
myColor: '#42ff87',
};
```

The Webpack config file looks like this (webpack.config.js). Create it at the root of your folder:

````java
module.exports = {
entry: **dirname + '/app/index.js',
output: {
path: **dirname + '/dist',
filename: 'index_bundle.js'
},
};
```java

Our source code will be located in an app folder. Create it like this:

```java
mkdir app && cd app
````

You’ll need index.html and index.js files at this point. Create those files in the app folder:

```java
touch index.html index.js
```

Perfect! You’re all set. ?

Your folder should look like this:

```java
|-- node_modules/
|-- package.json
|-- webpack.config.js
|-- globals.js
|-- app/
|-- index.html
|-- index.js 2. Render our HTML files with the html-webpack-plugin
```

This app/index.html is empty. Let’s add some markup in it and then add a custom variable:

```java
<html lang="en">
<head>
  <title>Webpack shared variables!</title>
</head>
<body>
  <h1><%= myTitle %></h1>
</body>
</html>
```

As you can see, we are trying to print a variable in our HTML... which is impossible! To make it work we’ll use the html-webpack-plugin that gives us the ability to use EJS syntax and inject data into it.

The plugin will generate a valid HTML file. In the meantime, you should rename your app/index.html file to app/index.ejs.

```java
npm install --save-dev html-webpack-plugin
```

Let’s go back to our configuration file. html-webpack-plugin has an interesting templateParameters option that allows us to pass an object as parameter. Enable the plugin as follows in webpack.config.js:

```java
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globals = require('./globals.js')

module.exports = {
// ... previous config, entry, output...
plugins: [
new HtmlWebpackPlugin({
template: 'app/index.ejs',
templateParameters: globals,
})
]
};
```

Run npm run build and ta-daaaaa « <%= myTitle %> » became « Hello freeCodeCamp » ! The work is done by Webpack during the compilation when it runs the html-webpack-plugin.

See? This was pretty simple with the right tool: HTML ✅

3.  Use our variables in JavaScript
    Phew, so many lines just to print a variable! ?With Webpack, things often get complicated. Well, this one is very simple: in JavaScript just import your file. In your app/index.js:

```java
import globals from '../globals.js'

document.write(
'<pre>' +
JSON.stringify(globals, null, 2) +
'</pre>'
);
```

This will print our globals object on the page. Now let’s move on to the CSS.

4. Use shared variables in our CSS
   Here is our final boss ?

Okay guys you got me… I lied. We can’t use our globals directly in CSS – we must use a pre-processor. In this example, we will use SASS.

On the Webpack side, a plugin will not be enough. We must use a loader to convert SASS into CSS. In this case we need the sass-loader package, so install it according to the docs:

npm install sass-loader node-sass css-loader style-loader --save-dev
Back to coding. Now that we have SASS, create your style sheet file, app/style.scss:

```java
h1 {
color: $myColor;
}
```

Our SASS is set up – now how can we inject data into it? The sass-loader package has a prependData option! But it takes a string as a parameter, which means that your data should look like this: "$myColor: red; myTitle: '...'";.

We have to automate that and convert a JavaScript object into a string. I didn’t find a package on npm that satisfied me, so I wrote my own converter. Download the file and add it to your project (in my example it's utils/jsToScss.js).

Your final webpack.config.js should look like this:

```java
const globals = require("./globals.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const jsToScss = require("./utils/jsToScss.js");

module.exports = {
  entry: __dirname + "/app/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.ejs",
      templateParameters: globals
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              prependData: jsToScss(globals)
            }
          }
        ]
      }
    ]
  }
};
```

Here is what you should see:

Capture-d-e-cran-2019-12-23-23.44.11

https://glitch.com/edit/#!/shared-variables-webpack?path=webpack.config.js

If you are still reading this tutorial, thanks for your attention. I hope it helps you! Webpack is a very powerful tool you should dig more into ?

NB: In your dist/ folder you can see there isn't any CSS generated. That's because I use the style-loader to keep this demo simple. To generate the CSS file, take a look at the mini-css-extract-plugin.
