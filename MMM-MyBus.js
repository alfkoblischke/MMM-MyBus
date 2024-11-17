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

  getData: function () {
    console.log(this.url);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
       fetch(this.url, requestOptions)
       .then((response) => response.text())
       .then((result) => console.log(result))
       .then((error) => console.log(error));                 
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
