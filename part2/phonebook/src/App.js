import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Person = ({ name, number }) => (<div>{name} {number}</div>);
const Persons = ({ persons }) => (
  <>
    {persons.map((person) => <Person key={person.name} name={person.name} number={person.number} />)}
  </>
);

const PersonForm = ({ addNewPerson, newName, onNameChange, newNumber, onNumberChange }) => (
  <form onSubmit={addNewPerson}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Filter = ({ newFilter, onFilter }) => <div>filter shown with <input value={newFilter} onChange={onFilter} /></div>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const onNameChange = (event) => {
    setNewName(event.target.value);
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addNewPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);

      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const onFilter = (event) => {
    setNewFilter(event.target.value);
  }

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} onFilter={onFilter} />

      <h2>add a new</h2>
      <PersonForm addNewPerson={addNewPerson} newName={newName} onNameChange={onNameChange} newNumber={newNumber} onNumberChange={onNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} filter={newFilter} />
    </div>
  )
}

export default App
