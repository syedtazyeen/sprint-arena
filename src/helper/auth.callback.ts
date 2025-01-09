import prisma from "../../prisma";

export async function signInCallbackController(user: any) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email as string,
      },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: user.email as string,
          name: user.name,
          image: user.image,
        },
      });
    }
    if (existingUser) {
      return true;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.warn(error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
