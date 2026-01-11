const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateTicketPDF = async ({
  passengerName,
  flight,
  finalPrice,
  pnr,
  bookingDate,
}) => {
  const doc = new PDFDocument();

  const dirPath = path.join(__dirname, '../tickets');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const filePath = path.join(dirPath, `${pnr}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text('Flight Ticket', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Passenger Name: ${passengerName}`);
  doc.text(`Airline: ${flight.airline}`);
  doc.text(`Flight ID: ${flight.flightId}`);
  doc.text(
    `Route: ${flight.departureCity} → ${flight.arrivalCity}`
  );
  doc.text(`Final Price Paid: ₹${finalPrice}`);
  doc.text(`PNR: ${pnr}`);
  doc.text(`Booking Date: ${bookingDate.toLocaleString()}`);

  doc.end();

  return filePath;
};
