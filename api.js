const   express                     = require('express'),
        axios                       = require('axios'),
        clientName                  = "danielgracia-bikesorigo",
        baseUrlAllStations          = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
        baseUrlAllStationsStatus    = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
        port                        = 8077
;

var app = express();

//Get all stations info
app.get('/allstations', function (req, res) {

    const getBaseUrl = () => {
        return baseUrlAllStations;
    }

    const axiosInstance = axios.create({
        baseURL: getBaseUrl(),
        timeout: 5000,
        headers: {
            'client-name': clientName,
            'Content-Type': 'application/json'
        }
    });


    axiosInstance.get()
        .then(response => {
            var data = response.data;
            res.header("Content-Type",'application/json');
            res.end(JSON.stringify(data));
        })
        .catch(error => {
            console.log(error);
            res.end(JSON.stringify({}));
        });
})

//GET station status
app.get('/allstationsstatus', function (req, res) {

    const getBaseUrl = () => {
        return baseUrlAllStationsStatus;
    }

    const axiosInstance = axios.create({
        baseURL: getBaseUrl(),
        timeout: 5000,
        headers: {
            'client-name': clientName,
            'Content-Type': 'application/json'
        }
    });


    axiosInstance.get()
        .then(response => {
            var data = response.data;
            res.header("Content-Type",'application/json');
            res.end(JSON.stringify(data.data));
        })
        .catch(error => {
            console.log(error);
            res.end(JSON.stringify({}));
        });
})


var server = app.listen(port, function () {
    var host = "localhost"
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})



/* websever */
app.get("/webapp", (req, res) => {
    res.sendFile(__dirname + '/webapp/index.html');
});
app.get("/webapp/css/main.css", (req, res) => {
    res.sendFile(__dirname + '/webapp/css/main.css');
});
app.get("/js/:file", (req, res) => {
    res.sendFile(__dirname + '/webapp/src/'+req.params.file);
});

/* HELPERS */
dd = function (d) {console.log(d);}
