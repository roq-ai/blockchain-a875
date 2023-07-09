import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { ethereumAddressValidationSchema } from 'validationSchema/ethereum-addresses';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.ethereum_address
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEthereumAddressById();
    case 'PUT':
      return updateEthereumAddressById();
    case 'DELETE':
      return deleteEthereumAddressById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEthereumAddressById() {
    const data = await prisma.ethereum_address.findFirst(convertQueryToPrismaUtil(req.query, 'ethereum_address'));
    return res.status(200).json(data);
  }

  async function updateEthereumAddressById() {
    await ethereumAddressValidationSchema.validate(req.body);
    const data = await prisma.ethereum_address.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEthereumAddressById() {
    const data = await prisma.ethereum_address.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
