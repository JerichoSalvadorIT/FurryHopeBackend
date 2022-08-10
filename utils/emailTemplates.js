const address = '2/F Engineering Bldg. Agora Complex Paliparan Sto. Nino Marikina City, Philippines'

const sendInterviewSchedTemplate = (date, time) => {
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

                .greeting {
                    margin: 10px 30px 0 30px;
                    color: white;
                    font-weight: 300;
                    font-size: .9rem;
                    line-height: 30px;
                }

                .interview-heading {
                    color: white;
                    font-size: .85rem;
                    margin: 30px 30px 0 30px;
                }

                .interview-label {
                    color: white;
                    font-size: .78rem;
                    margin: 15px 8px 0 30px;
                }

                .interview-label span {
                    font-weight: 200;
                }
            
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

                <p class="greeting">Good day, we would like to invite you to an interview to assess whether or not you are qualified to adopt the
                    animal you applied to adopt. We are located at ${address}</p>
                
                <p class="interview-heading">Interview Details (Date and Time)</p>
                <p class="interview-label">Date: <span>${date}</span></p>
                <p class="interview-label">Time: <span>${time}</span></p>

                <div class="container-footer">
                    <p class="footer">MARIKINA VETERINARY OFFICE</p>
                </div>
            </div>
        </body>
    `
}

const rejectAdoptionTemplate = (adopterName, animalName) => {
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
                    background-color: rgb(220, 48, 85);
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

                .success {
                    color: white;
                    font-size: .9rem;
                    font-weight: 300;
                    margin: 10px 30px;
                    line-height: 30px;
                }

                .container-footer {
                    margin-top: 30px;
                    padding: 15px 0;
                    background-color: rgb(133, 29, 64);
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

                <p class="success">
                    Good day ${adopterName}, we would like to inform you that your application to adopt ${animalName} has been rejected
                </p>

                <div class="container-footer">
                    <p class="footer">MARIKINA VETERINARY OFFICE</p>
                </div>
            </div>
        </body>
    `
}

const pickupTemplate = (pickupDate, pickupTime, animalName, adopterName) => {
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
                    background-color: rgb(0, 183, 139);
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

                .success {
                    color: white;
                    font-size: .9rem;
                    font-weight: 300;
                    margin: 10px 30px;
                    line-height: 30px;
                }

                .container-footer {
                    margin-top: 30px;
                    padding: 15px 0;
                    background-color: rgb(0, 67, 58);
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

                <p class="success">
                    Good day ${adopterName}, we would like to inform you that your application to adopt ${animalName} has been approved
                    and you can pickup your new pet on ${pickupDate} at exactly ${pickupTime}. We are located at ${address}, Have a
                    wonderful day.
                </p>

                <div class="container-footer">
                    <p class="footer">MARIKINA VETERINARY OFFICE</p>
                </div>
            </div>
        </body>
    `
}

const registerAnimalTemplate = (name, animalName) => {
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

                .registered {
                    margin: 15px 30px;
                    color: white;
                    font-weight: 300;
                    font-size: .9rem;
                    line-height: 25px;
                }

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

                <p class="registered">
                    Good day ${name}, we would like to inform you that your pet ${animalName} has been registered to the veterinary
                    office.
                </p>

                <div class="container-footer">
                    <p class="footer">MARIKINA VETERINARY OFFICE</p>
                </div>
            </div>
        </body>
    `
} 

module.exports = { sendInterviewSchedTemplate, rejectAdoptionTemplate, pickupTemplate, registerAnimalTemplate }