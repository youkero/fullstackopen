import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>;
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;
const Statistic = ({ text, value }) => <tr><td>{text}</td> <td>{value}</td></tr>;

const StatsTable = ({ stats }) => (
  <table>
    <tbody>
      <Statistic text={stats[0].text} value={stats[0].value} />
      <Statistic text={stats[1].text} value={stats[1].value} />
      <Statistic text={stats[2].text} value={stats[2].value} />
      <Statistic text={stats[3].text} value={stats[3].value} />
      <Statistic text={stats[4].text} value={stats[4].value} />
      <Statistic text={stats[5].text} value={stats[5].value} />
    </tbody>
  </table>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;

  if (!all) {
    return (
      <div>
        <Header text='give feedback' />
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
        <Header text='statistics' />
        <p>No feedback given</p>
      </div>
    );
  }

  const average = (good + -bad) / all;
  const positive = good * 100 / all;

  const stats = [
    { text: "good", value: good },
    { text: "neutral", value: neutral },
    { text: "bad", value: bad },
    { text: "all", value: all },
    { text: "average", value: average ? average : 0 },
    { text: "positive", value: (positive ? positive : 0) + ' %' },
  ];

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text='statistics' />
      <StatsTable stats={stats} />
    </div>
  );
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
