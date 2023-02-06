export default async function (req, res) {
  const { query } = req

  try {
    const response = await fetch(`https://cockroachlabs.cloud/api/v1/clusters/${query.id}`, {
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
      // data: json,
      data: {
        ...json,
        operation_status:
          json.name === 'cloud-api-demo-basic-doe' || json.name === 'cloud-api-demo-whiner-hippo' ? 'FAILED' : 'RUNNING'
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error!',
      error: error.message
    })
  }
}
