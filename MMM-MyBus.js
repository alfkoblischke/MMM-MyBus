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
    this.getData();
    setInterval(() => {
      this.getData();      
    }, this.config.updateInterval);   
  },

  getData: async function () {
    try { 
      const response = await fetch(this.url);
      const data = await response.json();                  
      if(data) {               
        console.log(data);
        this.myStart = data.resourceSets[0]["resources"][0].routeLegs[0]["startLocation"]["address"].formattedAddress;        
        this.myDestination = data.resourceSets[0]["resources"][0].routeLegs[0]["endLocation"]["address"].formattedAddress;          
        this.myDistance = Math.round(data.resourceSets[0]["resources"][0]["travelDistance"]);
        this.myDistanceUnit = data.resourceSets[0]["resources"][0]["distanceUnit"];
        this.myTravelDuration = Math.floor(data.resourceSets[0]["resources"][0]["travelDuration"] /60 ) + " / ";
        this.myTravelDurationTraffic = Math.floor(data.resourceSets[0]["resources"][0]["travelDurationTraffic"] / 60);                
        this.loaded = true;
        this.updateDom();
      }
      else {
        Log.error(`Fehler beim Abrufen der Daten von Traffic API.`);
      }
    } 
    catch (error) {
      Log.error(`Fehler beim Abrufen der Daten von Traffic API: ${error}`);
    }    
});

 },

  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = `<b>Title</b><br />${this.templateContent}`

    return wrapper
  }
})
