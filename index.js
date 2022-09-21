let opcionesCategorias = [] // creo un array para almacenar los objetos de las opciones
let arrayCategoria = ["Alimentacion", "Cuentas y Servicios", "Hogar", "Transporte", "Ropa", "Salud e Higiene", "Otros"] // CATEGORIAS PREDEFINIDAS
const selectTag = document.getElementById('lista')
const descripcionInput = document.getElementById('descripcion')
const valorInput = document.getElementById('valor')
const botonAgregar = document.getElementById('agregar')
const divCategorias = document.getElementsByClassName('divCategorias')
const container2 = document.getElementById('btnAdd') 



class Categorias { // CREAMOS UN OBJETO CON UN ID Y CATEGORIA PARA CADA UNA DE LAS MISMAS
    constructor(id, categoria,descripcion,valor) {
        this.id = id
        this.categoria = categoria
    }

    desplegarProductos() { // ponemos el codigo html para cada categoria 
        const card = `
        <div class="accordion-item">
            <h2 class="accordion-header" id="categoria${this.id}h2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${this.id}" aria-expanded="false" aria-controls="flush-collapse${this.id}">
                ${this.categoria}
                </button>
            </h2>
            <div id="flush-collapse${this.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${this.id}" data-bs-parent="#accordionFlushExample">
            <div id="categoria${this.id}" class="accordion-body">
            </div>
            </div>
        </div>
        `
        const container = document.getElementById('accordion')
        container.innerHTML += card // LE AGREGO EL + PARA IR SUMANDOLE LAS CARDS
    }
}

for (let i = 0; i < arrayCategoria.length; i++) { // ASIGNAMOS EL ARRAY DE LAS CATEGORIAS AL OTRO ARRAY CON LOS OBJETOS
    console.log(arrayCategoria[i])
    opcionesCategorias.push(new Categorias(i + 1, arrayCategoria[i]))
}

opcionesCategorias.forEach(e => { // DESPLEGAMOS LAS OPCIONES 
    e.desplegarProductos()
}) 


/* ========================================================================================================================= */

//EVENTOS

opcionesCategorias.forEach(opcionesCategorias => { // AGREGAMOS LAS OPCIONES DEL ARRAY AL DOM
    const option = document.createElement('option')
    option.innerText = `${opcionesCategorias.categoria}`
    selectTag.append(option)
})



let arrayLocal = []


for (let i = 0; i < arrayCategoria.length; i++) {
    arrayLocal.push('')
}

arrayLocal.forEach(arrayLocal =>{
    console.log(arrayLocal);
})


const containerDivBtn = document.createElement('p')

console.log(arrayLocal.length)

const informacionArray = []

botonAgregar.onclick = (e) => {
    e.preventDefault()
    let gasto = {
        id : parseInt(selectTag.selectedIndex + 1),
        categoria: selectTag.value,
        descripcion: descripcionInput.value ,
        valor: parseInt(valorInput.value)
    }

    const {id,categoria,descripcion,valor} = gasto
    
    informacionArray.push(gasto)

    localStorage.setItem('gastos', JSON.stringify(informacionArray))

/*     agregarGastos()
 */
    if(valor >= 0){
     agregarGastos(localStorage.getItem(`${categoria}`))   
    }else{
        containerDivBtn.innerText = "Ingreso algun dato invalido"
        container2.append(containerDivBtn)
    }
}


console.log(opcionesCategorias);

function agregarGastos(gasto){

        containerDivBtn.remove()

        const new_gastos = JSON.parse(gasto)
        console.log(new_gastos);
        const {id,categoria,descripcion,valor} = new_gastos
        const card = `
        <div class="addGastos btn-group d-flex justify-content-between" role="group" aria-label="Basic checkbox toggle button group">
        <input type="checkbox" class="btn-check" id="btnCheck${id}" autocomplete="off">
        <label class="btn btn-outline-primary d-flex justify-content-between" for="btnCheck${id}">
        <div class="descripcionaccordion" >${descripcion}</div>
        <div class="valoraccordion">${valor}</div>  
        </label>
        </div>
        `
        const container = document.getElementById(`categoria${id}`)
        container.innerHTML += card


        containerDivBtn.innerText = "Gasto agregado"
        container2.append(containerDivBtn)
    }    

 
