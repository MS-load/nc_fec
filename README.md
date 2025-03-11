## Setting up the app

```bash
npm install
```

## Running the app

```bash
npm run start
```

# Web page

[https://frontend-challenge-2025-03-11.netlify.app/](https://frontend-challenge-2025-03-11.netlify.app/)

# Description

Countdown app built using Angular.

- Countdown timer that updates every second
- Text that automatically resizes to fill screen width
- Persistent storage of event data
- Responsive design for both portrait and landscape modes

## Improvements

- Add error handling for state update (currently you can set a date in the past, it will just appear
  with a negative time)
- Add debounce to text resize operations
- Add unit tests
- Some input validation / sanitization
- Haven't checked the performance optimizations for the text resize operation
- Have an end message / animation when the countdown is over
