const nodemailer = require('nodemailer')

const generateCode = () => {
    let verCode = ''

    for (let i = 0; i <= 3; i++) {
        const randomNum = Math.round(Math.random() * 9)
        verCode += randomNum
    }
    
    return verCode
}

const emailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        // Palitan mo to ng values sa .env
        user: "qjasalvador@tip.edu.ph",
        pass: "tipofthetopoftheworld"
    }
})

// Function we're going to use to send the verification code to the user's email
const mailTransport = () => nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD
    }
});

const emailTemplate = (code) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap');

                body {
                    background-color: #f3f2ef;
                    /*#fffd0*/
                    font-family: 'Poppins', sans-serif;
                }

                .container {
                    max-width: 620px;
                    margin: 30px auto 30px auto;
                    width: 620px;
                    color: #272727;
                    background-color: rgb(26, 26, 26);
                    border-radius: 5px;
                }

                .container-header {
                    display: flex;
                    align-items: center;
                    padding: 10px 30px;
                }

                .container-header-img {
                    height: 38px;
                    width: 38px;
                    margin-top: 6px;
                }

                .container-header-left-p {
                    color: white;
                    font-weight: 400;
                    font-size: .9rem;
                }

                .codeContainer {
                    padding: 0 130px;
                    font-size: .9rem;
                    margin-top: 30px;
                }
                .codeHeader {
                    color: white;
                    font-weight: 600;
                    text-align: center;
                    font-size: 1.1rem;
                }
                .container-footer {
                    margin-top: 30px;
                    padding: 15px 0;
                    background-color: rgb(19, 19, 19);
                }
                .code {
                    text-align: center;
                    color: white;
                    font-weight: 400;
                    font-size: .98rem;
                }
                .footer {
                    font-weight: 100;
                    letter-spacing: 5px;
                    font-size: .75rem;
                    text-align: center;
                    margin-top: auto;
                    margin-bottom: auto;
                    color: white;
                }

                @media only screen and (max-width: 620px) {
                    h1 {
                        font-size: 20px;
                        padding: 5px;
                    }
                }
            </style>
        </head>

        <body>
            <div class="container">
                <div class="container-header">
                    <img src="https://res.cloudinary.com/drvd7jh0b/image/upload/v1659818204/jvozyybu0ugikelsrjdk.png" alt=""
                        class="container-header-img">
                    <p class="container-header-left-p">FurryHope</p>
                </div>

                <!-- <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">
                            Thank you for registering and we hope that you would enjoy using the application.
                        </h1> -->
                <div class="codeContainer">
                    <p class="codeHeader">To verify your account, use this code for you to be able to use your account:</p>
                    <p class="code">${code}</p>
                </div>



                <div class="container-footer">
                    <p class="footer">MARIKINA VETERINARY OFFICE</p>
                </div>
            </div>
        </body>
    `
}

module.exports = { generateCode, mailTransport, emailTransport, emailTemplate } 