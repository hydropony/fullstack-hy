import { useState, useEffect } from 'react'
import servercom from './services/servercom'

const Person = ({person, handleDelete}) => {
  return (
    <div>
      <p>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button> </p>
    </div>
  )
}

const Filter = ({filterstring, setNewFilter}) => {

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <p>Filter shown with <input onChange={handleFilterChange}></input></p>
    </div>
  )
}

const Persons = ({persons, filter, handleDelete}) => {
  return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person person={person} key={person.id} handleDelete={handleDelete}/>)
}

const PersonForm = ({persons, setPersons, setNotification, setError}) => {

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log("Button clicked", event.target)
    const filteredPerson = persons.filter(person => person.name === newName)[0] //finding records with the same name
    // console.log(filteredPerson)
    if (filteredPerson !== undefined) {
      if (window.confirm(newName + " is already added to the phonebook, do you wish to update the phone number?")) {
        servercom
          .update({...filteredPerson, number: newPhone})
          .then(response => setPersons(persons.filter(person => person !== filteredPerson).concat({...filteredPerson, number: newPhone})))
          .then(response => setNotification(`${newName}'s record successfully updated`), setTimeout(() => {setNotification('')}, 5000))
          .catch(error => setError(`${newName} has already been deleted from the server`), setTimeout(() => setError(''), 5000))
      }
    }
    else {
      servercom
        .create({name: newName, id: (persons.length + 1).toString(), number: newPhone})
        .then(response => setPersons(persons.concat(response.data)))
        .then(setNotification(`${newName} successfully added`), setTimeout(() => {setNotification('')}, 5000))
      console.log("new persons", persons)
    }
  }

  return (
    <form>
      <div>
        name: <input onChange={handleNameChange}/>
      </div>
      <div>
        number: <input onChange={handlePhoneChange}></input>
      </div>
      <div>
        <button type="submit" onClick={addName}>add</button>
      </div>
    </form>
  )
}

const ErrorNotification = ({error}) => {
  if (error === '') {
    return
  }
  return (
    <div className='error'>
      {error}
    </div>
  )
}

const SuccessNotification = ({message}) => {
  const notificationStyle = {
    color: "green",
    backgroundColor: "lightgrey",
    fontSize: "20",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }
  if (message === '') {
    return
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
} 

const App = () => {
  const [persons, setPersons] = useState([])

  const [filterstring, setNewFilter] = useState('')

  const [error, setError] = useState('')

  const [notification, setNotification] = useState('')

  const handleDelete = (id) => {
    const name = persons.filter(person => person.id === id)[0].name

    if (window.confirm(`Do you really want to delete ${name}?`)) {
      return servercom
        .deleteEntry(id)
        .then(response => setPersons(persons.filter(person => person.id !== id)))
        .then(response => setNotification(`${name}'s record has been successfully deleted`), setTimeout(() => setNotification(''), 5000))
        .catch(error => setError(`${name} has already been deleted from the server`), setTimeout(() => setError(''), 5000))
        
    }
  }

  useEffect(() => {
    console.log("effect")
    servercom
      .get()
      .then(response => {setPersons(response.data)})
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification error={error}></ErrorNotification>
      <SuccessNotification message={notification}></SuccessNotification>
      <Filter setNewFilter={setNewFilter} filterstring={filterstring}></Filter>
      <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification} setError={setError}></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filterstring} handleDelete={handleDelete}></Persons>
    </div>
  )
}

export default App