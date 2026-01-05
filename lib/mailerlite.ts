export async function addMailerLiteSubscriber(subscriber: {
  name: string
  email: string
  birthDate: string
  birthTime?: string
  birthCity?: string
}) {
  const apiKey = process.env.MAILERLITE_API_KEY

  if (!apiKey) {
    console.log("[v0] MailerLite API key not configured, skipping MailerLite sync")
    return { success: false, reason: "API key not configured" }
  }

  try {
    // Split name into first and last name
    const nameParts = subscriber.name.trim().split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: subscriber.email,
        fields: {
          name: subscriber.name,
          last_name: lastName,
        },
        // Custom fields for birth data
        groups: [], // You can add group IDs here if you want to add them to specific groups
        // Store birth data in custom fields (you'll need to create these in MailerLite first)
        // Or use the notes field
        status: "active",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] MailerLite API error:", data)
      return { success: false, error: data }
    }

    console.log("[v0] Successfully added subscriber to MailerLite")

    // Update subscriber with custom fields if you've created them in MailerLite
    // This requires the subscriber ID from the response
    if (data.data?.id) {
      try {
        await fetch(`https://connect.mailerlite.com/api/subscribers/${data.data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            fields: {
              birth_date: subscriber.birthDate,
              birth_time: subscriber.birthTime || "",
              birth_city: subscriber.birthCity || "",
            },
          }),
        })
      } catch (updateError) {
        console.log("[v0] Could not update custom fields (they may not exist in MailerLite yet)")
      }
    }

    return { success: true, data }
  } catch (error) {
    console.error("[v0] MailerLite integration error:", error)
    return { success: false, error }
  }
}
