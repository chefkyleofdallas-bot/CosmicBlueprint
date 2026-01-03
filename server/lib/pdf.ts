import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { type Order } from '@shared/schema';

export async function generateReportPDF(order: Order): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 30;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText('Cosmic Blueprint', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: font,
    color: rgb(0, 0.53, 0.71),
  });

  page.drawText(`Report for: ${order.astrologyData.fullName}`, {
    x: 50,
    y: height - 6 * fontSize,
    size: 18,
    font: font,
    color: rgb(0, 0, 0),
  });
    
  page.drawText(`Type: ${order.reportType}`, {
    x: 50,
    y: height - 7 * fontSize,
    size: 18,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Placeholder content
  page.drawText('This is a placeholder for the generated astrology report.', {
    x: 50,
    y: height - 10 * fontSize,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
