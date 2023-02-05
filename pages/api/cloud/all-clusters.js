export default async function (req, res) {
  try {
    const response = await fetch('https://cockroachlabs.cloud/api/v1/clusters', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.COCKROACH_CLOUD_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();

    res.status(200).json({
      message: 'A Ok!',
      // data: json.clusters,
      // data: json.clusters
      //   .map((cluster) => {
      //     return {
      //       ...cluster,
      //       operation_status: 'RUNNING',
      //     };
      //   })
      data: json.clusters
        .map((cluster) => {
          return {
            ...cluster,
            operation_status:
              cluster.name === 'cloud-api-demo-basic-doe' || cluster.name === 'cloud-api-demo-whiner-hippo'
                ? 'FAILED'
                : 'RUNNING',
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name)),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error!',
      error: error.message,
    });
  }
}
