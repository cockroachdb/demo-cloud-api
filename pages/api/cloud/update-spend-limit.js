import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function (req, res) {
  const session = await getServerSession(req, res, authOptions);

  const { query } = req;

  if (session) {
    try {
      const response = await fetch(
        `https://cockroachlabs.cloud/api/v1/clusters/${query.id}?field_mask=serverless.spend_limit`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${process.env.COCKROACH_CLOUD_SECRET_KEY}`,
          },
          body: JSON.stringify({
            serverless: {
              spend_limit: query.value,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();

      res.status(200).json({
        message: 'A Ok!',
        data: json,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error!',
        error: error.message,
      });
    }
  } else {
    res.status(401).json({
      message: 'Error!',
      error: 'Unauthorized',
    });
  }

  res.end();
}
