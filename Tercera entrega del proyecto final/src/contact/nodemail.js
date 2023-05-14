import { config } from "dotenv";
import { createTransport } from "nodemailer";

config();

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'henry73@ethereal.email',
        pass: 'hJV7ADC8d4yDVaPbTV'
    }
});

const sendMail = async (usuario, nombre, apellido, email) => {
    try {
        const mailOptions = {
            from: "ml.3012@gmail.com",
            to: "porlan.agustin@gmail.com",
            subject: "Nuevo registro",
            html: `<h3 style="color: blue;">usuario: ${usuario}</h3>
            <h3 style="color: blue;">nombre: ${nombre}</h3>
            <h3 style="color: blue;">apellido: ${apellido}</h3>
            <h3 style="color: blue;">mail: ${email}</h3>
            <h3 style="color: blue;">phone: ${phone}</h3>
            <h3 style="color: blue;">adress: ${adress}</h3>
            <h3 style="color: blue;">age: ${age}</h3>
            <h3 style="color: blue;">photo: ${photo}</h3>`,
            
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log(info);
    } catch (err) {
        console.log(err);
    }
}

export default sendMail;
