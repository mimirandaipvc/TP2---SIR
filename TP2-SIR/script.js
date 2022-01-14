async function getAlunos() {
	const alunos = await fetch('./anexos/alunos.json')
	const data = await alunos.json()
	setList(data)

}

function setList(dados) {
	const div = document.getElementById('informacaoAlunos');
	let infoUtilizador;
	let nome;
	let numero;
	let observacoes;
	let imagem;

	div.innerHTML = '';

	dados.forEach(function (utilizador, key) {
		console.log(utilizador.imagem)
		infoUtilizador = document.createElement('li');
		infoUtilizador.classList.add('list-group-item');
		nome = utilizador.nome
		numero = utilizador.numero
		observacoes = utilizador.observações
		imagem = utilizador.imagem
		console.log(utilizador.imagem)
		infoUtilizador.innerHTML = `
        <div class="row">
			<div class="col-4">
				<p class="lead"><b>Nome:</b> ${nome}</p>
				<p class="lead"><b>Número:</b> ${numero}</p>
			</div>
			<div class="col-4">
				<p class="lead text-center"><b>Observações:</b> ${observacoes}</p>
			</div>
			<div class="col-4">
				<div class="float-end">
					<img src="${imagem}" class="img-fluid" width="200" height="200" alt="${nome}">
				</div>
			</div>
		</div>
        `;
		div.appendChild(infoUtilizador);
	});
}

//Localização
async function getLocalizacao() {
	// fetch com parâmetros (se necessário)
	let url = new URL('https://ipgeolocation.abstractapi.com/v1/');
	const params = {
		api_key: '555ed2ebe909452096544a01ca26e3b0',
		ip_address: ''
	};
	url.search = new URLSearchParams(params);

		try {
			const response = await fetch(url);
			console.log(response)
			if (!response.ok) {
				if (response.status = 404) {
					containerInformacao.innerHTML = 'Local não encontrado';
				}
				const message = 'Error with Status Code: ' + response.status;
				throw new Error(message);
			}

			const data = await response.json();
			console.log(data)
			const cidade = data.city
			// setCard(data);
			getDadosMunicipio(cidade)
		} catch (error) {
			// fetch error handling
			console.log('Error: ' + error);
		}

}

//https://www.geoptapi.org/
async function getDadosMunicipio(local) {
	const containerInformacao = document.getElementById('informacaoMunicipio');
	// const local = document.getElementById('local').value;
	// let localPreenchido;
	// fetch com parâmetros (se necessário)
	let url = new URL('https://geoptapi.org/municipio ');
	const params = {
		nome: local
	};
	url.search = new URLSearchParams(params);

	// fetch com headers (se necessário)
	// const options = {
	// 	method: 'get',
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// };

	// localPreenchido = false;
	// if (local.length > 0) {
	// 	localPreenchido = true;
	// }
	// if (localPreenchido) {
	// 	containerInformacao.innerHTML = 'A obter informação...';
		try {
			const response = await fetch(url);
			console.log(response)
			if (!response.ok) {
				if (response.status = 404) {
					containerInformacao.innerHTML = 'Local não encontrado';
				}
				const message = 'Error with Status Code: ' + response.status;
				throw new Error(message);
			}

			const data = await response.json();
			setCard(data);
		} catch (error) {
			// fetch error handling
			console.log('Error: ' + error);
		}
	// } else {
	// 	containerInformacao.innerHTML = 'Preencha, por favor, o local.';
	// }

}

function setCard(dadosAPI) {
	const div = document.getElementById('informacaoMunicipio');
	const infoMunicipio = document.createElement('div');
	const nome = dadosAPI.nome
	const eleitores = dadosAPI.eleitores
	const populacao = dadosAPI.populacao
	const areaha = dadosAPI.areaha
	const sitio = dadosAPI.sitio
	const telefone = dadosAPI.telefone
	const email = dadosAPI.email
	const codigopostal = dadosAPI.codigopostal

	div.innerHTML = '';
	infoMunicipio.innerHTML = `
		<div class="card" style="width: 18rem;">
			<img class="card-img-top " src="./anexos/imagens/um.png" alt="Card image cap">
				<div class="card-body ">
					<h5 class="card-title text-center lead">${nome}</h5>
					<p class="card-text"><b>Site</b>: ${sitio}</p>
					<p class="card-text"><b>Email</b>: ${email}</p>
					<p class="card-text"><b>Tel</b>: ${telefone}</p>
					<p class="card-text"><b>CP</b>: ${codigopostal}</p>
					<p class="card-text"><b>População</b>: ${populacao}</p>
					<p class="card-text"><b>Área(ha)</b>: ${areaha}</p>
					<p class="card-text"><b>Eleitores</b>: ${eleitores}</p>
				</div>
		</div>`;
	div.appendChild(infoMunicipio);
}

