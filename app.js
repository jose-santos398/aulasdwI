import express from 'express';
import ConexaoDB from './conexao.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.get('/student', (req, res) => {
    ConexaoDB.getAllStudents(students => {
        res.json(students);
    });
});

app.get('/student/:id', (req, res) => {
    ConexaoDB.getStudentById(req.params.id, student => {
        student.length > 0 
            ? res.json(student[0]) 
            : res.status(404).json({ error: "Estudante não encontrado!" });
    });
});

app.post('/student', (req, res) => {
    ConexaoDB.save(req.body, student => {
        res.json(student);
    });
});

app.put('/student/:id', (req, res) => {
    req.body.id = req.params.id;
    ConexaoDB.update(req.body, result => {
        res.json({ success: "Dados atualizados!" });
    });
});

app.delete('/student/:id', (req, res) => {
    ConexaoDB.deleteById(req.params.id, result => {
        result.affectedRows > 0 
            ? res.json({ success: "Estudante removido!" }) 
            : res.status(404).json({ error: "ID não encontrado!" });
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});