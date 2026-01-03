import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { type Order, reportDetails } from '@shared/schema';

export async function generateReportPDF(order: Order): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const detail = reportDetails[order.reportType];

  // Cover Page
  const page1 = pdfDoc.addPage();
  const { width, height } = page1.getSize();

  // Branding Title
  page1.drawText('Cosmic Blueprint', {
    x: 50,
    y: height - 100,
    size: 40,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.4),
  });

  page1.drawText('Precision Astrology, Personally Designed', {
    x: 50,
    y: height - 130,
    size: 16,
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Report Title
  page1.drawText(detail.name, {
    x: 50,
    y: height - 300,
    size: 24,
    font: boldFont,
  });

  // Client Info
  page1.drawText(`Prepared for: ${order.astrologyData.fullName}`, {
    x: 50,
    y: height - 350,
    size: 18,
    font: font,
  });

  page1.drawText(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, {
    x: 50,
    y: height - 380,
    size: 14,
    font: font,
  });

  // Content Page
  const page2 = pdfDoc.addPage();
  
  page2.drawText('Introduction', {
    x: 50,
    y: height - 50,
    size: 20,
    font: boldFont,
  });

  const introText = `Welcome to your personal ${detail.name}. This report provides deep psychological and symbolic insights based on the positions of the celestial bodies at the moment of your birth.`;
  page2.drawText(introText, {
    x: 50,
    y: height - 80,
    size: 12,
    font: font,
    maxWidth: width - 100,
    lineHeight: 15,
  });

  page2.drawText('Birth Data Used:', {
    x: 50,
    y: height - 150,
    size: 14,
    font: boldFont,
  });

  const birthData = `
    Date of Birth: ${order.astrologyData.dateOfBirth}
    Time of Birth: ${order.astrologyData.timeOfBirth || 'Not Provided (Solar Chart Logic Used)'}
    Location: ${order.astrologyData.cityOfBirth}, ${order.astrologyData.countryOfBirth}
    Zodiac System: Tropical
    House System: Placidus
  `;
  page2.drawText(birthData, {
    x: 50,
    y: height - 170,
    size: 11,
    font: font,
    lineHeight: 14,
  });

  // Disclaimer Page
  const page3 = pdfDoc.addPage();
  page3.drawText('Legal Disclaimer', {
    x: 50,
    y: height - 50,
    size: 20,
    font: boldFont,
  });

  const disclaimerText = "Cosmic Blueprint reports are provided for personal insight, reflection, and educational purposes only. They are not intended to replace medical advice, psychological counseling, or legal/financial advice. Astrology is symbolic, not deterministic. You retain full personal responsibility for your decisions.";
  page3.drawText(disclaimerText, {
    x: 50,
    y: height - 80,
    size: 10,
    font: font,
    maxWidth: width - 100,
    lineHeight: 13,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
