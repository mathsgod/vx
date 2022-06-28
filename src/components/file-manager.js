import { $axios } from '@'


export async function moveFile(path, target) {
    return await $axios.post("/FileManager/moveFile", {
        path,
        target
    });
}

export async function listContents(path, file_type, search) {
    return await $axios.get("/FileManager/listContents", {
        params: {
            path: path,
            file_type: file_type,
            search: search,
        },
    });
}


export async function deleteFile(path) {
    return $axios.post("/FileManager/deleteFile", {
        path: path,
    });
}


export async function deleteFolder(path) {
    return $axios.post("/FileManager/deleteFolder", {
        path: path,
    });
}

export async function renameFolder(path, newName) {
    return $axios.post("/FileManager/renameFolder", {
        path: path,
        name: newName,
    });
}

export async function renameFile(path, newName) {
    return vx.axios.post("/FileManager/renameFile", {
        path: path,
        name: newName,
    });
}

export async function createFolder(path) {
    return vx.axios.post("/FileManager/createFolder", {
        path: path,
    });
}

export async function uploadFile(path, file) {
    let fd = new FormData();
    fd.append("path", path);
    fd.append("file", file);

    return vx.post("/FileManager/uploadFile", fd, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

}
