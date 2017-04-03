export function windowHeight (minWidth = 0, manipulate = 0, fallback = null) {
  if (process.env.BROWSER && window.innerWidth >= minWidth && window.innerHeight) {
    return window.innerHeight + manipulate;
  }
  else {
    return fallback;
  }
}

export function windowWidth () {
  if (process.env.BROWSER && window.innerWidth) {
    return window.innerWidth;
  }
  else {
    return null;
  }
}
