import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import './index.css';

const Notification = ({ message, isError }) => {
  if (!message) {
    return null;
  }

  return <div className={isError ? 'error' : 'info'}>{message}</div>;
};

const Person = ({ id, name, number, onDeletePerson }) => (
  <div>
    {name} {number}{' '}
    <button type="button" onClick={onDeletePerson} value={id}>
      delete
    </button>
  </div>
);

const Persons = ({ persons, onDeletePerson }) => (
  <>
    {persons.map((person) => (
      <Person
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        onDeletePerson={onDeletePerson}
      />
    ))}
  </>
);

const PersonForm = ({
  addNewPerson,
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
}) => (
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

const Filter = ({ newFilter, onFilter }) => (
  <div>
    filter shown with <input value={newFilter} onChange={onFilter} />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [infoMessage, setInfoMessage] = useState();

  const onDeletePerson = (event) => {
    const personId = Number(event.target.value);
    const personToDelete = persons.find((person) => person.id === personId);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
        .remove(personId)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personId));
        })
        .then(() => {
          setInfoMessage(`Deleted ${personToDelete.name}`);
          setTimeout(() => {
            setInfoMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${personToDelete.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== personId));
        });
    }
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newName);

    if (person) {
      const response = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (response) {
        const newPerson = {
          ...person,
          number: newNumber,
        };

        personsService
          .update(newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setNewName('');
            setNewNumber('');
            return updatedPerson;
          })
          .then((updatedPerson) => {
            setInfoMessage(`Updated ${updatedPerson.name} number`);
            setTimeout(() => {
              setInfoMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newPerson.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((person) => person.id !== newPerson.id));
          });
      }

      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        return returnedPerson;
      })
      .then((returnedPerson) => {
        setInfoMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setInfoMessage(null);
        }, 3000);
      });
  };

  const onFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={true} />
      <Notification message={infoMessage} isError={false} />
      <Filter newFilter={newFilter} onFilter={onFilter} />

      <h2>add a new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        onNameChange={onNameChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        filter={newFilter}
        onDeletePerson={onDeletePerson}
      />
    </div>
  );
};

export default App;
