Module.register("MMM-MyBus", {

  defaults: {
    updateInterval: 600000,
    departuremonitor: "7ceb8ad4ddbb52c8fb175944b4933e39",
    exampleContent: "Hurra"
  },

  getStyles() {
    return ["template.css"]
  },
 
  start() {
    this.templateContent = this.config.exampleContent
    this.loaded = false;    
    this.url = `https://www.vrs.de/index.php?eID=tx_vrsinfo_departuremonitor&i=${this.config.departuremonitor}`;    
    this.getData()      
        .then((data) => {
            this.updateTime = data['updated'];
            events = data['events'];
            station = data['events'][0]['stopPoint']['name'];
            console.log(station);
            this.convertJSONToTable(events);            
        })
        .catch((error) => {
            console.error('Eror: ', error);
    });
    setInterval(() => {
      this.getData();      
    }, this.config.updateInterval);   
  },

  getData: async function () {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0"
      }
    };

    try {
        const response = await fetch(proxyUrl + this.url, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.log('Fetch error: ', error);
        throw error;
    }                
 },

 convertJSONToTable: function(jsonData) {
    table = '<table><thead><tr>';
        
    table += '</tr></thead><tbody>';

    table += '<tr>';
    table += '<td>';
    table += 'Geplant';
    table += '</td>';
    table += '<td>';
    table += 'Erwartet';
    table += '</td>';
    table += '<td>';
    table += 'Linie';
    table += '</td>';
    table += '<td>';
    table += 'Richtung';
    table += '</td>';
    table += '</tr>';

    jsonData.forEach(row => {        
        estimated = row['departure']['estimate'];
        if (typeof (estimated) == "undefined") {
            estimated = ''
        }        
        table += '<tr>';
        table += '<td>';
        table += row['departure']['timetable'];
        table += '</td>';
        table += '<td>';
        table += estimated;
        table += '</td>';
        table += '<td>';
        table += row['line']['product'] + ' ' + row['line']['number'];
        table += '</td>';
        table += '<td>';
        table += row['line']['direction'];
        table += '</td>';
        table += '</tr>';
    });

    table += '</tbody></table>';
   return table;
},

  

  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = '<b>Abfahrten ' + this.updateTime + ' Linie</b><br />${this.exampleContent}'

    return wrapper
  }
})
