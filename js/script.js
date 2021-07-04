const base = document.getElementById('moedaBase')
const destino = document.getElementById('moedaDestino')
const input = document.getElementsByTagName('input')[0]
const valorDisplay = document.getElementsByTagName('span')[1]

const urlBase = "https://economia.awesomeapi.com.br/json/all"

window.addEventListener('load', async function(){
    const moedas = await fetch(urlBase).then(response => response.json()).then(response => Object.keys(response))
    const currencies = await fetch(urlBase).then(response => response.json()).then(response => Object.values(response))
    const nomes = currencies.map(currency => currency.name.split('/')[0])
    for(let i = 0; i< moedas.length;i++){
        const optionBase = document.createElement('option')
        optionBase.setAttribute('value', moedas[i])
        optionBase.innerHTML = nomes[i]
        base.appendChild(optionBase)
    }
})

async function converteMoeda(){
    const amount = parseFloat(input.value)
    const moedaBase = base.value
    const moedaDestino = destino.value
    const urlConversao = `https://economia.awesomeapi.com.br/last/${moedaBase}-${moedaDestino}`
    const valorObject = await fetch(urlConversao).then(response => response.json()).then(response => Object.values(response)[0])
    const valor = valorObject.high
    const valorFinal = amount*valor
    valorDisplay.innerHTML = `O valor convertido é ${valorFinal.toFixed(2)}`
}
