import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>
      {person.name} {person.phone}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0, phone: '0415847490'}
  ]) 
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
    // console.log(persons.map(person => person.name))
    if (persons.map(person => person.name).includes(newName)) {
      alert(newName + " is already added to the phonebook!")
    }
    else {
      setPersons(persons.concat({name: newName, id: persons.length, phone: newPhone}))
      console.log("new persons", persons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Person person={person} key={person.id}/>)}
      </div>
    </div>
  )
}

export default App