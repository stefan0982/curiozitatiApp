export const categoriesUrl = `/entries?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0&content_type=categorii`

import axios from 'axios';

export const contentful = axios.create({
  baseURL: 'https://cdn.contentful.com/spaces/sjvzi6dlarr9/environments/master',
});

export const categoryUrl = (id, skip) => `/entries?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0&content_type=curiozitati&fields.categoria.sys.id=${ id }&limit=10&skip=${skip}`
export const factsUrl = skip => `/entries?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0&content_type=curiozitati&limit=10&skip=${ skip }`
