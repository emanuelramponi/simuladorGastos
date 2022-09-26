//  EMANUEL RAMPONI
let opcionesCategorias = []                                                 // CREO UN ARRAY PARA ALMACENAR LOS OBJETOS DE LAS OPCIONES                                                        
let arrayCategoria = [
    "Alimentacion",                                                         // CATEGORIAS PREDEFINIDAS
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
const formulario = document.getElementById('form_gastos')     
const gastosLocal = JSON.parse(localStorage.getItem('gastos')) || []        // OPERADORES AVANZADOS, SI HAY ALGUN ELEMENTO DENTRO DEL LOCAL STORAGE, HACEMOS QUE SE GUARDE, SINO QUE QUEDE VACIO EL ARRAY

const containerDivBtn = document.createElement('p')

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
            <div class="addGastos btn-group d-flex justify-content-between" role="group" aria-label="Basic checkbox toggle button group " id= ${this.id}$">   
            </div>
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


//==========================================================================//EVENTOS====================================================================================

opcionesCategorias.forEach(opcionesCategorias => {                          // AGREGAMOS LAS OPCIONES DEL ARRAY AL DOM
    const option = document.createElement('option')
    option.innerText = `${opcionesCategorias.categoria}`
    selectTag.append(option)
})

agregarGastos(gastosLocal)                                                  // ANTES DE AGREGAR LOS GASTOS DEL SUBMIT, AGREGO LOS GASTOS YA EXISTENTES DEL LOCAL STORAGE

formulario.onsubmit = (e) => {                                              // AGREGO LOS NUEVOS GASTOS AL HACER SUBMIT
    e.preventDefault()
    let gasto = {
        id : parseInt(selectTag.selectedIndex + 1),
        categoria: selectTag.value,
        descripcion: descripcionInput.value ,
        valor: parseInt(valorInput.value)
    }

    const {id,categoria,descripcion,valor} = gasto


    if(valorNotNull(descripcion,valor)){                                    // EN CASO DE QUE EL VALORNOTNULL SEA VERDADERO, SIGNIFICA QUE INGRESO O UN VALOR DE STRING VACIO, 
        containerDivBtn.innerText = "Ingreso algun dato invalido"           // O QUE EL NUMERO ES NEGATIVO, IGUAL A 0, O INGRESO UN STRING EN EL INPUT DE VALOR
        container2.append(containerDivBtn)
  
    }else{
        gastosLocal.push(gasto)                                             // AGREGO LOS DATOS DEL GASTO PRIMERO AL ARRAY GASTOS LOCAL
        localStorage.setItem('gastos', JSON.stringify(gastosLocal))         // Y DESPUES LO AGREGO AL LOCAL STORAGE PASANDO COMO PARAMETRO EL ARRAY DEL GASTO

        agregarGastos(gastosLocal)                                          // AGREGO EL GASTO AL DOM

    }      
    formulario.reset()
}

                                                                            //VERIFICO SI INGRESO ALGUN DATO NULL O SI EL VALOR ES POSITIVO PARA, 
function valorNotNull(descripcion,valor){                                   //EN CASO DE QUE SE CUMPLA LA CONDICON, AGREGARLO AL ARRAY

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
    containerDivBtn.remove()                                                // ELIMINO EL CARTEL DE 'DATO INVALIDO'
    
    opcionesCategorias.forEach(e=>{                                         // PARA CADA CATEGORIA INICIALIZO UN INNERHTML VACIO 
        let container = document.getElementById(`categoria${e.id}`)
        container.innerHTML =""
    })
    
    array.forEach((e,i)=>{

        const {id,descripcion,valor} = e                                    // DESTRUCTURACION DEL ELEMENTO
    
        let div = document.createElement("div")                             // CREACION DE UN DIV

        div.innerHTML =                                                     // MODIFICO EL DIV QUE CREE ANTERIORMENTE CON CODIGO
            `   
            <input type="checkbox" class="btn-check" id="btnCheck${id}${i+1}" autocomplete="off">
            <label class="btn btn-outline-primary d-flex justify-content-between" for="btnCheck${id}${i+1}">
                <div class="descripcionaccordion" >${descripcion}</div> 
                <div class="valoraccordion"> ${valor}</div>  
            </label>
            `
        let container = document.getElementById(`categoria${id}`)           // COPIAMOS DEL HTML EL DIV CON EL ID DE CATEGORIAS CON SU ID CORRESPONDIENTE, 
                                                                            // PARA ASIGNAR CADA GASTO EN SU CORRECTO LUGAR
        container.appendChild(div)                                          // Y POR ULTIMO AGREGAMOS EL  DIV QUE AL CONTAINER QUE RECUPERAMOS ANTES DEL HTML
    })
}
       
// EMANUEL RAMPONI
