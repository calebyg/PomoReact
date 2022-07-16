# PomoReact

The 'Pomodoro' studying method involves a dedicated study period, followed by a break. I developed this project
to enrich my understanding of React's compontent-based architecture and apply it to a technology I personally use.

You can use PomoReact [here](https://computeh.github.io/PomoReact/)

## Components

`PomoSettings` - Receives user input for timer customization then sends it to parent component.

`PomoTimer` - Displays timer information.

`SessionLog` - Displays information about a previously completed study session.

`SessionLogList` - Maps and renders an array of session log data to a list of SessionLog components.

## Hooks

`useInterval` - Updates a callback and delay in ms to calculate a function to perform, `tick()`. If the value
for the delay is not equal to null, the interval will be constantly updated through `useEffect()`.
