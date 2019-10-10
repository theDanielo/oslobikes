var dd = function(d){ console.log(d) }
var app =  new Vue({
    el: '#app',
    data () {
        return {
            title: "Oslobikes",
            msg : "",
            info: [],
            aStations:[],
            aStatus:[],
            timer: '',

            //navnet på stativet, antall tilgjengelige låser og ledige sykler i øyeblikket 
            fields: [
                {
                    key: 'name',
                    label: "Navnet på stativet",
                    sortable: true
                },
                {
                    key:'num_bikes_available',
                    label: 'ledige sykler',
                    sortable: true

                },
                {
                    key:'num_docks_available',
                    label: 'tilgjengelige låser',
                    sortable: true
                },
                {
                    key:'last_reported',
                    label:'Siste oppdatering',
                    formatter: value => {
                        return new Date(value * 1000).toLocaleTimeString()
                    }
                }
            ],
        }
    },
    created () {
        this.fetchStations()
        this.timer = setInterval(this.fetchStations, 10000)
    },
    methods: {
        fetchStations()
        {
            var p1 = axios.get('/allstations')

            var p2 = axios.get('/allstationsstatus')

            Promise.all([p1, p2])
                .then(function (values) {
                    app.info = []
                    var aStatus = values[1].data.stations
                    var aStations = values[0].data.data.stations
                    aStatus.forEach(function (foo) {
                        app.aStatus[foo.station_id] = foo
                    })
                    aStations.forEach(function (foo) {
                        var boo = app.aStatus[foo.station_id]
                        for (var attrname in boo) {
                            foo[attrname] = boo[attrname]
                        }
                        app.info.push(foo)
                    })
                    app.msg = ""
                })

                .catch(function(){
                    app.msg = "Systemfeil"
                    app.info = []
                    resolve();
                })
        },
        cancelAutoUpdate() {
            clearInterval(this.timer)
        }

    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
})                                                                                         