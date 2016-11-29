import {default as guhBrowser} from 'ga-browser';

class GuhService {
  constructor() {
    this.guhBrowser = guhBrowser();
    console.log('%c NEED VALID GA TRACKING ID', 'background:red');
    this.guhBrowser('create', 'UA-XXXXXXX-1', 'auto');
  }

  event(...args) {
    if(process.env.BROWSER) {
      this.guhBrowser.apply(this, args);
    }
  }

  pageload(identifier) {
    if(process.env.BROWSER) {
      identifier = identifier || window.location.toString();
    }
    this.event('send', 'pageview', identifier);
  }

  click(category, label) {
    this.event('send', 'event', category, 'Click', label);
  }
}

const GA = new GuhService();

export default GA;
