function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

async function getAlunos() {

	const containerInformacao = document.getElementById('obterInformacaoAlunos');

		try {
			readTextFile("./anexos/alunos.json", function (text) {
				var data = JSON.parse(text);
				setList(data);
			});
		} catch (error) {
			console.log('Error: ' + error);
		}

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

//https://www.geoptapi.org/
async function getDadosMunicipio() {
	const containerInformacao = document.getElementById('informacaoMunicipio');
	const local = document.getElementById('local').value;
	let localPreenchido;
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

	localPreenchido = false;
	if (local.length > 0) {
		localPreenchido = true;
	}
	if (localPreenchido) {
		containerInformacao.innerHTML = 'A obter informação...';
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
	} else {
		containerInformacao.innerHTML = 'Preencha, por favor, o local.';
	}

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
				<div class="card-body lead">
					<h5 class="card-title text-center">${nome}</h5>
					<p class="card-text">Site: ${sitio}</p>
					<p class="card-text">Email: ${email}</p>
					<p class="card-text">Tel: ${telefone}</p>
					<p class="card-text">CP: ${codigopostal}</p>
					<p class="card-text">População: ${populacao}</p>
					<p class="card-text">Área(ha): ${areaha}</p>
					<p class="card-text">Eleitores: ${eleitores}</p>
				</div>
		</div>`;
	div.appendChild(infoMunicipio);
}

async function getDadosCovid() {
	const containerInformacao = document.getElementById('informacaoCovid');
	const local = document.getElementById('paiscovid').value;
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

function setEvents() {
	const btn = document.getElementById('obterInformacaoAlunos');
	btn.addEventListener('click', () => getAlunos());
	const btn2 = document.getElementById('obterDadosMunicipio');
	btn2.addEventListener('click', () => getDadosMunicipio());
	const btn3 = document.getElementById('obterDadosCovid');
	btn3.addEventListener('click', () => getDadosCovid());

}

document.addEventListener('DOMContentLoaded', () => {
	setEvents();
});
