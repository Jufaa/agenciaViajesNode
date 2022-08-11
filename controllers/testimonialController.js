import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) =>{
    
    // Validar
    const { nombre, correo, mensaje} = req.body;

    const errores = []
    if(nombre.trim() === ''){
        errores.push({mensaje : 'El nombre esta clean'})
    }
    if(correo.trim() === ''){
        errores.push({mensaje : 'El correo esta clean'})
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje : 'El mensaje esta clean'})
    }
    
    if(errores.length > 0 ){
        // Consultar testimoniales existentes

        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con erroes
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
        })
        res.redirect('/testimoniales')

        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}