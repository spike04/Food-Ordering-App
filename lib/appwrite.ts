import {
  Category,
  CreateUserParams,
  GetMenuParams,
  SignInParams,
} from '@/types'
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from 'react-native-appwrite'

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: 'com.rubin.foodordering',
  databaseId: '686b915e00082e89d2d2',
  bucketId: '6874a1310021e79d64b5',
  userCollectionId: '686b918900076eacdd31',
  categoriesCollectionId: '68748e4e0002c60ba1b8',
  menuCollectionId: '68748ec4003dbe2f37fe',
  customizationsCollectionId: '68749fbf0023ce546593',
  menuCustomizationsCollectionId: '6874a047002087651b54',
}

export const client = new Client()

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)

    if (!newAccount) throw Error

    await signIn({ email, password })

    const avatarUrl = avatars.getInitialsURL(name)

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        avatar: avatarUrl,
      },
    )
  } catch (error) {
    throw new Error(error as string)
  }
}

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = []

    if (category) queries.push(Query.equal('categories', category))
    if (query) queries.push(Query.search('name', query))

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries,
    )

    return menus.documents
  } catch (e) {
    throw new Error(e as string)
  }
}

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
    )

    return categories.documents as Category[]
  } catch (error) {
    throw new Error(error as string)
  }
}
