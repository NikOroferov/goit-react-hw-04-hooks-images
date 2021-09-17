import axios from 'axios';

const getImageApi = (searchValue, page) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      q: searchValue,
      key: '22683301-b01030d0df8a1fa2bda925efb',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
};

export default getImageApi;
