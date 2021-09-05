// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
import type { NextApiRequest, NextApiResponse } from 'next'

type Props = {
  strDrink: string | null,
  strInstructions: string | null,
  strDrinkThumb: string | undefined,
  ingredients: IngredientItem[]
}

interface IngredientItem {
  name: string | null | IngredientItem[],
  measure: string | null | IngredientItem[],
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query

  const fetchData = async () => {
    const options = {
      Method: 'GET',
      url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito',
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': '00b52db9b6msha80f9b5af190c45p123de7jsnc56f628c8dc7'
      },
      params: { s: name }
    }

    const { data } = await axios.request(options)

    return data
  }

  const filteredIngr = (drink: Props[]) => {
    let ingredients: IngredientItem[] = []
    let index = 0

    drink.forEach(element => {
      for (let [key, value] of Object.entries(element)) {
        if (key.includes('strIngredient') && value) {
          ingredients.push({ name: value, measure: null })
        }

        if (key.includes('strMeasure') && value) {
          if (ingredients[index]) {
            ingredients[index]['measure'] = value
          }

          index = index + 1
        }

        element.ingredients = ingredients
      }

      index = 0
      ingredients = []
    })
  }

  const data = await fetchData()

  filteredIngr(data.drinks)

  res.send(data.drinks)
}