//
async function getDadosCovid() {

	const containerInformacao = document.getElementById('informacaoCovid');
	const local = document.getElementById('paiscovid').value;
	const x = local
	let localPreenchido;
	// fetch com parâmetros (se necessário)
	let url = new URL('https://covid-19-data.p.rapidapi.com/country');
	const params = {
		name: local
	};
	url.search = new URLSearchParams(params);

	// fetch com headers (se necessário)
	const options = {
		method: 'get',
		headers: {
			"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
			"x-rapidapi-key": "85638242c7mshc4592b8d3e664e7p1f0ab4jsn6e46c89d4fbd"
		}
	};

	localPreenchido = false;
	if (local.length > 0) {
		localPreenchido = true;
	}
	if (localPreenchido) {
		containerInformacao.innerHTML = 'A obter informação...';
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				if (response.status = 404) {
					containerInformacao.innerHTML = 'Local não encontrado';
				}
				const message = 'Error with Status Code: ' + response.status;
				throw new Error(message);
			}

			if (response.status = 200) {
				getDadosPopulacao(x)
			}

			const data = await response.json();
			setCard2(data);
		} catch (error) {
			// fetch error handling
			console.log('Error: ' + error);
		}
	} else {
		containerInformacao.innerHTML = 'Preencha, por favor, o local.';
	}

}

function setCard2(dadosAPI) {
	const div = document.getElementById('informacaoCovid');
	const infoCovid = document.createElement('div');
	const country = dadosAPI[0].country
	const confirmed = dadosAPI[0].confirmed
	const recovered = dadosAPI[0].recovered
	const deaths = dadosAPI[0].deaths


	div.innerHTML = '';
	infoCovid.innerHTML = `
		<div class="card" style="width: 18rem;">
			<img class="card-img-top " src="./anexos/imagens/covid.jpg" alt="Card image cap">
				<div class="card-body lead">
					<h5 class="card-title text-center">${country}</h5>
					<p class="card-text">Casos Confirmados: ${confirmed}</p>
					<p class="card-text">Recuperados: ${recovered}</p>
					<p class="card-text">Mortes: ${deaths}</p>
				</div>
		</div>`;
	div.appendChild(infoCovid);
}

//https://rapidapi.com/aldair.sr99/api/world-population/
async function getDadosPopulacao(pais) {
	const containerInformacao = document.getElementById('informacaoPopulacao');
	const local = pais
	let localPreenchido;
	// fetch com parâmetros (se necessário)
	let url = new URL('https://world-population.p.rapidapi.com/population');
	const params = {
		country_name: local
	};
	url.search = new URLSearchParams(params);

	// fetch com headers (se necessário)
	const options = {
		method: 'get',
		headers: {
			"x-rapidapi-host": "world-population.p.rapidapi.com",
			"x-rapidapi-key": "85638242c7mshc4592b8d3e664e7p1f0ab4jsn6e46c89d4fbd"
		}
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			if (response.status = 404) {
				containerInformacao.innerHTML = 'Local não encontrado';
			}
			const message = 'Error with Status Code: ' + response.status;
			throw new Error(message);
		}

		const data = await response.json();
		setCard3(data);
	} catch (error) {
		// fetch error handling
		console.log('Error: ' + error);
	}

}

function setCard3(dadosAPI) {
	console.log(dadosAPI)
	const dados = dadosAPI.body
	const div = document.getElementById('informacaoPopulacao');
	const infoPopulacao = document.createElement('div');
	const country = dados.country_name
	const population = dados.population
	const ranking = dados.ranking

	div.innerHTML = '';
	infoPopulacao.innerHTML = `
		<div class="card" style="width: 18rem;">
			<img class="card-img-top " src="./anexos/imagens/pop.jpg" alt="Card image cap">
				<div class="card-body lead">
					<h5 class="card-title text-center">${country}</h5>
					<p class="card-text">População: ${population}</p>
					<p class="card-text">Ranking: ${ranking}</p>
				</div>
		</div>`;
	div.appendChild(infoPopulacao);
}

function setEvents() {
	const btn = document.getElementById('obterInformacaoAlunos');
	btn.addEventListener('click', () => getAlunos());
	// const btn = document.getElementById('obterInformacaoAlunos');
	// btn.addEventListener('click', () => getLocalizacao());
	const btn2 = document.getElementById('obterDadosMunicipio');
	btn2.addEventListener('click', () => getLocalizacao());
	const btn3 = document.getElementById('obterDadosCovid');
	btn3.addEventListener('click', () => getDadosCovid());

}

document.addEventListener('DOMContentLoaded', () => {
	setEvents();
});
