let opcionesCategorias = [] // creo un array para almacenar los objetos de las opciones
let arrayCategoria = ["Alimentacion", "Cuentas y Servicios", "Hogar", "Transporte", "Ropa", "Salud e Higiene", "Otros"] // CATEGORIAS PREDEFINIDAS
const selectTag = document.getElementById('lista')
const descripcionInput = document.getElementById('descripcion')
const valorInput = document.getElementById('valor')
const divCategorias = document.getElementsByClassName('divCategorias')
const container2 = document.getElementById('btnAdd') 
const gastosLocalstrg = JSON.parse(localStorage.getItem('gastos')) || [] // operadores avanzados, si hay algun elemento dentro del local storage que se guarde sino que quede vacio el array


class Categorias { // CREAMOS UN OBJETO CON UN ID Y CATEGORIA PARA CADA UNA DE LAS MISMAS
    constructor(id, categoria,descripcion,valor) {
        this.id = id
        this.categoria = categoria
        this.descripcion = descripcion
        this.valor = valor
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

const containerDivBtn = document.createElement('p')

 

const formulario = document.getElementById('form_gastos')
formulario.onsubmit = (e) => {
    e.preventDefault()
    let condicionNull = 0
    let gasto = {
        id : parseInt(selectTag.selectedIndex + 1),
        categoria: selectTag.value,
        descripcion: descripcionInput.value ,
        valor: parseInt(valorInput.value)
    }

    const {id,categoria,descripcion,valor} = gasto
/*     const object = {}
    obj['descripcion'] =  */
/*    
    } */


     Array.from(e.target.children).forEach(children =>{
        /* input === null || condicionNull++ */
        Array.from(children.children).forEach(input =>{
            console.log(input.value);
        })
        
     })
    
    console.log(e);
    if(condicionNull>0){
        gastosLocalstrg.push(new Categorias(id,categoria,descripcion,valor))
        localStorage.setItem('gastos', JSON.stringify(gastosLocalstrg))
/*      */   
    }else{
        containerDivBtn.innerText = "Ingreso algun dato invalido"
        container2.append(containerDivBtn)
    }
}

/* agregarGastos(localStorage.getItem(`gastos`))
 */



/* function agregarGastos(gasto){
        
        containerDivBtn.remove()
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
        container2.append(containerDivBtn)
    }    

  */
