import connDAO from './conexao.js';

function pegaTodos() {
    connDAO.getAllStudents(function(students) {
        for (let i = 0; students.length > i; i++) {
            console.log(students[i].id + ":" + students[i].nome + ":" + students[i].email);
        }
    });
}

function pegaPorNome(nome) {
    connDAO.getStudentsByName(nome, function(students) {
        for (let i = 0; students.length > i; i++) {
            console.log(students[i].id + ":" + students[i].nome + ":" + students[i].email);
        }
    });
}

function cadastrar(nome, email) {
    let student = { nome: nome, email: email };
    connDAO.save(student, function(student) {
        console.log("Estudante cadastrado! " + student.id + ":" + student.nome + ":" + student.email);
    });
}

function atualizar(id, nome, email) {
    let student = { id: id, nome: nome, email: email };
    connDAO.update(student, function(student) {
        console.log("Dados atualizados! " + student.id + ":" + student.nome + ":" + student.email);
    });
}

function apagar(id) {
    let student = { id: id };
    connDAO.delete(student, function(student) {
        console.log("Deletado! " + student.id);
    });
}