import http from "../http-common";

export const getAllShelves: any = async (parentShelve?: any) => {
    const { data } = await http.get("/shelves", { params: { parentShelveId: parentShelve?.shelveId } });
    return data;
}

export const getAllShelvesTree: any = async (parentShelve?: any) => {
    const { data } = await http.get("/shelves/tree", { params: { parentShelveId: parentShelve?.shelveId } });
    if (parentShelve?.shelveId)
        return [{ shelveId: parentShelve?.parentShelveId, name: "..." },  ...data];

    return data;
}

export const get = (id: number) => {
    return http.get(`/shelves/${id}`);
}

export const getPath = (id: number) => {
    return http.get(`/shelves/path?shelveId=${id}`);
}

export const createShelve = (data: any) => {
    return http.post("/shelves", data);
}

export const updateShelve = (id: number, data: any) => {
    return http.patch(`/shelves/${id}`, data);
}

export const removeShelve = (id: number) => {
    return http.delete(`/shelves/${id}`);
}
