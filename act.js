const objetos =[
    {
        manzanas:3,
        peras:2,
        carne:1,
        jugos:5,
        dulces:2,
    },{
        manzanas:1,
        sandias:1, 
        huevos: 6,
        jugos:1,
        panes:4,

    }
] 

const tiposDeProductos = [];

objetos.forEach(objeto => {
    Object.keys(objeto).forEach(producto => {
        if (!tiposDeProductos.includes(producto)) {
            tiposDeProductos.push(producto);
        }
    });
});


console.log(tiposDeProductos);

let totalProductosVendidos = {};

objetos.forEach(objeto => {
    Object.entries(objeto).forEach(([producto, cantidad]) => {
        totalProductosVendidos[producto] = (totalProductosVendidos[producto] || 0) + cantidad;
    });
});


console.log(totalProductosVendidos);