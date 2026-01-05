import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

interface ReportData {
  reportType: string
  customerName: string
  birthDate: string
  birthTime: string
  birthCity: string
}

export async function generatePDF(data: ReportData): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842]) // A4 size
  const { width, height } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const amber = rgb(0.85, 0.47, 0.02)
  const white = rgb(1, 1, 1)
  const navy = rgb(0.04, 0.04, 0.12)

  // Background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: navy,
  })

  // Header
  page.drawText("COSMIC BLUEPRINT", {
    x: 50,
    y: height - 80,
    size: 28,
    font: fontBold,
    color: white,
  })

  page.drawText("Precision Astrology, Personally Designed", {
    x: 50,
    y: height - 110,
    size: 12,
    font,
    color: amber,
  })

  // Report Title
  const reportTitle = formatReportTitle(data.reportType)
  page.drawText(reportTitle, {
    x: 50,
    y: height - 170,
    size: 20,
    font: fontBold,
    color: amber,
  })

  // Customer Info
  page.drawText(`Prepared for: ${data.customerName}`, {
    x: 50,
    y: height - 210,
    size: 12,
    font,
    color: white,
  })

  page.drawText(`Birth Date: ${data.birthDate}`, {
    x: 50,
    y: height - 230,
    size: 12,
    font,
    color: white,
  })

  page.drawText(`Birth Time: ${data.birthTime}`, {
    x: 50,
    y: height - 250,
    size: 12,
    font,
    color: white,
  })

  page.drawText(`Birth Location: ${data.birthCity}`, {
    x: 50,
    y: height - 270,
    size: 12,
    font,
    color: white,
  })

  // Report Content
  const content = getReportContent(data.reportType)
  let yPosition = height - 320

  content.forEach((paragraph) => {
    const lines = wrapText(paragraph, 70)
    lines.forEach((line) => {
      if (yPosition < 100) {
        // Add new page if needed
        const newPage = pdfDoc.addPage([595, 842])
        newPage.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
          color: navy,
        })
        yPosition = height - 50
      }
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 10,
        font,
        color: white,
      })
      yPosition -= 15
    })
    yPosition -= 10
  })

  // Footer
  page.drawText("cosmicblueprint.space", {
    x: 50,
    y: 30,
    size: 10,
    font,
    color: amber,
  })

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}

function formatReportTitle(reportType: string): string {
  const titles: Record<string, string> = {
    natal: "Natal Chart Reading",
    karmic: "Karmic Blueprint",
    love: "Love & Compatibility Report",
    career: "Career & Purpose Report",
    yearly: "Yearly Forecast",
  }
  return titles[reportType] || "Astrology Report"
}

function getReportContent(reportType: string): string[] {
  const content: Record<string, string[]> = {
    natal: [
      "Welcome to your Natal Chart Reading. This comprehensive analysis reveals the cosmic blueprint present at the moment of your birth.",
      "Your Sun sign represents your core essence and life force. It illuminates your fundamental character and the path toward self-realization.",
      "The Moon in your chart reflects your emotional nature and instinctive responses. It shows how you nurture yourself and others.",
      "Your Rising sign, or Ascendant, describes how you present yourself to the world and your approach to new experiences.",
      "The planetary positions in your houses reveal specific life areas where cosmic energies manifest most powerfully.",
      "Aspects between planets show how different parts of your psyche interact, creating unique patterns of strength and challenge.",
      "This reading provides a foundation for understanding your cosmic design and navigating your life journey with greater awareness.",
    ],
    karmic: [
      "Your Karmic Blueprint reveals the soul lessons and evolutionary path you have chosen for this lifetime.",
      "The North Node points toward your destiny and the qualities you are here to develop in this incarnation.",
      "The South Node represents your past life patterns and the comfortable tendencies you are learning to transcend.",
      "Saturn placements show karmic responsibilities and areas where you face tests to build strength and wisdom.",
      "Your chart holds keys to understanding recurring patterns and breaking free from limiting cycles.",
      "This reading helps illuminate your soul purpose and the higher meaning behind life challenges.",
    ],
    love: [
      "Your Love & Compatibility Report explores your romantic nature and relationship patterns.",
      "Venus reveals how you give and receive love, what you find beautiful, and your values in partnerships.",
      "Mars shows your passionate nature, how you pursue desires, and your approach to physical intimacy.",
      "The 7th house describes your ideal partnership and what you seek in a committed relationship.",
      "Aspects to your personal planets reveal your relationship patterns and potential challenges to navigate.",
      "This reading provides insights for creating harmonious connections and understanding your love language.",
    ],
    career: [
      "Your Career & Purpose Report illuminates your professional strengths and vocational path.",
      "The Midheaven reveals your public image, career aspirations, and the legacy you wish to create.",
      "The 10th house shows areas of professional success and your approach to achievement.",
      "Your natural talents and skills are indicated by planetary placements and aspects in your chart.",
      "This reading helps align your work with your cosmic design for greater fulfillment and success.",
    ],
    yearly: [
      "Your Yearly Forecast provides a preview of cosmic themes and opportunities in the year ahead.",
      "Solar return analysis reveals the primary energies and lessons for your new solar year.",
      "Major transits highlight periods of growth, transformation, and important life developments.",
      "Monthly themes guide you through the year with awareness of timing and cosmic support.",
      "This forecast helps you navigate the coming year with intention and cosmic wisdom.",
    ],
  }

  return content[reportType] || ["Your personalized astrology report."]
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  words.forEach((word) => {
    if ((currentLine + word).length > maxChars) {
      lines.push(currentLine.trim())
      currentLine = word + " "
    } else {
      currentLine += word + " "
    }
  })

  if (currentLine.trim()) {
    lines.push(currentLine.trim())
  }

  return lines
}
