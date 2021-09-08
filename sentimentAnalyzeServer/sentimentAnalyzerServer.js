const express = require('express');
const dotenv = require('dotenv');
dotenv.config()

const app = new express();

/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

// const dotenv = require('dotenv');
// dotenv.config();

// const api_key = process.env.API_KEY;
// const api_url = process.env.API_URL;

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-09-08',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}


//The default endpoint for the webserver
app.get("/",(req,res)=>{
    res.render('index.html');
  });

//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req,res) => {
    //Extract the url passed from the client through the request object
    let urlToAnalyze = req.query.url
    const analyzeParams = 
        {
            "url": urlToAnalyze,
            "features": {
                "keywords": {
                                "emotion": true,
                                "limit": 1
                            }
            }
        }
     
    const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
        //Print full 
        //console.log(JSON.stringify(analysisResults));
        //return res.send(analysisResults);

        //Print the JSON returned by NLU instance as a formatted string
        console.log(JSON.stringify(analysisResults.result.keywords[0].emotion,null,2));
        //Please refer to the image to see the order of retrieval
        return res.send(analysisResults.result.keywords[0].emotion,null,2);
     })
     .catch(err => {
     return res.send("An Error Occurred: "+err);
     });
});

//The endpoint for the webserver ending with /url/sentiment
app.get("/url/sentiment", (req,res) => {
    //return res.send("url sentiment for "+req.query.url);
    let urlToAnalyze = req.query.url
    const analyzeParams = 
        {
            "url": urlToAnalyze,
            "features": {
                "keywords": {
                                "sentiment": true,
                                "limit": 1
                            }
            }
        }
     
    const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
        //console.log(JSON.stringify(analysisResults));
        //return res.send(analysisResults);
        
        //Print the JSON returned by NLU instance as a formatted string
        console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment,null,2));
        //Please refer to the image to see the order of retrieval
        return res.send(analysisResults.result.keywords[0].sentiment,null,2);
     })
     .catch(err => {
     return res.send("An Error Occurred: "+err);
     });
});

//The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req,res) => {
    //return res.send({"happy":"10","sad":"90"});
    let textToAnalyze = req.query.text
    const analyzeParams = 
        {
            "text": textToAnalyze,
            "features": {
                "keywords": {
                                "emotion": true,
                                "limit": 1
                            }
            }
        }
     
    const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
        //console.log(JSON.stringify(analysisResults));
        //return res.send(analysisResults);
        
        //Print the JSON returned by NLU instance as a formatted string
        console.log(JSON.stringify(analysisResults.result.keywords[0].emotion,null,2));
        //Please refer to the image to see the order of retrieval
        return res.send(analysisResults.result.keywords[0].emotion,null,2);
     })
     .catch(err => {
     return res.send("An Error Occurred: "+err);
     });
});

app.get("/text/sentiment", (req,res) => {
    //return res.send("text sentiment for "+req.query.text);
    let textToAnalyze = req.query.text
    const analyzeParams = 
        {
            "text": textToAnalyze,
            "features": {
                "keywords": {
                                "sentiment": true,
                                "limit": 1
                            }
            }
        }
     
    const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
        //console.log(JSON.stringify(analysisResults));
        //return res.send(analysisResults);
        
        //Print the JSON returned by NLU instance as a formatted string
        console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment,null,2));
        //Please refer to the image to see the order of retrieval
        return res.send(analysisResults.result.keywords[0].sentiment,null,2);
     })
     .catch(err => {
     return res.send("An Error Occurred: "+err);
     });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

