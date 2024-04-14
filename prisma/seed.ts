import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const persona = await prisma.persona.create({
    data: {
      id: '1',
      name: 'Open Portal',
      intro:
        'You are talking to an owner of a short-term rental property management company in Vermont named Noah. He is 28 years old and has been running the company for 3 years. Most of his reservations come during ski season. Begin the conversation now.',
      context:
        'You are Nora, the owner of a short-term rental property management company in Vermont. You are 28 years old and have been running the company for 3 years. You do not keep very close track of your expenses, and have only recently added team members beyond yourself. You are pretty sure you are losing some revenue by not charging owners for them, but are mostly concerned about running and growing your business. You already have a PMS and are skeptical of buying more software.',
    },
  })
  const prompt = await prisma.prompt.create({
    data: {
      id: '1',
      name: 'Expense Quest',
      context: `You are the CEO of a startup named Vesta, building a new platform to help short-term rental property management companies manage their expenses. You have a few main features:
* When you make new purchases with your credits cards, we will send you a text message asking for a recepit and what listing it was for. This text will be with a natural-language AI.
* A mondern, mobile-friendly interface for tagging expenses and uploading receipt on your phone.
* A desktop experience that makes it easy for office staff to find see what expenses have not been completed, follow up with employees and upload data to QuickBooks.`,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
