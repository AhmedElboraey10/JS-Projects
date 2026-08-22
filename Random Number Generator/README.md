# Random Number Generator

A simple JavaScript utility designed to demonstrate the implementation of ES6 Generator functions (`function*`) and state history tracking.

## Task Specifications
Build an application with two buttons: one to generate a new random number (between 0 and 100), and another to display all historically generated numbers. The random number generation logic must be encapsulated within an ES6 generator function. If the user attempts to view the history before generating any numbers, the application must alert them to generate at least one number first.

## Application Preview

![Application Preview](./images/image.png)

## Technical Implementation
1. **ES6 Generators:** Utilizes a generator function (`function* genRandomNum()`) in conjunction with the `yield` keyword to handle the random number generation and array insertion logic. The generator is instantiated and advanced using `.next()` upon each click.
2. **State Tracking:** Maintains a persistent `list` array in the global scope that records every number generated during the session.
3. **Array Joining:** When the display history button is clicked, the application uses `.join(' - ')` to convert the state array into a single, highly readable string formatted with hyphens.
4. **Validation Guards:** Includes a conditional check to ensure the history list length is not zero before attempting to render it, falling back to a `window.alert()` to guide the user.

## Technologies Used
- HTML5 (Semantic Layout, RTL orientation)
- CSS3 (Flexbox Layout, Button Hover Transitions)
- JavaScript (ES6 Generators, `yield`, `Math.random`, `Math.trunc`, Array manipulation)
