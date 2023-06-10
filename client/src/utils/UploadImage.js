const UploadImage = async (img) => {
    const formData = new FormData();
    formData.append('image', img);
    const key = await GetKey();
    const res = await fetch('https://api.imgbb.com/1/upload?key=' + key, {
        method: "POST",
        body: formData,
       });
    const jsonResponse = await res.json();

    return jsonResponse?.data?.url;
}

const GetKey = async () => {
    const keyRes = await fetch('http://localhost:9000/database/image-upload-key');
    const res = await keyRes.json()
    return res.key;
}

export default UploadImage;













