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
            let updateTime = data['updated'];
            let events = data['events'];
            station = data['events'][0]['stopPoint']['name'];
            console.log(station);
            convertJSONToTable(events)
            console.log('Data received:', events);
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

  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = `<b>Abfahrten Linie</b><br />${this.station}`

    return wrapper
  }
})
