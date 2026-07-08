export const MEALS_API_URL =
  'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals'

type MealApiResponse = {
  id: string
  meal: string
  img: string
  price: string | number
  instructions?: string
  category?: string
}

export type MenuItem = {
  id: string
  name: string
  price: number
  description: string
  image: string
}

const normalizeDescription = (instructions = ''): string => {
  const cleanedInstructions = String(instructions).replace(/\s+/g, ' ').trim()

  if (cleanedInstructions.length <= 140) {
    return cleanedInstructions
  }

  return `${cleanedInstructions.slice(0, 137)}...`
}

export const fetchMenuItems = async (
  signal?: AbortSignal,
): Promise<Record<string, MenuItem[]>> => {
  const response = await fetch(MEALS_API_URL, { signal })

  if (!response.ok) {
    throw new Error('Failed to load menu')
  }

  const meals = (await response.json()) as MealApiResponse[]

  return meals.reduce<Record<string, MenuItem[]>>((groups, meal) => {
    const category = meal.category || 'Menu'

    if (!groups[category]) {
      groups[category] = []
    }

    groups[category].push({
      id: meal.id,
      name: meal.meal,
      price: Number(meal.price) || 0,
      description: normalizeDescription(meal.instructions),
      image: meal.img,
    })

    return groups
  }, {})
}
