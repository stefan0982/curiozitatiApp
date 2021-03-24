export const categoriesUrl = `/entries?access_token=fNNZsc2PHCgGHyNGDF51_xH-JtJAKrR8jH6CoeGh7O0&content_type=categorii`

import axios from 'axios';

export const contentful = axios.create({
  baseURL: 'https://cdn.contentful.com/spaces/sjvzi6dlarr9/environments/master',
});

export const categoryUrl = id => ``
