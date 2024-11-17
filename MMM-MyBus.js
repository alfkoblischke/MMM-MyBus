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
    console.log(this.url);
    try { 
       data = fetch(this.url, {
          method: "GET" // default, so we can ignore
        });      
      console.log(data);
    }     
    catch (error) {
      Log.error(`Fehler beim Abrufen der Daten von Traffic API: ${error}`);
    }    
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
