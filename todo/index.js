const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

app.use(express.json());

const readDatabase = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data);
}

const writeDatabase = (data) => {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
}

app.get('/todos', (req, res) => {
  const db = readDatabase();
  res.json(db.todos);
});

app.post('/todos', (req,res) => {
    const db = readDatabase();
    const newTodo = req.body;

    newTodo.id = db.todos.length? db.todos[db.todos.length-1].id+1:1;

    db.todos.push(newtodo);
    writeDatabase(newtodo);
    res.status(201).json(newtodo);
})

app.put('/todos/updateEven', (req,res)=>{
    const db = readDatabase()

    db.todos.forEach(todo=>{
        if(todo.id%2==0 && todo.status===false){
            todo.status = true;
        }
    })

    writeDatabase(db);
    res.json(db.todos);
})

app.delete('/todos/deleteTrue', (req,res)=>{
    let db = readDatabase();
    db.todos = db.todos.filter(todo=>{
        todo.status!==true;
    })

    writeDatabase(db);
    res.json(db.todos);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
