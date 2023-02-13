export default async function (req, res) {
  const { query } = req

  try {
    const response = await fetch(`https://cockroachlabs.cloud/api/v1/clusters/${query.id}/nodes`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.COCKROACH_CLOUD_SECRET_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const json = await response.json()

    res.status(200).json({
      message: 'A Ok!',
      data: json.nodes
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error!',
      error: error.message
    })
  }
}
