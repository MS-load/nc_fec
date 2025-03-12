## Setting up the app

```bash
npm install
```

## Running the app

```bash
npm run start
```

## Deploying the app

```bash
npm run deploy
```

# Web page

[NC_FEC](https://ms-load.github.io/nc_fec/)

# Description

Countdown app built using Angular.

- Countdown timer that updates every second
- Text that automatically resizes to fill screen width
- Persistent storage of event data
- Responsive design for both portrait and landscape modes

## Improvements

- Add error handling for state update (currently you can set a date in the past, it will just add an
  event has started)
- Add debounce to text resize operations
- Add unit tests
- Some input validation / sanitization
- Check the performance optimizations for the text resize operation
- Have an end message / animation when the countdown is over
- Add a "reset" button to clear the countdown and start over
- Share an event link with the countdown instead of using localstorage
