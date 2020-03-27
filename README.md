# Curso de NodeJs

## Instalar

- NodeJs
- Git
- Baixar um editor VSCODE
- Ter acesso a um terminal. Power Shell no windows
- Adiciona no Chrome/Firefox extensão JSON View
- Baixa o [Insomnia](https://insomnia.rest/)

## Curl

curl http://localhost:4000/v1/tasks
curl http://localhost:4000/v1/tasks/1
curl -d '{"task": "coisa", "done": 1}' -H 'Content-Type: application/json' http://localhost:4000/v1/tasks
curl -X PUT -H "Content-Type: application/json" -d '{"task": "coisa", "done": 1}' http://localhost:4000/v1/tasks/38wdc5xzu77
curl -X DELETE 'Content-Type: application/json' http://localhost:4000/v1/tasks/38wdc5xzu77
