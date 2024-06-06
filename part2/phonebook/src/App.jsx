import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>
      {person.name} {person.phone}
    </p>
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

const Persons = ({persons, filter}) => {
  return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person person={person} key={person.id}/>)
}

const PersonForm = ({persons, setPersons}) => {

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
    if (persons.map(person => person.name).includes(newName)) {
      alert(newName + " is already added to the phonebook!")
    }
    else {
      setPersons(persons.concat({name: newName, id: persons.length + 1, phone: newPhone}))
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

  const [filterstring, setNewFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setNewFilter={setNewFilter} filterstring={filterstring}></Filter>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filterstring}></Persons>
    </div>
  )
}

export default App