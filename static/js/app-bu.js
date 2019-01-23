//build the OutputTable
function buildResultsTable(results) {
    tbody.selectAll(".row-sighting").remove();
    results.forEach(i => {
        var row = tbody.append("tr").attr('class','row-sighting');
        Object.entries(i).forEach(([ros, well]) => {
            row.append("td").attr('class', ros).text(well);
        });
    });
};

function buildStates(arrStates) {
    //var arrStates = tableData.map(sighting => sighting.state)
    var uniqueStates = Array.from(new Set((arrStates)));
    uniqueStates.sort()
    uniqueStates.forEach(state => {
    var option = selectstate.append("option").attr("value", state).text(state); 
    })
}

function filterResults(date, country, state, shape, sightings) {
    if (date) {
        sightings = sightings.filter(sighting => sighting.datetime === date);
    }
    if (country) {
        sightings = sightings.filter(sighting => sighting.country === country);
    }
    if (state) {
        sightings = sightings.filter(sighting => sighting.state === state);
    }
    if (shape) {
        sightings = sightings.filter(sighting => sighting.shape === shape);
    }
    buildResultsTable(sightings);
}

function buildFilters() {
    //Build the Date dropdown box
    var arrDates = tableData.map(sighting => sighting.datetime)
    var uniqueDates = Array.from(new Set(arrDates)) //google-fu
    uniqueDates.forEach(date => {
        var option = selectdatetime.append("option").attr("value", date).text(date);
    });


    //Build the country dropdown box.
    var arrCountries = tableData.map(sighting => sighting.country)
    var uniqueCountries = Array.from(new Set(arrCountries)) //google-fu
    uniqueCountries.forEach(country => {
        var option = selectcountry.append("option").attr("value", country).text(country);
    })

    //build the state dropdown box
    var arrStates = tableData.map(sighting => sighting.state)
    var uniqueStates = Array.from(new Set(arrStates)) //google-fu
    uniqueStates.forEach(state => {
        var option = selectstate.append("option").attr("value", state).text(state);
    })

    //Build the shape dropdown box.
    var arrShapes = tableData.map(sighting => sighting.shape)
    // var uniqueShapes = Array.from(new Set(arrShapes)) //google-fu
    var uniqueShapes = new Set(arrShapes) //google-fu
    uniqueShapes.forEach(shape => {
        var option = selectshape.append("option").attr("value", shape).text(shape);
    })

    // //tried to build a more compact way to build the fitlers (dropdowns).  failed building uniqueSet.  Same code works fine outside forEach method.
    // headers.forEach(header => {
    //     var arr = tableData.map(sighting => sighting.header)
    //     var uniqueSet = new Set(arr) //google-fu
    //     curList = d3.select(`#${header}`);
    //     uniqueSet.forEach(i => {
    //         var option = curList.append("option").attr("value", i).text(i);
    //     }); 
    // })

}

// from data.js
var tableData = data;

// YOUR CODE HERE!
var btnFilter = d3.select("#filter-btn")
var btnReset = d3.select("#reset-btn")
var selectdatetime = d3.select("#datetime");
var selectcountry = d3.select("#country");
var selectstate = d3.select("#state");
var selectshape = d3.select("#shape");
var outputTable = d3.select("#ufo-table");
var tbody = outputTable.select("tbody")

btnReset.on("click", function(){
    d3.event.preventDefault();
    document.getElementById("ufo-form").reset();
    buildResultsTable(tableData);
    buildStates(tableData);
})

btnFilter.on("click", function() {  
    d3.event.preventDefault();  //prevent refresh of page
    var filterDate = selectdatetime.property("value"); //pull Date value typed by user
    var filterCountry = selectcountry.property("value"); //pull Country valye typed by user
    var filterState = selectstate.property("value");
    var filterShape = selectshape.property("value");
    var sightingData = tableData
    filteredData = filterResults(filterDate, filterCountry, filterState, filterShape, sightingData)
});

selectcountry.on("change", function(d) {
    selectstate.selectAll("option").remove();
    selectstate.append("option").attr("value","");
    var country = selectcountry.node().value;
    var states = tableData.filter(sighting => sighting.country === country)
    var arrStates = states.map(sighting => sighting.state)
    console.log(states);
    buildStates(arrStates)
});


buildResultsTable(tableData);
buildFilters();
// //Below two lines can be used if dropdown lists were being built with the code starting at line 68.  This feature is a WIP
// objHeaders = ["datetime","country","state","shape"]
// buildFilters(objHeaders);
