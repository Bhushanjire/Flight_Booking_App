var fs = require("fs");
import pdf = require("html-pdf");
import nodemailer = require("nodemailer");


class PDF {
  constructor() {}
  createPDF(bookingData : any) {
    //   console.log('Booking Data',bookingData);
    var options = { format: "Letter" };
    // console.log('qqq',q);
    let data = `<div style="margin-left : 40%">
            <center>E-Ticket</center></div>
        <br>
        <div style="margin-left : 20%;font-size : 12px">
          <table border="1" cellspacing="0" cellpadding="1">
          <tr>
          <td><strong>Ticket No.</strong></td>
          <td>${bookingData._id}</td>
          </tr>
          <tr>
                <td><strong>Travel</strong></td>
                <td>${bookingData?.flightScheduleId?.fromCityId.name} To ${bookingData?.flightScheduleId?.toCityId.name}</td>
                </tr>
                <tr>
                <td><strong>Company Name</strong></td>
                <td>${bookingData?.flightScheduleId?.flightId?.flightcompanyName}</td>
                </tr>
                <tr>
                <td><strong>Flight Number</strong></td>
                <td>${bookingData?.flightScheduleId?.flightId?.flightNumber}</td>
                </tr>
                <tr>
                <td><strong>Flight Name</strong></td>
                <td>${bookingData?.flightScheduleId?.flightId?.flightName}</td>
                </tr>
                
                <tr>
                <td><strong>Seat No.</strong></td>
                <td>${bookingData?.seactNumbers.join(",")}</td>
                </tr>
                <tr>
                <td><strong>Departure Time</strong></td>
                <td>${bookingData?.flightScheduleId?.departuteTime}</td>
                </tr>
                <tr>
                <td><strong>Arrival Time</strong></td>
                <td>${bookingData?.flightScheduleId?.arrivalTime}</td>
                </tr>
                <tr>
                <td><strong>Duration</strong></td>
                <td>${bookingData?.flightScheduleId?.duration}</td>
                </tr>
                <tr>
                <td><strong>Total Cost</strong></td>
                <td>Rs. ${bookingData?.totalPrice}</td>
                </tr>
          </table>
        </div>
        <div><center><h3>Happy Journey</h3></center></div>`;

    fs.writeFile(`./assets/files/${bookingData._id}.html`, data, "utf8", (error) => {
      var html = fs.readFileSync(`./assets/files/${bookingData._id}.html`, "utf8");
      pdf.create(html, options).toFile(`./assets/files/${bookingData._id}.pdf`, function (err, res) {
          if (err) {
              console.log('Error while PDF create',err);
          } else {
            // console.log('PDF created successfully',res);
            const transporter = nodemailer.createTransport({
                servicee: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use SSL
                auth: {
                  user: process.env.GMAIL_EMAIL,
                  pass: process.env.GMAIL_PASSWORD,
                }, //https://myaccount.google.com/lesssecureapps?pli=1  keep on Less secure app access
              });
  
              let subject = "E-Ticket";
  
              let body1 = `
              <div style="width: 70%; background-color: #f0f0f0; padding: 50px 50px 100px 50px;">
  <div style="width: 70%; background-color: white; padding: 15px 100px 15px 15px;">Hello, ${bookingData.userId.firstName} ${bookingData.userId.lastName}
  <h2>Download your e-ticket</h2>
  <hr /></div>`;
  
              const mailOptions = {
                from: "bhushanjire@gmail.com",
                to: bookingData.userId.emailId,
                subject: subject,
                //  text: body //for text email
                html: body1, //for html email,
                attachments: [
                  {
                    // file on disk as an attachment
                    filename: `${bookingData._id}.pdf`,
                    path: `./assets/files/${bookingData._id}.pdf`, // stream this file
                  },
                ],
              };
  
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log('Error in PDF mail',error);
                  
                } else {
                    // console.log('PDF mail sent successfully',info)
                }
              });

          }
        });
    });
  }
}

export default PDF;
