const nodemailer = require('nodemailer')

const generateResetPasswordTemplate = (url) => {
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
                    padding: 10px 23px;
                }

                .container-header-img {
                    height: 38px;
                    width: 38px;
                    margin-top: 5px;
                }

                .container-header-left-p {
                    color: white;
                    font-weight: 400;
                    font-size: .9rem;
                }

                h1 {
                    margin: 10px 30px 0 30px;
                    color: white;
                    font-size: 1.85rem;
                    font-weight: 500;
                    line-height: 45px;
                }

                .reset-p {
                    margin: 10px 30px 0 30px;
                    color: white;
                    font-weight: 100;
                    font-size: .95rem;
                }

                .reset-btn {
                    margin: 15px 0 0 30px;
                    display: block;
                    font-size: .9rem;
                    width: fit-content;
                }

                /* #e63946 */

                .container-footer {
                    margin-top: 30px;
                    padding: 15px 0;
                    background-color: rgb(19, 19, 19);
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

                <h1>Forgot your password? <br/>Don't worry</h1>
                <p class="reset-p">Click the link below to reset your password</p>
                <div>
                    <a href="${url}" class="reset-btn">Reset Password</a>
                </div>


                <div class="container-footer">
                    <p class="footer">MARIKINA VETERINARY OFFICE</p>
                </div>
            </div>
        </body>
    `
}

const plainEmailTemplate = (heading, message) => {
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
                    padding: 10px 23px;
                }

                .container-header-img {
                    height: 38px;
                    width: 38px;
                    margin-top: 5px;
                }

                .container-header-left-p {
                    color: white;
                    font-weight: 400;
                    font-size: .9rem;
                }

                h1 {
                    margin: 10px 30px 0 30px;
                    color: white;
                    font-size: 1.85rem;
                    font-weight: 500;
                    line-height: 45px;
                }

                .reset-p {
                    margin: 7px 30px 0 30px;
                    color: white;
                    font-weight: 200;
                    font-size: .95rem;
                }


                /* #e63946 */

                .container-footer {
                    margin-top: 30px;
                    padding: 15px 0;
                    background-color: rgb(19, 19, 19);
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

        <!-- Password has been reset -->
        <body>
            <div class="container">
                <div class="container-header">
                    <img src="https://res.cloudinary.com/drvd7jh0b/image/upload/v1659818204/jvozyybu0ugikelsrjdk.png" alt=""
                        class="container-header-img">
                    <p class="container-header-left-p">FurryHope</p>
                </div>

                <h1>${heading}</h1>
                <p class="reset-p">${message}</p>

                <div class="container-footer">
                    <p class="footer">MARIKINA VETERINARY OFFICE</p>
                </div>
            </div>
        </body>
    `
}

module.exports = { generateResetPasswordTemplate, plainEmailTemplate }