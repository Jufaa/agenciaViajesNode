import { Viaje } from '../models/Viaje.js'
import { Testimonial } from "../models/Testimoniales.js";
const paginaInicio = async(req, res) =>{ // Req- loqe enviamos : res- lo qe express responde
   
   
    // Consutlar 3 viajes del modelo Viaje
    const promiseDB = []
    promiseDB.push(Viaje.findAll({limit : 3}));
    promiseDB.push(Testimonial.findAll({limit : 3}));


    try {
        const resultado = await Promise.all(promiseDB)
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado [0],
            testimoniales: resultado [1]
    });
} catch (error) {
    console.log(error)
}

}


const paginaNosotros = (req, res) =>{ // Req- loqe enviamos : res- lo qe express responde
    res.render('nosotros', {
        pagina : 'Nosotros'
    })
}

const paginaViajes= async(req, res) =>{ // Req- loqe enviamos : res- lo qe express responde
    // Consultar a la BD

    const viajes = await Viaje.findAll()
    console.log(viajes)
    
    
    res.render('viajes', {
        pagina : 'Proximos Viajes',
        viajes
    })
}

const paginaTestimoniales = async(req, res) =>{ // Req- loqe enviamos : res- lo qe express responde

        try {
            const testimoniales = await Testimonial.findAll();
            res.render('testimoniales', {
                pagina : 'Testimoniales',
                testimoniales
            });
        } catch (error) {
            console.log(error)   
        }
    
}

const paginaDetalleViajes = async(req, res) =>{
    const { slug } = req.params;

    try {
    const viaje = await Viaje.findOne({where : { slug }});        
    res.render('viaje', {
        pagina: 'Informacion Viaje',
        viaje
    })
    } catch (error) {
        console.log(error)
    }
}
export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViajes
}