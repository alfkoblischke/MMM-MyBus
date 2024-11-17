Module.register("MMM-MyBus", {

  defaults: {
    updateInterval: 600000,
    departuremonitor: "7ceb8ad4ddbb52c8fb175944b4933e39",
    exampleContent: "Hurra"
  },

  getStyles() {
    return ["template.css"]
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start() {
    this.templateContent = this.config.exampleContent

    this.loaded = false;    
    this.url = `https://www.vrs.de/index.php?eID=tx_vrsinfo_departuremonitor&i=${Object.keys(this.config.departuremonitor)}`;
    this.getData();
    setInterval(() => {
      this.getData();      
    }, this.config.updateInterval);   
  },

  getData: async function () {
    try {
      const response = await fetch(this.url);
      const data = await response.json();                  
      console.log(data);
    }
    catch (error) {
      Log.error(`Fehler beim Abrufen der Daten von VRS API: ${error}`);
    }
 },

  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = `<b>Title</b><br />${this.templateContent}`

    return wrapper
  },  
})
