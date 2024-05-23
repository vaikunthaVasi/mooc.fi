const express = require('express')

const expressApp = express()

expressApp.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const id = Math.floor(Math.random() * 100)
    console.log(id)
    return id
}

expressApp.get('/', (req, res) => {
    res.send('<h1 style="color: springgreen">hello world</h1>')
}) 

expressApp.get('/api/persons', (req, res) => {
    res.json(persons)
})

expressApp.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    person ?
        res.json(person) :
        res.status(404).end()
})

expressApp.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

expressApp.post('/api/persons', (req, res) => {
    !(req.body.name && req.body.number) &&
        res.status(400).json({
            error: 'missing required input'
        })
    persons.map(person => person.name).includes(req.body.name) && 
        res.status(400).json({
            error: 'name must be unique'
        })
    const person = {
        id: generateId(),
        name: req.body.name,
        number: req.body.number
    }
    persons = persons.concat(person)
    res.json(person)
})

expressApp.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
    `)
})

const PORT = 3001

expressApp.listen(PORT, () => console.log(`Server listening on port ${PORT}`))