let opcionesCategorias = []                                                 // CREO UN ARRAY PARA ALMACENAR LOS OBJETOS DE LAS OPCIONES                                                        
let arrayCategoria = [
    "Alimentacion",                                       // CATEGORIAS PREDEFINIDAS
    "Cuentas y Servicios", 
    "Hogar", 
    "Transporte", 
    "Ropa", 
    "Salud e Higiene", 
    "Otros"
    ]                                                    
const selectTag = document.getElementById('lista')
const descripcionInput = document.getElementById('descripcion')
const valorInput = document.getElementById('valor')
const divCategorias = document.getElementsByClassName('divCategorias')
const container2 = document.getElementById('btnAdd') 
const gastosLocal = JSON.parse(localStorage.getItem('gastos')) || []    // OPERADORES AVANZADOS, SI HAY ALGUN ELEMENTO DENTRO DEL LOCAL STORAGE, HACEMOS QUE SE GUARDE, SINO QUE QUEDE VACIO EL ARRAY


console.log(gastosLocal);

class Categorias {                                                          // CREAMOS UN OBJETO CON UN ID Y CATEGORIA PARA CADA UNA DE LAS MISMAS
    constructor(id, categoria,descripcion,valor) {
        this.id = id
        this.categoria = categoria
        this.descripcion = descripcion
        this.valor = valor
    }

    desplegarProductos() {                                                  // PONEMOS EL CODIGO HTML EN CADA CATEGORIA
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
        container.innerHTML += card                                         // LE AGREGO EL + PARA IR SUMANDOLE LAS CARDS
    }
}

for (let i = 0; i < arrayCategoria.length; i++) {                           // ASIGNAMOS EL ARRAY DE LAS CATEGORIAS AL OTRO ARRAY CON LOS OBJETOS
    console.log(arrayCategoria[i])
    opcionesCategorias.push(new Categorias(i + 1, arrayCategoria[i]))
}

opcionesCategorias.forEach(e => {                                           // DESPLEGAMOS LAS OPCIONES 
    e.desplegarProductos()
}) 



//==========================================================EVENTOS====================================================================================

opcionesCategorias.forEach(opcionesCategorias => {                          // AGREGAMOS LAS OPCIONES DEL ARRAY AL DOM
    const option = document.createElement('option')
    option.innerText = `${opcionesCategorias.categoria}`
    selectTag.append(option)
})

const containerDivBtn = document.createElement('p')

 

const formulario = document.getElementById('form_gastos')
formulario.onsubmit = (e) => {
    e.preventDefault()
    let gasto = {
        id : parseInt(selectTag.selectedIndex + 1),
        categoria: selectTag.value,
        descripcion: descripcionInput.value ,
        valor: parseInt(valorInput.value)
    }

    const {id,categoria,descripcion,valor} = gasto


    if(valorNotNull(descripcion,valor)){
        containerDivBtn.innerText = "Ingreso algun dato invalido"
        container2.append(containerDivBtn)
/*      */   
    }else{
        gastosLocal.push(gasto)
        localStorage.setItem('gastos', JSON.stringify(gastosLocal))
        agregarGastos(gastosLocal)

    }      
    formulario.reset()
}


function valorNotNull(descripcion,valor){

    let invalidNumber = valor || true  // si valor es null o vacio o igual a 0, arroja true
    let invalidString = descripcion || true // idem arriba

    return invalidNumber !== true && invalidNumber <= 0 ? invalidNumber = true : invalidString === true || invalidNumber === true? true : false
    /* 
    operadores, si invalidNumber es diferente de true y menor a 0, se convierte a true, 
    si invalidNumber es estrictamente igual a true o invalidString es estrictamente igual a true,
    retornar true si se cumple alguna de las condiciones, sino retornar false 
    */
}


function agregarGastos(array){
    containerDivBtn.remove()
    
    opcionesCategorias.forEach(elemento=>{
        let container = document.getElementById(`categoria${elemento.id}`)
        container.innerHTML =""
    })

    array.forEach(elemento=>{
        let div = document.createElement("div")
        div.innerHTML = `   <div class="addGastos btn-group d-flex justify-content-between" role="group" aria-label="Basic checkbox toggle button group">
                                <input type="checkbox" class="btn-check" id="btnCheck${elemento.id}" autocomplete="off">
                                <label class="btn btn-outline-primary d-flex justify-content-between" for="btnCheck${elemento.id}">
                                <div class="descripcionaccordion" >${elemento.descripcion}</div>
                                <div class="valoraccordion">${elemento.valor}</div>  
                                </label>
                            </div>`
        let container = document.getElementById(`categoria${elemento.id}`)
        console.log(container)
        container.appendChild(div)
    })


}
/*         containerDivBtn.remove()
        console.log(gasto);
        const new_conversion = JSON.parse(gasto)
        gastosLocal.push(new_conversion)
        console.log(new_conversion);
        const {id,categoria,descripcion,valor} = new_conversion
        const card = `
        <div class="addGastos btn-group d-flex justify-content-between" role="group" aria-label="Basic checkbox toggle button group">
        <input type="checkbox" class="btn-check" id="btnCheck${id}" autocomplete="off">
        <label class="btn btn-outline-primary d-flex justify-content-between" for="btnCheck${id}">
        <div class="descripcionaccordion" >${descripcion}</div>
        <div class="valoraccordion">${valor}</div>  
        </label>
        </div>
        `
        const container2 = document.getElementById(`categoria${id}`)
        container2.innerHTML += card

        containerDivBtn.innerText = "Gasto agregado"
        container2.append(containerDivBtn) */
       

