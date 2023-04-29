import http from "../http-common";

export const getAllBooks: any = async (shelveId: number) => {
  if (!(shelveId > 0)) return [];

  const { data } = await http.get(`/shelves/${shelveId}/books`);
  return data;
}

export const get = (shelveId: number, bookId: number) => {
  return http.get(`/shelves/${shelveId}/books/${bookId}`);
}

export const createBook = (shelveId: number, data: any) => {
  return http.post(`/shelves/${shelveId}/books`, data);
}

export const updateBook = (shelveId: number, bookId: number, data: any) => {
  return http.patch(`/shelves/${shelveId}/books/${bookId}`, data);
}

export const removeBook = (shelveId: number, bookId: number) => {
  return http.delete(`/shelves/${shelveId}/books/${bookId}`);
}
