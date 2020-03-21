import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>give feedback</h1>;
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;
const Statistics = ({ good, neutral, bad }) => (
  <div>
    <h2>statistics</h2>
    <p>good {good}<br />neutral {neutral}<br />bad {bad}</p>
  </div>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
