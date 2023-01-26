
## Observação

Caso a sua aplicação mobile não esteja conseguindo enviar requisições para a API mesmo que tenha configurado o `host` para `0.0.0.0` no Fastify.listen(). Então essa solução é para você.
Um problema que pode ser chato, é que se você não mandar nenhuma requisição para o link do tunnel por um pequeno período, a conexão automaticamente se fecha. Então você precisa iniciar novamente.

Esse método só é funcional para modo desenvolvimento, em produção não vai precisar de nada disso

## Configurando a API

Primeiro você vai precisar instalar uma dependência, indo na pasta `server` da api e usando:

```
npm i localtunnel
```

Após isso, você vai no seu `src/server.ts` na api e inserir dessa forma

```javascript
app
.listen({
	host: '0.0.0.0',
	port: 3333,
})
.then(async () => {
	const tunnel = await localtunnel({
		local_host: '0.0.0.0',
		port: 3333,
		subdomain: 'habits-api',
	});

	console.log('HTTP Server Running!');
});
```

**Você vai precisar alterar o subdomínio com algum diferente pois já pode estar sendo utilizado.**

## Configurando a aplicação mobile

Após isso você vai no seu `src/lib/axios.ts` na aplicação mobile e insira o código desta forma.

**Observação: no `baseURL` você vai colocar o subdomínio de acordo com o que você colocou na configuração na API**

```javascript
import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://habits-api.loca.lt',
	headers: {
		'Bypass-Tunnel-Reminder': '', // Serve para ignorar a página padrão do pacote localtunnel, se remover isto, a requisição não vai conseguir retornar os dados
	},
});
```
