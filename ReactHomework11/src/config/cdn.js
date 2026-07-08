export const MEALS_API_URL =
  'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals'

const normalizeDescription = (instructions = '') => {
  const cleanedInstructions = String(instructions).replace(/\s+/g, ' ').trim()

  if (cleanedInstructions.length <= 140) {
    return cleanedInstructions
  }

  return `${cleanedInstructions.slice(0, 137)}...`
}

export const fetchMenuItems = async (signal) => {
  const response = await fetch(MEALS_API_URL, { signal })

  if (!response.ok) {
    throw new Error('Failed to load menu')
  }

  const meals = await response.json()

  return meals.reduce((groups, meal) => {
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
